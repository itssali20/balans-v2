// tasks.js
const express=require('express')
const sb=require('../services/supabase')
const{requireAuth,requireRole}=require('../middleware/auth')
const{sendEmail}=require('../services/email')

const tasks=express.Router()
tasks.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('tasks').select(`*,client:clients(company_name),assigned_to:profiles!tasks_assigned_to_fkey(full_name)`)
    if(req.user.role==='accountant')q=q.eq('assigned_to',req.user.id)
    if(req.user.role==='client'){
      const{data:client}=await sb.from('clients').select('id').eq('profile_id',req.user.id).single()
      if(client)q=q.eq('client_id',client.id)
    }
    const{data,error}=await q.order('due_date',{ascending:true})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
tasks.post('/',requireAuth,requireRole('admin','accountant'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('tasks').insert({...req.body,assigned_by:req.user.id}).select().single()
    if(error)throw error
    // Notify assigned accountant
    if(data.assigned_to){
      const{data:p}=await sb.from('profiles').select('*').eq('id',data.assigned_to).single()
      await sb.from('notifications').insert({user_id:data.assigned_to,title:'📋 New Task Assigned',message:`${data.title} — due ${data.due_date}`,type:'task'})
      await sendEmail({to:p.email,subject:`📋 New Task: ${data.title}`,html:`<h2>New Task Assigned</h2><p>${data.title}</p><p>Due: ${data.due_date}</p>`}).catch(console.error)
    }
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
tasks.patch('/:id',requireAuth,async(req,res)=>{
  try{
    const updates=req.body
    if(updates.status==='done')updates.completed_at=new Date().toISOString()
    const{data,error}=await sb.from('tasks').update(updates).eq('id',req.params.id).select().single()
    if(error)throw error
    // Notify whole team when task completed
    if(updates.status==='done'){
      const{data:team}=await sb.from('profiles').select('id,email,full_name').in('role',['admin','accountant'])
      for(const m of team||[]){
        await sb.from('notifications').insert({user_id:m.id,title:'✅ Task Completed',message:`${data.title} marked complete`,type:'task'})
      }
    }
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports={tasks}

// documents.js
const docs=express.Router()
docs.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('documents').select(`*,client:clients(company_name),uploaded_by:profiles!documents_uploaded_by_fkey(full_name)`)
    if(req.user.role==='client'){
      const{data:client}=await sb.from('clients').select('id').eq('profile_id',req.user.id).single()
      if(client)q=q.eq('client_id',client.id)
    }else if(req.user.role==='accountant'){
      const{data:myClients}=await sb.from('clients').select('id').eq('assigned_accountant_id',req.user.id)
      const ids=(myClients||[]).map(c=>c.id)
      q=q.in('client_id',ids)
    }
    const{data,error}=await q.order('created_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
docs.patch('/:id',requireAuth,requireRole('admin','accountant'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('documents').update({...req.body,reviewed_by:req.user.id,reviewed_at:new Date().toISOString()}).eq('id',req.params.id).select().single()
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports.docs=docs

// reports.js
const reports=express.Router()
reports.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('reports').select(`*,client:clients(company_name),accountant:profiles!reports_accountant_id_fkey(full_name)`)
    if(req.user.role==='client'){
      const{data:client}=await sb.from('clients').select('id').eq('profile_id',req.user.id).single()
      if(client)q=q.eq('client_id',client.id)
    }else if(req.user.role==='accountant'){
      q=q.eq('accountant_id',req.user.id)
    }
    const{data,error}=await q.order('sent_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
reports.post('/',requireAuth,requireRole('admin','accountant'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('reports').insert({...req.body,accountant_id:req.user.id}).select().single()
    if(error)throw error
    // Notify client
    const{data:client}=await sb.from('clients').select('*,profiles(email,full_name)').eq('id',data.client_id).single()
    if(client?.profiles?.email){
      await sendEmail({to:client.profiles.email,subject:`📊 Your ${data.title} is Ready — Balans`,html:`<h2>New Report Available</h2><p>Hi ${client.profiles.full_name}, your ${data.title} is ready. Login to view it.</p><a href="${process.env.FRONTEND_URL}/client/reports">View Report →</a>`}).catch(console.error)
    }
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports.reports=reports

// notifications.js
const notifs=express.Router()
notifs.get('/',requireAuth,async(req,res)=>{
  try{
    const{data,error}=await sb.from('notifications').select('*').eq('user_id',req.user.id).order('created_at',{ascending:false}).limit(50)
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
notifs.patch('/read-all',requireAuth,async(req,res)=>{
  try{
    await sb.from('notifications').update({is_read:true}).eq('user_id',req.user.id)
    res.json({success:true})
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports.notifs=notifs

// commissions.js
const comm=express.Router()
comm.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('commissions').select(`*,sales_rep:profiles!commissions_sales_rep_id_fkey(full_name),client:clients(company_name)`)
    if(req.user.role==='sales')q=q.eq('sales_rep_id',req.user.id)
    const{data,error}=await q.order('created_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
comm.patch('/:id/approve',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('commissions').update({status:'approved',approved_by:req.user.id,approved_at:new Date().toISOString()}).eq('id',req.params.id).select().single()
    if(error)throw error
    // Notify rep
    const{data:p}=await sb.from('profiles').select('*').eq('id',data.sales_rep_id).single()
    await sb.from('notifications').insert({user_id:data.sales_rep_id,title:'💰 Commission Approved!',message:`AED ${data.total_amount} commission approved`,type:'finance'})
    await sendEmail({to:p.email,subject:'💰 Commission Approved — Balans',html:`<h2>Commission Approved!</h2><p>Your commission of AED ${data.total_amount} has been approved and will be paid on the 5th of next month.</p>`}).catch(console.error)
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports.comm=comm

// payroll.js
const payroll=express.Router()
payroll.get('/',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('payroll_runs').select(`*,items:payroll_items(*,employee:profiles(full_name,role))`).order('created_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})
payroll.post('/run',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{month,year,items}=req.body
    const total=items.reduce((s,i)=>s+(i.total_payable||0),0)
    const{data:run,error}=await sb.from('payroll_runs').insert({month,year,total_amount:total,status:'completed',run_by:req.user.id,run_at:new Date().toISOString()}).select().single()
    if(error)throw error
    for(const item of items){
      await sb.from('payroll_items').insert({...item,payroll_run_id:run.id})
      // Notify employee
      const{data:p}=await sb.from('profiles').select('*').eq('id',item.employee_id).single()
      if(p){
        await sb.from('notifications').insert({user_id:p.id,title:'💵 Payroll Processed',message:`Your payment of AED ${item.total_payable} for ${month}/${year} has been processed`,type:'finance'})
        await sendEmail({to:p.email,subject:`💵 Payroll Processed — ${month}/${year}`,html:`<h2>Payroll Processed</h2><p>Hi ${p.full_name}, your payment of AED ${item.total_payable} has been processed. You will receive it within 2 business days via WPS.</p>`}).catch(console.error)
      }
    }
    res.json(run)
  }catch(e){res.status(500).json({error:e.message})}
})
module.exports.payroll=payroll
