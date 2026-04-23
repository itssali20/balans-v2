const nodemailer=require('nodemailer')
const sb=require('./supabase')
let transporter=null

const getTransporter=async()=>{
  if(transporter)return transporter
  const{data:settings}=await sb.from('settings').select('key,value').in('key',['smtp_host','smtp_port','smtp_user','smtp_pass'])
  const cfg={}
  settings?.forEach(s=>{cfg[s.key]=s.value})
  transporter=nodemailer.createTransport({
    host:cfg.smtp_host||process.env.SMTP_HOST,
    port:parseInt(cfg.smtp_port||process.env.SMTP_PORT||'587'),
    secure:false,
    auth:{user:cfg.smtp_user||process.env.SMTP_USER,pass:cfg.smtp_pass||process.env.SMTP_PASS}
  })
  return transporter
}

const sendEmail=async({to,subject,html,text,from})=>{
  try{
    const t=await getTransporter()
    const{data:settings}=await sb.from('settings').select('key,value').in('key',['smtp_from_name','smtp_from_email'])
    const cfg={}
    settings?.forEach(s=>{cfg[s.key]=s.value})
    const fromAddr=from||`${cfg.smtp_from_name||'Balans'} <${cfg.smtp_from_email||'hello@balans.ae'}>`
    const result=await t.sendMail({from:fromAddr,to,subject,html,text})
    return{success:true,messageId:result.messageId}
  }catch(e){
    console.error('Email error:',e.message)
    return{success:false,error:e.message}
  }
}

const resetTransporter=()=>{transporter=null}

const sendCampaign=async(campaignId)=>{
  const{data:campaign}=await sb.from('email_campaigns').select('*').eq('id',campaignId).single()
  if(!campaign)return
  let q=sb.from('clients').select('*,profiles(email,full_name)')
  if(campaign.target==='starter')q=q.eq('plan','starter')
  else if(campaign.target==='growth')q=q.eq('plan','growth')
  else if(campaign.target==='pro')q=q.eq('plan','pro')
  else if(campaign.target==='uae')q=q.eq('country','UAE')
  else if(campaign.target==='uk')q=q.eq('country','UK')
  else if(campaign.target==='individual')q=q.eq('id',campaign.target_client_id)
  const{data:clients}=await q
  let sent=0
  for(const c of clients||[]){
    if(!c.profiles?.email)continue
    const body=campaign.body.replace('{{name}}',c.profiles.full_name||'there')
    await sendEmail({to:c.profiles.email,subject:campaign.subject,html:body})
    sent++
  }
  await sb.from('email_campaigns').update({status:'sent',sent_at:new Date().toISOString(),total_sent:sent}).eq('id',campaignId)
  return{sent}
}

module.exports={sendEmail,resetTransporter,sendCampaign}
