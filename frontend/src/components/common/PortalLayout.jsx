import React,{useState}from'react'
import{Outlet,useNavigate,useLocation}from'react-router-dom'
import{useAuth}from'../../context/AuthContext'

export default function PortalLayout({navItems,role,accentColor,topbarExtras}){
  const{profile,signOut}=useAuth()
  const navigate=useNavigate()
  const location=useLocation()
  const[open,setOpen]=useState(false)
  const cur=navItems.flatMap(s=>s.items||[s]).find(n=>location.pathname===n.path||location.pathname.startsWith(n.path+'/'))
  const roleLabels={admin:'CEO & Founder',accountant:'Senior Accountant',sales:'Sales Executive'}
  const portalLabels={admin:'Admin Centre',accountant:'Accountant Portal',sales:'Sales Portal'}

  return(
    <div className="shell">
      {open&&<div className="sb-ov" onClick={()=>setOpen(false)}/>}
      <aside className={`sidebar${open?' open':''}`}>
        <div className="sb-head">
          <div className="sb-mark">B</div>
          <div className="sb-brand">Balans<small>{portalLabels[role]}</small></div>
        </div>
        {role==='admin'&&(
          <div style={{background:'linear-gradient(135deg,rgba(201,146,26,.2),rgba(201,146,26,.08))',borderBottom:'1px solid rgba(201,146,26,.2)',padding:'10px 16px',display:'flex',alignItems:'center',gap:8}}>
            <span>👑</span><span style={{fontSize:10,fontWeight:700,color:'var(--gold)',letterSpacing:.5,textTransform:'uppercase'}}>CEO Full Access</span>
          </div>
        )}
        <nav className="sb-nav">
          {navItems.map((section,si)=>(
            <React.Fragment key={si}>
              {section.section&&<div className="sb-sec">{section.section}</div>}
              {(section.items||[section]).map((item,ii)=>(
                <button key={ii} className={`ni${location.pathname===item.path||location.pathname.startsWith(item.path+'/')?' active':''}`}
                  onClick={()=>{navigate(item.path);setOpen(false)}}>
                  <span className="ni-ic">{item.icon}</span>
                  {item.label}
                  {item.badge&&<span className="ni-badge">{item.badge}</span>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="sb-user" onClick={()=>{navigate(`/${role}/profile`);setOpen(false)}}>
            <div className="sb-av">{profile?.full_name?.[0]||'U'}</div>
            <div><div className="sb-uname">{profile?.full_name||'User'}</div><div className="sb-urole">{roleLabels[role]}</div></div>
          </div>
          <button className="sb-signout" onClick={signOut}>Sign Out</button>
        </div>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="tb-left">
            <button className="hbg" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
            <div style={{minWidth:0}}>
              <div className="tb-title">{cur?.label||'Dashboard'}</div>
              <div className="tb-sub">Welcome back, {profile?.full_name?.split(' ')[0]||'User'}</div>
            </div>
          </div>
          <div className="tb-right">
            {topbarExtras}
            <div className="tb-ic" onClick={()=>{navigate(`/${role}/notifications`);setOpen(false)}}>🔔<div className="ndot"/></div>
            <div className="tb-av" onClick={()=>{navigate(`/${role}/profile`);setOpen(false)}}>{profile?.full_name?.[0]||'U'}</div>
          </div>
        </div>
        <div className="pc"><Outlet/></div>
      </div>
    </div>
  )
}
