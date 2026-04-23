// ── clients.js ──────────────────────────────────────────
const router1=require('express').Router()
const sb=require('../services/supabase')
const{requireAuth,requireRole}=require('../middleware/auth')

router1.get('/',requireAuth,async(req,res)=>{
  try{
    let q=sb.from('clients').select(`*,profiles(full_name,email,phone),accountant:profiles!clients_assigned_accountant_id_fkey(full_name)`)
    if(req.user.role==='accountant')q=q.eq('assigned_accountant_id',req.user.id)
    const{data,error}=await q.order('created_at',{ascending:false})
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})

router1.post('/',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('clients').insert(req.body).select().single()
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})

router1.patch('/:id',requireAuth,requireRole('admin','accountant'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('clients').update(req.body).eq('id',req.params.id).select().single()
    if(error)throw error
    res.json(data)
  }catch(e){res.status(500).json({error:e.message})}
})

module.exports=router1
