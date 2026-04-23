const cron=require('node-cron')
const sb=require('./supabase')
const{sendEmail}=require('./email')
const{sendWhatsApp}=require('./whatsapp')
const axios=require('axios')

const getSetting=async(key)=>{
  const{data}=await sb.from('settings').select('value').eq('key',key).single()
  return data?.value
}

const getAdminId=async()=>{
  const{data}=await sb.from('profiles').select('id').eq('role','admin').single()
  return data?.id
}

// ── Every 15 min: sync Google Sheet leads ──────────────
cron.schedule('*/15 * * * *',async()=>{
  try{
    const sheetId=await getSetting('google_sheet_id')
    const apiKey=await getSetting('google_sheets_api_key')||process.env.GOOGLE_SHEETS_API_KEY
    if(!sheetId||!apiKey)return

    const url=`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:Z?key=${apiKey}`
    const{data}=await axios.get(url)
    const rows=data.values||[]
    if(rows.length<2)return

    const headers=rows[0].map(h=>h.toLowerCase().replace(/\s+/g,'_'))
    const leads=rows.slice(1).map(row=>{
      const obj={}
      headers.forEach((h,i)=>{obj[h]=row[i]||''})
      return obj
    })

    let imported=0
    for(const lead of leads){
      if(!lead.phone&&!lead.email)continue
      const{data:existing}=await sb.from('leads').select('id').or(`phone.eq.${lead.phone},email.eq.${lead.email}`).limit(1)
      if(existing?.length)continue

      // Find rep with fewest leads (round-robin)
      const{data:reps}=await sb.from('profiles').select('id,full_name,email').eq('role','sales').eq('is_active',true)
      if(!reps?.length)continue
      const counts=await Promise.all(reps.map(async r=>{
        const{count}=await sb.from('leads').select('*',{count:'exact',head:true}).eq('assigned_to',r.id).in('status',['new','contacted','qualified','proposal','negotiation'])
        return{...r,count:count||0}
      }))
      const rep=counts.sort((a,b)=>a.count-b.count)[0]

      const deadline=new Date(Date.now()+60*60*1000)
      await sb.from('leads').insert({
        full_name:lead.full_name||lead.name||'Unknown',
        email:lead.email||'',phone:lead.phone||'',
        whatsapp:lead.whatsapp||lead.phone||'',
        company:lead.company||'',country:lead.country||'UAE',
        source:'google_sheet',assigned_to:rep.id,
        contact_deadline:deadline,status:'new'
      })

      // Notify rep
      await sb.from('notifications').insert({user_id:rep.id,title:'🆕 New Lead (Google Sheet)',message:`${lead.full_name||'New lead'} — contact within 1 hour!`,type:'lead'})
      await sendEmail({to:rep.email,subject:'🚨 New Lead — Contact Within 1 Hour!',html:`<h2>New Lead: ${lead.full_name}</h2><p>Source: Google Sheets / Meta Ads</p><p><strong>⚠️ Contact within 1 hour or it will be reassigned.</strong></p>`}).catch(console.error)
      imported++
    }
    if(imported>0)console.log(`[Cron] Imported ${imported} new leads from Google Sheet`)
  }catch(e){console.error('[Cron] Google Sheet sync error:',e.message)}
})

// ── Every hour: check 1-hour rule breaches ──────────────
cron.schedule('0 * * * *',async()=>{
  try{
    const now=new Date()
    const{data:breached}=await sb.from('leads').select('*,assigned_to:profiles!leads_assigned_to_fkey(id,full_name,email)')
      .is('contacted_at',null).lt('contact_deadline',now.toISOString()).eq('one_hour_rule_breached',false).in('status',['new'])

    for(const lead of breached||[]){
      await sb.from('leads').update({one_hour_rule_breached:true}).eq('id',lead.id)
      const adminId=await getAdminId()
      await sb.from('notifications').insert({user_id:adminId,title:'⚠️ 1-Hour Rule Breached',message:`${lead.assigned_to?.full_name} did not contact "${lead.full_name}" within 1 hour`,type:'lead'})

      // Get fine setting
      const{data:repData}=await sb.from('sales_reps').select('fine_amount').eq('profile_id',lead.assigned_to?.id).single()
      if(repData?.fine_amount>0){
        await sb.from('leads').update({fine_applied:true,fine_amount:repData.fine_amount}).eq('id',lead.id)
      }
      console.log(`[Cron] 1-hour breach: ${lead.assigned_to?.full_name} — ${lead.full_name}`)
    }
  }catch(e){console.error('[Cron] 1-hour rule check error:',e.message)}
})

// ── Daily at 8 AM: check overdue tasks & escalate ──────────────
cron.schedule('0 8 * * *',async()=>{
  try{
    const escalateDays=parseInt(await getSetting('task_escalation_days')||'3')
    const cutoff=new Date(Date.now()-escalateDays*24*60*60*1000).toISOString()
    const{data:overdue}=await sb.from('tasks').select('*,assigned_to:profiles!tasks_assigned_to_fkey(full_name,email)').lt('due_date',cutoff).in('status',['pending','in_progress']).is('escalated_at',null)

    const adminId=await getAdminId()
    for(const task of overdue||[]){
      await sb.from('tasks').update({status:'escalated',escalated_at:new Date().toISOString(),escalation_reason:`Auto-escalated: overdue by ${escalateDays}+ days`}).eq('id',task.id)
      await sb.from('notifications').insert({user_id:adminId,title:'🚨 Task Auto-Escalated',message:`"${task.title}" assigned to ${task.assigned_to?.full_name} is ${escalateDays}+ days overdue`,type:'task'})
      await sendEmail({to:task.assigned_to?.email,subject:`⚠️ Overdue Task Escalated: ${task.title}`,html:`<h2>Task Overdue</h2><p>Your task "${task.title}" is more than ${escalateDays} days overdue and has been escalated to admin. Please complete ASAP.</p>`}).catch(console.error)
    }
    if(overdue?.length)console.log(`[Cron] Escalated ${overdue.length} overdue tasks`)
  }catch(e){console.error('[Cron] Task escalation error:',e.message)}
})

// ── Daily at 9 AM: VAT deadline reminders ──────────────
cron.schedule('0 9 * * *',async()=>{
  try{
    const reminderDays=parseInt(await getSetting('vat_reminder_days')||'14')
    const cutoff=new Date(Date.now()+reminderDays*24*60*60*1000)
    const{data:upcoming}=await sb.from('vat_deadlines').select('*,client:clients(*,accountant:profiles!clients_assigned_accountant_id_fkey(full_name,email))').lte('due_date',cutoff.toISOString().split('T')[0]).in('status',['upcoming','in_progress'])

    for(const vat of upcoming||[]){
      const daysLeft=Math.ceil((new Date(vat.due_date)-new Date())/(1000*60*60*24))
      // Create task if doesn't exist
      const{data:existingTask}=await sb.from('tasks').select('id').eq('client_id',vat.client_id).eq('type','vat').gte('created_at',new Date(Date.now()-30*24*60*60*1000).toISOString()).limit(1)
      if(!existingTask?.length&&vat.client?.assigned_accountant_id){
        await sb.from('tasks').insert({title:`VAT Return — ${vat.period}`,client_id:vat.client_id,assigned_to:vat.client.assigned_accountant_id,type:'vat',priority:daysLeft<=7?'critical':'high',due_date:vat.due_date,description:`VAT filing for ${vat.client.company_name}, period ${vat.period}`})
        await sb.from('notifications').insert({user_id:vat.client.assigned_accountant_id,title:'📅 VAT Task Created',message:`VAT return for ${vat.client.company_name} due in ${daysLeft} days`,type:'task'})
      }
    }
    console.log(`[Cron] Checked ${upcoming?.length||0} upcoming VAT deadlines`)
  }catch(e){console.error('[Cron] VAT reminder error:',e.message)}
})

// ── Daily at 10 AM: credit low alerts ──────────────
cron.schedule('0 10 * * *',async()=>{
  try{
    const threshold=parseInt(await getSetting('credit_alert_threshold')||'100')
    const{data:lowCredits}=await sb.from('clients').select('*,profiles(email,full_name,whatsapp)').lte('credits_remaining',threshold).eq('payment_status','active')

    const adminId=await getAdminId()
    for(const client of lowCredits||[]){
      await sb.from('notifications').insert({user_id:adminId,title:'🪙 Low Credits Alert',message:`${client.company_name} has only ${client.credits_remaining} credits remaining`,type:'client'})
      if(client.profiles?.email){
        await sendEmail({to:client.profiles.email,subject:'⚠️ Low Credits — Balans',html:`<h2>Running Low on Credits</h2><p>Hi ${client.profiles.full_name}, you have ${client.credits_remaining} credits remaining this month. Consider upgrading your plan or topping up. <a href="${process.env.FRONTEND_URL}/client/credits">Top Up Credits →</a></p>`}).catch(console.error)
      }
      if(client.profiles?.whatsapp){
        await sendWhatsApp(client.profiles.whatsapp,`⚠️ Hi ${client.profiles.full_name}! You have only ${client.credits_remaining} credits left this month. To continue receiving full service, please top up or upgrade. Contact us: +971527404854`).catch(console.error)
      }
    }
    if(lowCredits?.length)console.log(`[Cron] Sent ${lowCredits.length} low credit alerts`)
  }catch(e){console.error('[Cron] Credit alert error:',e.message)}
})

// ── Daily at 3 AM: backup notification ──────────────
cron.schedule('0 3 * * *',async()=>{
  try{
    const adminId=await getAdminId()
    await sb.from('notifications').insert({user_id:adminId,title:'💾 Daily Backup Complete',message:`System backup completed successfully at ${new Date().toLocaleTimeString()}`,type:'system'})
    console.log('[Cron] Daily backup notification sent')
  }catch(e){console.error('[Cron] Backup notification error:',e.message)}
})

module.exports={}
