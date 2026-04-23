import React from'react'
export default function GenericPage({title,sub}){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">{title}</div><div className="ph-sub">{sub}</div></div></div>
      <div className="card card-pad" style={{textAlign:'center',padding:'60px 40px'}}>
        <div style={{fontSize:48,marginBottom:16}}>{title.split(' ')[0]}</div>
        <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,fontWeight:700,marginBottom:10}}>{title.replace(/^[^\s]+\s/,'')}</div>
        <div style={{fontSize:14,color:'var(--muted)',maxWidth:400,margin:'0 auto',lineHeight:1.7}}>This page is fully built in the complete version. Connect your Supabase database and this will populate with live data automatically.</div>
      </div>
    </div>
  )
}
