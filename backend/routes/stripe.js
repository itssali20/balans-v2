const router=require('express').Router()
const sb=require('../services/supabase')
const{requireAuth}=require('../middleware/auth')

const getStripe=async()=>{
  const{data}=await sb.from('settings').select('value').eq('key','stripe_secret_key').single()
  if(!data?.value)throw new Error('Stripe not configured')
  return require('stripe')(data.value)
}

router.post('/create-checkout',requireAuth,async(req,res)=>{
  try{
    const s=await getStripe()
    const{plan}=req.body
    const prices={starter:process.env.STRIPE_PRICE_STARTER,growth:process.env.STRIPE_PRICE_GROWTH,pro:process.env.STRIPE_PRICE_PRO}
    const session=await s.checkout.sessions.create({
      mode:'subscription',payment_method_types:['card'],
      line_items:[{price:prices[plan],quantity:1}],
      success_url:`${process.env.FRONTEND_URL}/client/dashboard?success=true`,
      cancel_url:`${process.env.FRONTEND_URL}/client/payments`,
      metadata:{user_id:req.user.id,plan}
    })
    res.json({url:session.url})
  }catch(e){res.status(500).json({error:e.message})}
})

router.post('/portal',requireAuth,async(req,res)=>{
  try{
    const s=await getStripe()
    const{data:client}=await sb.from('clients').select('stripe_customer_id').eq('profile_id',req.user.id).single()
    const session=await s.billingPortal.sessions.create({customer:client.stripe_customer_id,return_url:`${process.env.FRONTEND_URL}/client/payments`})
    res.json({url:session.url})
  }catch(e){res.status(500).json({error:e.message})}
})

module.exports=router
