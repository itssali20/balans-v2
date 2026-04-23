const router=require('express').Router()
const sb=require('../services/supabase')
const{sendEmail}=require('../services/email')

router.post('/',async(req,res)=>{
  let stripe
  try{
    const{data:sk}=await sb.from('settings').select('value').eq('key','stripe_secret_key').single()
    stripe=require('stripe')(sk.value)
  }catch{return res.status(500).json({error:'Stripe not configured'})}

  const sig=req.headers['stripe-signature']
  const{data:whs}=await sb.from('settings').select('value').eq('key','stripe_webhook_secret').single()
  let event
  try{event=stripe.webhooks.constructEvent(req.body,sig,whs?.value||process.env.STRIPE_WEBHOOK_SECRET)}
  catch(e){return res.status(400).send(`Webhook Error: ${e.message}`)}

  switch(event.type){
    case'invoice.payment_succeeded':{
      const inv=event.data.object
      await sb.from('transactions').insert({type:'stripe_payment',description:'Monthly subscription payment',amount:inv.amount_paid/100,stripe_invoice_id:inv.id,status:'success'})
      await sb.from('clients').update({payment_status:'active'}).eq('stripe_customer_id',inv.customer)
      const{data:client}=await sb.from('clients').select('*,profiles(email,full_name)').eq('stripe_customer_id',inv.customer).single()
      if(client?.profiles?.email){
        await sendEmail({to:client.profiles.email,subject:'✅ Payment Received — Balans',html:`<h2>Payment Confirmed</h2><p>Hi ${client.profiles.full_name}, your payment of AED ${inv.amount_paid/100} has been received. Thank you!</p>`}).catch(console.error)
      }
      break
    }
    case'invoice.payment_failed':{
      const inv=event.data.object
      await sb.from('transactions').insert({type:'failed_payment',description:'Payment failed',amount:inv.amount_due/100,stripe_invoice_id:inv.id,status:'failed'})
      await sb.from('clients').update({payment_status:'overdue'}).eq('stripe_customer_id',inv.customer)
      const{data:admin}=await sb.from('profiles').select('id').eq('role','admin').single()
      if(admin)await sb.from('notifications').insert({user_id:admin.id,title:'⚠️ Payment Failed',message:`Stripe payment failed — customer ${inv.customer}`,type:'finance'})
      break
    }
    case'customer.subscription.deleted':{
      const sub=event.data.object
      await sb.from('clients').update({payment_status:'cancelled'}).eq('stripe_subscription_id',sub.id)
      break
    }
  }
  res.json({received:true})
})

module.exports=router
