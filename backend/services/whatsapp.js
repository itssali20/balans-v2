const axios=require('axios')
const sb=require('./supabase')

const getConfig=async()=>{
  const{data:settings}=await sb.from('settings').select('key,value').in('key',['whatsapp_api_token','whatsapp_phone_number_id'])
  const cfg={}
  settings?.forEach(s=>{cfg[s.key]=s.value})
  return{token:cfg.whatsapp_api_token||process.env.WHATSAPP_API_TOKEN,phoneNumberId:cfg.whatsapp_phone_number_id||process.env.WHATSAPP_PHONE_NUMBER_ID}
}

const sendWhatsApp=async(to,message)=>{
  try{
    const{token,phoneNumberId}=await getConfig()
    if(!token||!phoneNumberId)return{success:false,error:'WhatsApp not configured'}
    const phone=to.replace(/\D/g,'')
    const response=await axios.post(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {messaging_product:'whatsapp',recipient_type:'individual',to:phone,type:'text',text:{preview_url:false,body:message}},
      {headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'}}
    )
    return{success:true,data:response.data}
  }catch(e){
    console.error('WhatsApp error:',e.response?.data||e.message)
    return{success:false,error:e.message}
  }
}

const sendBroadcast=async(numbers,message)=>{
  const results=await Promise.allSettled(numbers.map(n=>sendWhatsApp(n,message)))
  const sent=results.filter(r=>r.status==='fulfilled'&&r.value.success).length
  return{sent,total:numbers.length}
}

module.exports={sendWhatsApp,sendBroadcast}
