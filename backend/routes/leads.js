const router=require('express').Router()
const sb=require('../services/supabase')
const{requireAuth,requireRole}=require('../middleware/auth')
const{sendEmail}=require('../services/email')
const{sendWhatsApp}=require('../services/whatsapp')

const getAdminId=async()=>{const{data}=await sb.from('profiles').select('id').eq('role','admin').single();return data?.id}

const getNextRep=async(excludeId=null)=>{
  let q=sb.from('profiles').select('id,full_name,email,phone').eq('role','sales').eq('is_active',true)
  if(excludeId)q=q.neq('id',excludeId)
  const{data:reps}=await q
  if(!reps?.length)return null
  const counts=await Promise.all(reps.map(async r=>{
    const{count}=await sb.from('leads').select('*',{count:'exact',head:true}).eq('assigned_to',r.id).in('status',['new','contacted','qualified','proposal','negotiation'])
    return{...r,count:count||0}
  }))
  return counts.sort((a,b)=>a.count-b.count)[0]
}

const notifyRep=async(rep,lead)=>{
  if(!rep)return
  await sb.from('notifications').insert({user_id:rep.id,title:'🆕 New Lead Assigned',message:`${lead.full_name} from ${lead.source} — contact within 1 hour!`,type:'lead'})
  await sendEmail({to:rep.email,subject:'🚨 New Lead — Contact Within 1 Hour!',html:`<h2>New Lead: ${lead.full_name}</h2><p>Source: ${lead.source}</p><p><strong>⚠️ Contact within 1 hour or it will be reassigned and a fine may apply.</strong></p>`}).catch(console.error)
  if(rep.phone)await sendWhatsApp(rep.phone,`🆕 New lead assigned: ${lead.full_name} (${lead.source}). Contact within 1 HOUR! ⏰`).catch(console.error)
}

router.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('leads').select('*,rep:profiles!leads_assigned_to_fkey(full_name,email)')
    if(req.user.role==='sales')q=q.eq('assigned_to',req.user.id)
    const{data,error}=await q.order('created_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})

router.post('/',requireAuth,async(req,res)=>{
  try{
    const rep=await getNextRep()
    const deadline=new Date(Date.now()+60*60*1000)
    const{data:lead,error}=await sb.from('leads').insert({...req.body,assigned_to:rep?.id,contact_deadline:deadline,status:'new'}).select().single()
    if(error)throw error
    await notifyRep(rep,lead)
    const adminId=await getAdminId()
    await sb.from('notifications').insert({user_id:adminId,title:'🆕 New Lead',message:`${lead.full_name} from ${lead.source} — assigned to ${rep?.full_name||'Unassigned'}`,type:'lead'})
    // 1-hour check
    setTimeout(async()=>{
      const{data:check}=await sb.from('leads').select('*').eq('id',lead.id).single()
      if(!check||check.contacted_at||check.status!=='new')return
      await sb.from('leads').update({one_hour_rule_breached:true}).eq('id',lead.id)
      const{data:repData}=await sb.from('sales_reps').select('fine_amount').eq('profile_id',rep?.id).single()
      if(repData?.fine_amount>0)await sb.from('leads').update({fine_applied:true,fine_amount:repData.fine_amount}).eq('id',lead.id)
      const nextRep=await getNextRep(rep?.id)
      if(nextRep){
        await sb.from('leads').update({previous_rep:rep?.id,assigned_to:nextRep.id}).eq('id',lead.id)
        await notifyRep(nextRep,lead)
      }
      await sb.from('notifications').insert({user_id:adminId,title:'⚠️ 1-Hour Rule Breached',message:`${rep?.full_name} missed 1-hour rule on lead "${lead.full_name}"`,type:'lead'})
    },60*60*1000)
    res.json(lead)
  }catch(e){res.status(500).json({error:e.message})}
})

router.patch('/:id',requireAuth,async(req,res)=>{
  try{
    const updates={...req.body}
    if(updates.status==='contacted'&&!updates.contacted_at)updates.contacted_at=new Date().toISOString()
    if(updates.status==='lost'){
      const{data:lead}=await sb.from('leads').select('*').eq('id',req.params.id).single()
      const nextRep=await getNextRep(lead?.assigned_to)
      if(nextRep){updates.previous_rep=lead.assigned_to;updates.assigned_to=nextRep.id;await notifyRep(nextRep,lead)}
    }
    const{data,error}=await sb.from('leads').update(updates).eq('id',req.params.id).select().single()
    if(error)throw error
    await sb.from('lead_activities').insert({lead_id:req.params.id,sales_rep_id:req.user.id,action:`Status: ${updates.status||'updated'}`,stage_to:updates.status})
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})

router.post('/sync-sheet',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const axios=require('axios')
    const sheetId=process.env.GOOGLE_SHEET_ID
    const apiKey=process.env.GOOGLE_SHEETS_API_KEY
    const{data}=await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z?key=${apiKey}`)
    const rows=data.values||[]
    const headers=rows[0]?.map(h=>h.toLowerCase().replace(/\s+/g,'_'))||[]
    let imported=0
    for(const row of rows.slice(1)){
      const lead={}
      headers.forEach((h,i)=>{lead[h]=row[i]||''})
      if(!lead.phone&&!lead.email)continue
      const{data:ex}=await sb.from('leads').select('id').or(`phone.eq.${lead.phone},email.eq.${lead.email}`).limit(1)
      if(ex?.length)continue
      const rep=await getNextRep()
      const l=await sb.from('leads').insert({full_name:lead.full_name||lead.name||'Unknown',email:lead.email||'',phone:lead.phone||'',whatsapp:lead.whatsapp||lead.phone||'',company:lead.company||'',country:lead.country||'UAE',source:'google_sheet',assigned_to:rep?.id,contact_deadline:new Date(Date.now()+60*60*1000),status:'new'}).select().single()
      if(l.data&&rep)await notifyRep(rep,l.data)
      imported++
    }
    res.json({success:true,imported,total:rows.length-1})
  }catch(e){res.status(500).json({error:e.message})}
})

module.exports=router
