const supabase=require('../services/supabase')
const requireAuth=async(req,res,next)=>{
  try{
    const token=req.headers.authorization?.replace('Bearer ','')
    if(!token)return res.status(401).json({error:'No token'})
    const{data:{user},error}=await supabase.auth.getUser(token)
    if(error||!user)return res.status(401).json({error:'Invalid token'})
    const{data:profile}=await supabase.from('profiles').select('*').eq('id',user.id).single()
    if(!profile||!profile.is_active)return res.status(403).json({error:'Account inactive'})
    req.user={...user,...profile}
    next()
  }catch(e){res.status(401).json({error:'Auth failed'})}
}
const requireRole=(...roles)=>(req,res,next)=>{
  if(!roles.includes(req.user?.role))return res.status(403).json({error:'Insufficient permissions'})
  next()
}
module.exports={requireAuth,requireRole}
