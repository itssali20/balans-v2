const router=require('express').Router()
const sb=require('../services/supabase')
const{requireAuth,requireRole}=require('../middleware/auth')
const{resetTransporter}=require('../services/email')

router.get('/',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{data,error}=await sb.from('settings').select('*').order('category')
    if(error)throw error
    const masked=data.map(s=>({...s,value:['stripe_secret_key','smtp_pass','whatsapp_api_token'].includes(s.key)&&s.value?s.value.slice(0,8)+'••••••':s.value}))
    res.json(masked)
  }catch(e){res.status(500).json({error:e.message})}
})

router.patch('/:key',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{key}=req.params
    const{value}=req.body
    const{data,error}=await sb.from('settings').upsert({key,value,updated_by:req.user.id,updated_at:new Date().toISOString()}).select().single()
    if(error)throw error
    if(['smtp_host','smtp_port','smtp_user','smtp_pass'].includes(key))resetTransporter()
    res.json({success:true,data})
  }catch(e){res.status(500).json({error:e.message})}
})

router.put('/bulk',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{settings}=req.body
    const updates=Object.entries(settings).map(([key,value])=>({key,value,updated_by:req.user.id,updated_at:new Date().toISOString()}))
    const{error}=await sb.from('settings').upsert(updates)
    if(error)throw error
    resetTransporter()
    res.json({success:true})
  }catch(e){res.status(500).json({error:e.message})}
})

router.post('/test-email',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    resetTransporter()
    const{sendEmail}=require('../services/email')
    const result=await sendEmail({to:req.user.email,subject:'✅ Balans Email Test',html:'<h2>Email working!</h2><p>Your SMTP settings are configured correctly.</p>'})
    res.json(result)
  }catch(e){res.status(500).json({error:e.message})}
})

router.post('/test-stripe',requireAuth,requireRole('admin'),async(req,res)=>{
  try{
    const{data}=await sb.from('settings').select('value').eq('key','stripe_secret_key').single()
    if(!data?.value)return res.status(400).json({error:'Stripe key not set'})
    const stripe=require('stripe')(data.value)
    await stripe.balance.retrieve()
    res.json({success:true,message:'Stripe connected successfully'})
  }catch(e){res.status(500).json({error:'Invalid Stripe key: '+e.message})}
})

module.exports=router
