import React,{useState,useRef,useEffect}from'react'
import{Outlet,useNavigate,useLocation}from'react-router-dom'
import{useAuth}from'../../context/AuthContext'
import toast from'react-hot-toast'
import'./Client.css'

const navItems=[
  {path:'/client/dashboard',icon:'⊞',label:'Dashboard'},
  {path:'/client/documents',icon:'📁',label:'My Documents'},
  {path:'/client/reports',icon:'📊',label:'My Reports'},
  {path:'/client/credits',icon:'🪙',label:'Credits'},
  {path:'/client/payments',icon:'💳',label:'Payment History'},
  {path:'/client/kyc',icon:'🪪',label:'KYC Verification'},
  {path:'/client/chat',icon:'💬',label:'Chat & Support'},
  {path:'/client/profile',icon:'👤',label:'My Profile'},
]

// ── LAYOUT ──────────────────────────────────────────────
export function ClientLayout(){
  const{profile,signOut}=useAuth()
  const nav=useNavigate()
  const loc=useLocation()
  const[open,setOpen]=useState(false)
  const cur=navItems.find(n=>loc.pathname===n.path)
  const credits={used:840,total:1200}

  return(
    <div className="cl-shell">
      {open&&<div className="cl-ov" onClick={()=>setOpen(false)}/>}
      <aside className={`cl-sb${open?' open':''}`}>
        <div className="cl-sb-head">
          <div className="cl-sb-mark">B</div>
          <div className="cl-sb-brand">Balans<small>Client Portal</small></div>
        </div>
        <div className="cl-sb-plan">
          <div className="cl-plan-badge"><span>🌱</span><div><div style={{fontSize:11,fontWeight:700,color:'var(--gold)'}}>Growth Plan</div><div style={{fontSize:10,color:'rgba(255,255,255,.4)'}}>1,200 credits/month</div></div></div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.35)',marginBottom:4,display:'flex',justifyContent:'space-between'}}><span>Credits Used</span><span>{credits.used}/{credits.total}</span></div>
          <div className="cl-credit-bar"><div className="cl-credit-fill" style={{width:`${(credits.used/credits.total)*100}%`}}/></div>
        </div>
        <nav className="cl-nav">
          {navItems.map(item=>(
            <button key={item.path} className={`cl-ni${loc.pathname===item.path?' active':''}`} onClick={()=>{nav(item.path);setOpen(false)}}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="cl-sb-foot">
          <div className="cl-sb-user">
            <div className="cl-sb-av">{profile?.full_name?.[0]||'C'}</div>
            <div><div className="cl-sb-uname">{profile?.full_name||'Client'}</div><div className="cl-sb-urole">{profile?.company||'Your Company'}</div></div>
          </div>
          <button className="cl-signout" onClick={signOut}>Sign Out</button>
        </div>
      </aside>
      <div className="cl-main">
        <div className="cl-topbar">
          <div className="cl-tb-left">
            <button className="cl-hbg" onClick={()=>setOpen(!open)}><span/><span/><span/></button>
            <div><div className="cl-tb-title">{cur?.label||'Dashboard'}</div><div className="cl-tb-sub">Welcome back, {profile?.full_name?.split(' ')[0]||'Client'}</div></div>
          </div>
          <div className="cl-tb-right">
            <div className="cl-tb-ic" onClick={()=>nav('/client/chat')}>💬<div className="cl-ndot"/></div>
            <div className="cl-tb-av" onClick={()=>nav('/client/profile')}>{profile?.full_name?.[0]||'C'}</div>
          </div>
        </div>
        <div className="cl-content"><Outlet/></div>
      </div>
    </div>
  )
}

// ── LOGIN ──────────────────────────────────────────────
export function ClientLogin(){
  const{signIn}=useAuth()
  const nav=useNavigate()
  const[email,setEmail]=useState('')
  const[pw,setPw]=useState('')
  const[loading,setLoading]=useState(false)

 const submit=async(e)=>{
  e.preventDefault();setLoading(true)
  const{error}=await signIn(email,pw)
  if(error){
    toast.error(error.message||'Invalid credentials')
    setLoading(false)
  } else {
    toast.success('Welcome back!')
    // Small delay to let profile load
    setTimeout(()=>{
      nav('/client/dashboard')
      setLoading(false)
    },800)
  }
}


  return(
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-left-inner">
          <div className="al-logo"><div className="al-mark">B</div><div className="al-brand">Balans<small>Client Portal</small></div></div>
          <div className="al-badge">🔐 Secure Client Access</div>
          <h1 className="al-title">Your finances.<br/><span>Always in view.</span></h1>
          <p className="al-sub">Access your documents, reports, VAT filings, credits and chat with your accountant — all in one place.</p>
          <div className="al-feats">
            {[['📊','Monthly P&L and financial reports'],['📁','Secure document storage & sharing'],['🧾','VAT filing status & deadlines'],['💬','Direct chat with your accountant'],['🪙','Credit usage and top-up tracking']].map(([ic,txt],i)=>(
              <div key={i} className="al-feat"><div className="al-feat-ic">{ic}</div>{txt}</div>
            ))}
          </div>
          <div className="al-stats">
            <div className="al-stat"><div className="al-stat-num">24+</div><div className="al-stat-lbl">Active Clients</div></div>
            <div className="al-stat"><div className="al-stat-num">ACCA</div><div className="al-stat-lbl">Qualified</div></div>
            <div className="al-stat"><div className="al-stat-num">UAE & UK</div><div className="al-stat-lbl">Coverage</div></div>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div style={{textAlign:'center',marginBottom:20}}><div className="al-mark" style={{width:44,height:44,fontSize:22,margin:'0 auto'}}>B</div></div>
          <h2>Welcome back</h2>
          <p>Sign in to your Balans client portal</p>
          <form onSubmit={submit}>
            <div className="fg"><label>Email Address</label><input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
            <div className="fg"><label>Password</label><input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} required/></div>
            <div style={{textAlign:'right',marginTop:-10,marginBottom:14}}><a href="#" style={{fontSize:12,color:'var(--red)'}}>Forgot password?</a></div>
            <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:13,fontSize:15,marginTop:4}} disabled={loading}>
              {loading?'Signing in...':'Sign In to Portal →'}
            </button>
          </form>
          <div style={{display:'flex',alignItems:'center',gap:12,margin:'20px 0',color:'var(--muted)',fontSize:12}}>
            <div style={{flex:1,height:1,background:'var(--grey2)'}}/>New to Balans?<div style={{flex:1,height:1,background:'var(--grey2)'}}/>
          </div>
          <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-outline" style={{width:'100%',justifyContent:'center',padding:12,display:'flex'}}>
            💬 Get Started — WhatsApp Us
          </a>
          <p style={{textAlign:'center',fontSize:11,color:'var(--muted)',marginTop:16}}>🔒 Bank-level encryption · Your data is always secure</p>
        </div>
      </div>
    </div>
  )
}

// ── DASHBOARD ──────────────────────────────────────────────
export function ClientDashboard(){
  const{profile}=useAuth()
  const nav=useNavigate()
  const name=profile?.full_name?.split(' ')[0]||'there'
  const credits={used:840,total:1200}

  return(
    <div>
      <div className="cl-hero">
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:6,letterSpacing:1,textTransform:'uppercase'}}>Good morning</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:26,fontWeight:900,color:'#fff',marginBottom:6}}>Welcome back, {name} 👋</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.5)'}}>Your accountant <strong style={{color:'rgba(255,255,255,.8)'}}>Rashmi Sharma</strong> is working on your May reports</div>
            </div>
            <div style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:12,padding:'14px 20px',textAlign:'center',minWidth:140}}>
              <div style={{fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>Plan</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:22,fontWeight:900,color:'var(--gold)'}}>Growth</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',marginTop:2}}>AED 1,500/month</div>
            </div>
          </div>
          <div style={{marginTop:16,background:'rgba(192,0,26,.15)',border:'1px solid rgba(192,0,26,.3)',borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:16}}>🚨</span>
            <div style={{fontSize:12,color:'rgba(255,200,200,.9)',flex:1}}><strong>2 actions needed:</strong> Upload bank statements and complete KYC to avoid delays</div>
            <button className="btn btn-sm" style={{background:'rgba(192,0,26,.4)',color:'#fff',border:'1px solid rgba(192,0,26,.5)',whiteSpace:'nowrap'}} onClick={()=>nav('/client/documents')}>View →</button>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:16}}>
        {[{icon:'🪙',bg:'var(--gold-lt)',val:`${credits.used}/${credits.total}`,lbl:'Credits Used',sub:`${Math.round(credits.used/credits.total*100)}% used`},{icon:'📁',bg:'var(--blue-lt)',val:'28',lbl:'Documents',sub:'3 new this month'},{icon:'📊',bg:'var(--green-lt)',val:'6',lbl:'Reports Ready',sub:'Latest: Jun 5'},{icon:'🧾',bg:'var(--red-lt)',val:'✓',lbl:'VAT Status',sub:'Q1 Filed'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{s.icon}</div><div className="sc-val" style={{fontSize:i===2?28:18}}>{s.val}</div><div className="sc-lbl">{s.lbl}</div><div className="sc-trend t-neu">{s.sub}</div></div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:14}}>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div className="card-head"><div className="card-title">⚡ Action Required</div><span style={{fontSize:11,background:'var(--red-lt)',color:'var(--red)',padding:'2px 8px',borderRadius:50,fontWeight:700}}>3 pending</span></div>
            <div style={{padding:'0 18px'}}>
              {[{icon:'📋',label:'Upload May bank statements',due:'Due Jun 20',urgent:true},{icon:'🪪',label:'Complete KYC verification',due:'Pending',urgent:true},{icon:'📄',label:'Review & sign VAT return Q1',due:'Due Jun 25',urgent:false}].map((t,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:i<2?'1px solid var(--grey2)':'none'}}>
                  <div style={{width:36,height:36,borderRadius:10,background:t.urgent?'var(--red-lt)':'var(--soft)',display:'grid',placeItems:'center',fontSize:16,flexShrink:0}}>{t.icon}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.label}</div><div style={{fontSize:11,color:t.urgent?'var(--red)':'var(--muted)',marginTop:2}}>{t.due}</div></div>
                  {t.urgent&&<span style={{fontSize:10,background:'var(--red-lt)',color:'var(--red)',padding:'2px 8px',borderRadius:50,fontWeight:700,whiteSpace:'nowrap'}}>Urgent</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head"><div className="card-title">📁 Recent Documents</div><span className="card-link" onClick={()=>nav('/client/documents')}>View all →</span></div>
            <div style={{padding:'0 18px'}}>
              {[{icon:'📊',name:'P&L Report — May 2025',date:'Jun 5',type:'Report',bg:'var(--green-lt)'},{icon:'🧾',name:'VAT Return Q1 2025',date:'Jun 3',type:'VAT',bg:'var(--blue-lt)'},{icon:'📁',name:'Bank Statement — Apr 2025',date:'May 28',type:'Document',bg:'var(--purple-lt)'}].map((d,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:i<2?'1px solid var(--grey2)':'none'}}>
                  <div style={{width:36,height:36,borderRadius:10,background:d.bg,display:'grid',placeItems:'center',fontSize:16,flexShrink:0}}>{d.icon}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{d.name}</div><div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{d.type} · {d.date}</div></div>
                  <button className="btn btn-ghost btn-sm">⬇</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head"><div className="card-title">🪙 Credit Usage</div><span className="card-link" onClick={()=>nav('/client/credits')}>Details →</span></div>
            <div style={{padding:'16px 18px'}}>
              {[{l:'VAT Filing',used:240,color:'var(--blue)'},{l:'Bookkeeping',used:320,color:'var(--green)'},{l:'Monthly Report',used:180,color:'var(--purple)'},{l:'Advisory',used:100,color:'var(--gold)'}].map((item,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}><span style={{fontWeight:500}}>{item.l}</span><span style={{color:'var(--muted)'}}>{item.used} credits</span></div>
                  <div className="pb-track"><div className="pb-fill" style={{width:`${(item.used/credits.total)*100}%`,background:item.color}}/></div>
                </div>
              ))}
              <div style={{marginTop:14,padding:'10px 12px',background:'var(--gold-lt)',borderRadius:8,display:'flex',justifyContent:'space-between',fontSize:13}}>
                <span style={{fontWeight:600}}>Remaining</span><span style={{fontWeight:700,color:'var(--gold)'}}>{credits.total-credits.used} credits</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card" style={{padding:18}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>👩‍💼 Your Accountant</div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:20,flexShrink:0}}>R</div>
              <div>
                <div style={{fontSize:14,fontWeight:700}}>Rashmi Sharma</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>ACCA Qualified · UAE Specialist</div>
                <div style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:10,background:'var(--green-lt)',color:'var(--green)',padding:'2px 8px',borderRadius:50,fontWeight:700,marginTop:4}}>● Online now</div>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',marginBottom:14,lineHeight:1.6}}>Currently working on your May P&L report. Expected by June 18.</div>
            <button className="btn btn-primary btn-sm" style={{width:'100%',justifyContent:'center',marginBottom:8}} onClick={()=>nav('/client/chat')}>💬 Message Rashmi</button>
            <a href="https://calendly.com/rashmi-balans" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{width:'100%',justifyContent:'center',display:'flex'}}>📅 Book a Call</a>
          </div>

          <div className="card" style={{padding:18}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📅 Upcoming Dates</div>
            {[{date:'Jun 20',label:'Bank statements due',urgent:true},{date:'Jun 25',label:'VAT return to review',urgent:false},{date:'Jun 28',label:'VAT filing deadline',urgent:false},{date:'Jul 1',label:'Subscription renews',urgent:false},{date:'Jul 15',label:'Q2 review call',urgent:false}].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',paddingBottom:10,borderBottom:i<4?'1px solid var(--grey2)':'none',marginBottom:i<4?10:0}}>
                <div style={{fontSize:10,fontWeight:700,color:t.urgent?'var(--red)':'var(--muted)',textTransform:'uppercase',width:36,flexShrink:0}}>{t.date}</div>
                <div style={{fontSize:12,color:t.urgent?'var(--red)':'var(--text)',fontWeight:t.urgent?600:400}}>{t.urgent?'🔴 ':''}{t.label}</div>
              </div>
            ))}
          </div>

          <div style={{background:'linear-gradient(135deg,#0F0F0F,#1A0005)',borderRadius:14,padding:18,border:'1px solid rgba(201,146,26,.2)'}}>
            <div style={{fontSize:11,color:'rgba(255,255,255,.4)',marginBottom:6,letterSpacing:1,textTransform:'uppercase'}}>Upgrade Available</div>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:700,color:'#fff',marginBottom:6}}>Go Pro & save time</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginBottom:14,lineHeight:1.6}}>Get 1,800 credits, payroll processing, CFO calls and same-day responses.</div>
            <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-gold btn-sm" style={{width:'100%',justifyContent:'center',display:'flex'}}>Upgrade to Pro →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── DOCUMENTS ──────────────────────────────────────────────
export function ClientDocuments(){
  const docs=[
    {name:'VAT Return Q1 2025 — Final',type:'VAT',date:'Jun 14',size:'284 KB',by:'Rashmi S.',status:'approved'},
    {name:'P&L Report — May 2025',type:'Report',date:'Jun 5',size:'156 KB',by:'Rashmi S.',status:'approved'},
    {name:'Bank Statement — May 2025',type:'Bank',date:'Jun 1',size:'892 KB',by:'You',status:'approved'},
    {name:'Trade Licence — 2025',type:'KYC',date:'May 10',size:'3.1 MB',by:'You',status:'approved'},
    {name:'VAT Certificate — FTA',type:'VAT',date:'Apr 20',size:'210 KB',by:'Rashmi S.',status:'approved'},
    {name:'P&L Report — Apr 2025',type:'Report',date:'May 5',size:'148 KB',by:'Rashmi S.',status:'approved'},
  ]
  const typeColor={VAT:'badge-blue',Report:'badge-green',Bank:'badge-purple',KYC:'badge-gold',Bookkeeping:'badge-orange'}
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📁 My Documents</div><div className="ph-sub">All your files in one secure place</div></div>
        <label className="btn btn-primary btn-sm" style={{cursor:'pointer'}}>⬆ Upload<input type="file" style={{display:'none'}} onChange={()=>toast.success('Document uploaded!')}/></label>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Document</th><th>Type</th><th>Uploaded By</th><th>Date</th><th>Size</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {docs.map((d,i)=>(
                <tr key={i}><td style={{fontWeight:600}}>{d.name}</td><td><span className={`badge ${typeColor[d.type]||'badge-grey'}`}>{d.type}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{d.by}</td><td style={{fontSize:12,color:'var(--muted)'}}>{d.date}</td><td style={{fontSize:12,color:'var(--muted)'}}>{d.size}</td><td><span className="badge badge-green">✓ Approved</span></td><td><button className="btn btn-ghost btn-sm">⬇</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── REPORTS ──────────────────────────────────────────────
export function ClientReports(){
  const reports=[
    {name:'P&L Report — May 2025',type:'P&L',period:'May 2025',date:'Jun 5',opened:true,openedDate:'Jun 6'},
    {name:'VAT Return Summary Q1',type:'VAT',period:'Q1 2025',date:'Jun 3',opened:true,openedDate:'Jun 3'},
    {name:'Monthly Review — May',type:'Review',period:'May 2025',date:'Jun 5',opened:false},
    {name:'P&L Report — Apr 2025',type:'P&L',period:'Apr 2025',date:'May 5',opened:true,openedDate:'May 6'},
    {name:'VAT Return Q4 2024',type:'VAT',period:'Q4 2024',date:'Feb 10',opened:true,openedDate:'Feb 11'},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">📊 My Reports</div><div className="ph-sub">All reports from your accountant</div></div></div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Report</th><th>Type</th><th>Period</th><th>Sent</th><th>Opened</th><th></th></tr></thead>
            <tbody>
              {reports.map((r,i)=>(
                <tr key={i}><td style={{fontWeight:600}}>{r.name}</td><td><span className="badge badge-blue">{r.type}</span></td><td style={{fontSize:12,color:'var(--muted)'}}>{r.period}</td><td style={{fontSize:12,color:'var(--muted)'}}>{r.date}</td><td>{r.opened?<span className="badge badge-green">✓ {r.openedDate}</span>:<span className="badge badge-orange">Not opened</span>}</td><td><button className="btn btn-ghost btn-sm">⬇</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── CREDITS ──────────────────────────────────────────────
export function ClientCredits(){
  const total=1200,used=840,remaining=total-used
  const history=[
    {date:'Jun 14',desc:'VAT Return Q1 — Filing',credits:-120,by:'Rashmi S.'},
    {date:'Jun 10',desc:'Monthly Bookkeeping — May',credits:-80,by:'Rashmi S.'},
    {date:'Jun 5',desc:'P&L Report — May 2025',credits:-60,by:'Rashmi S.'},
    {date:'Jun 1',desc:'Monthly subscription renewed',credits:+1200,by:'System'},
    {date:'May 28',desc:'Advisory call — 45 min',credits:-100,by:'Rashmi S.'},
    {date:'May 15',desc:'VAT registration — FTA',credits:-200,by:'Rashmi S.'},
  ]
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🪙 Credits</div><div className="ph-sub">Track your credit usage</div></div>
        <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">+ Top Up Credits</a>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:16}}>
        {[{v:total.toLocaleString(),l:'Monthly Allowance',bg:'var(--gold-lt)'},{v:used,l:'Used This Month',bg:'var(--red-lt)'},{v:remaining,l:'Remaining',bg:'var(--green-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🪙📉✅'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><div className="card-title">Credit History</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Description</th><th>By</th><th>Credits</th></tr></thead>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i}><td style={{fontSize:12,color:'var(--muted)'}}>{h.date}</td><td style={{fontWeight:500}}>{h.desc}</td><td style={{fontSize:12,color:'var(--muted)'}}>{h.by}</td><td style={{fontWeight:700,color:h.credits>0?'var(--green)':'var(--red)'}}>{h.credits>0?'+':''}{h.credits}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── KYC ──────────────────────────────────────────────
export function ClientKYC(){
  const docs=[
    {label:'Emirates ID (Front)',status:'approved',icon:'🪪'},
    {label:'Emirates ID (Back)',status:'approved',icon:'🪪'},
    {label:'Passport Copy',status:'missing',icon:'📄'},
    {label:'Trade Licence',status:'approved',icon:'🏢'},
    {label:'Bank Statement (3 months)',status:'pending',icon:'🏦'},
  ]
  const statusBadge={approved:<span className="badge badge-green">✓ Approved</span>,pending:<span className="badge badge-orange">⏳ Under Review</span>,missing:<span className="badge badge-red">Missing</span>}
  return(
    <div>
      <div className="ph"><div><div className="ph-title">🪪 KYC Verification</div><div className="ph-sub">Identity verification for compliance</div></div></div>
      <div style={{background:'var(--orange-lt)',border:'1px solid var(--orange)',borderRadius:12,padding:'14px 18px',marginBottom:20,fontSize:13,color:'var(--orange)'}}>
        ⚠️ Your KYC is <strong>incomplete</strong>. Please upload missing documents to avoid service interruption.
      </div>
      <div className="card" style={{padding:24}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Required Documents</div>
        {docs.map((d,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:i<docs.length-1?'1px solid var(--grey2)':'none'}}>
            <div style={{width:40,height:40,borderRadius:10,background:'var(--soft)',display:'grid',placeItems:'center',fontSize:18,flexShrink:0}}>{d.icon}</div>
            <div style={{flex:1,fontWeight:600,fontSize:13}}>{d.label}</div>
            {statusBadge[d.status]}
            {d.status==='missing'&&<label className="btn btn-primary btn-sm" style={{cursor:'pointer'}}>Upload<input type="file" style={{display:'none'}} onChange={()=>toast.success('Document uploaded!')}/></label>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── PAYMENTS ──────────────────────────────────────────────
export function ClientPayments(){
  const payments=[
    {date:'Jun 1, 2025',desc:'Growth Plan — June 2025',amount:'AED 1,500',method:'Visa ••5521',status:'paid',invoice:'INV-0024'},
    {date:'May 1, 2025',desc:'Growth Plan — May 2025',amount:'AED 1,500',method:'Visa ••5521',status:'paid',invoice:'INV-0018'},
    {date:'Apr 1, 2025',desc:'Growth Plan — April 2025',amount:'AED 1,500',method:'Visa ••5521',status:'paid',invoice:'INV-0012'},
    {date:'Mar 1, 2025',desc:'Growth Plan — March 2025',amount:'AED 1,500',method:'Visa ••5521',status:'paid',invoice:'INV-0006'},
    {date:'Feb 1, 2025',desc:'Starter Plan — February 2025',amount:'AED 750',method:'Visa ••5521',status:'paid',invoice:'INV-0002'},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">💳 Payment History</div><div className="ph-sub">All your subscription payments</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:16}}>
        {[{v:'AED 6,750',l:'Total Paid 2025',bg:'var(--green-lt)'},{v:'5',l:'Payments Made',bg:'var(--blue-lt)'},{v:'Jul 1',l:'Next Payment',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'✅💳📅'[i]}</div><div className="sc-val" style={{fontSize:i===0?16:i===2?18:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Method</th><th>Invoice</th><th>Status</th></tr></thead>
            <tbody>
              {payments.map((p,i)=>(
                <tr key={i}><td style={{fontSize:12,color:'var(--muted)'}}>{p.date}</td><td style={{fontWeight:500}}>{p.desc}</td><td style={{fontWeight:700,color:'var(--green)'}}>{p.amount}</td><td style={{fontSize:12,color:'var(--muted)'}}>{p.method}</td><td><button className="btn btn-ghost btn-sm" style={{fontSize:11}}>⬇ {p.invoice}</button></td><td><span className="badge badge-green">✓ Paid</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── CHAT ──────────────────────────────────────────────
export function ClientChat(){
  const[msgs,setMsgs]=useState([
    {from:'acc',text:"Good morning! Your May P&L report is ready. Please check the documents section.",time:'9:02 AM'},
    {from:'me',text:"Thank you Rashmi! I will review it shortly.",time:'9:45 AM'},
    {from:'acc',text:"Also, I noticed your bank statements for May are still missing. Could you upload them? We need them for the reconciliation.",time:'10:12 AM'},
    {from:'acc',text:"Your VAT return for Q1 is also due June 28. I'll start preparing it once I have the bank statements.",time:'10:13 AM'},
  ])
  const[input,setInput]=useState('')
  const[typing,setTyping]=useState(false)
  const bottomRef=useRef(null)
  useEffect(()=>bottomRef.current?.scrollIntoView({behavior:'smooth'}),[msgs])

  const send=()=>{
    if(!input.trim())return
    setMsgs(p=>[...p,{from:'me',text:input,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])
    setInput('');setTyping(true)
    setTimeout(()=>{setTyping(false);setMsgs(p=>[...p,{from:'acc',text:'Thanks! I\'ll get back to you shortly. Our response time is within 2 hours during business hours.',time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])},2000)
  }

  return(
    <div style={{height:'calc(100vh - 110px)',display:'flex',flexDirection:'column'}}>
      <div className="ph" style={{marginBottom:12}}><div><div className="ph-title">💬 Chat & Support</div><div className="ph-sub">Direct line to your accountant</div></div></div>
      <div style={{display:'flex',gap:14,flex:1,minHeight:0}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--white)',borderRadius:14,border:'1px solid var(--grey2)',overflow:'hidden',boxShadow:'var(--shadow)'}}>
          <div style={{padding:'14px 18px',borderBottom:'1px solid var(--grey2)',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:16,flexShrink:0}}>R</div>
            <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>Rashmi Sharma</div><div style={{fontSize:11,color:'var(--green)',fontWeight:600}}>● Online · Replies within 2 hours</div></div>
            <a href="https://calendly.com/rashmi-balans" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">📅 Book Call</a>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:12,background:'var(--off)'}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:m.from==='me'?'flex-end':'flex-start',alignItems:'flex-end',gap:8}}>
                {m.from==='acc'&&<div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:11,flexShrink:0,marginBottom:2}}>R</div>}
                <div style={{maxWidth:'70%'}}>
                  <div style={{padding:'10px 14px',borderRadius:m.from==='me'?'14px 14px 4px 14px':'14px 14px 14px 4px',background:m.from==='me'?'linear-gradient(135deg,var(--red-dk),var(--red))':'var(--white)',color:m.from==='me'?'#fff':'var(--text)',fontSize:13,lineHeight:1.6,border:m.from==='me'?'none':'1px solid var(--grey2)',boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}>{m.text}</div>
                  <div style={{fontSize:10,color:'var(--muted)',marginTop:3,textAlign:m.from==='me'?'right':'left'}}>{m.time}</div>
                </div>
              </div>
            ))}
            {typing&&<div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:11,flexShrink:0}}>R</div><div style={{padding:'10px 16px',background:'var(--white)',border:'1px solid var(--grey2)',borderRadius:'14px 14px 14px 4px',fontSize:18,letterSpacing:4}}>...</div></div>}
            <div ref={bottomRef}/>
          </div>
          <div style={{padding:'12px 16px',borderTop:'1px solid var(--grey2)',background:'var(--white)',display:'flex',gap:10,alignItems:'flex-end'}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Type a message... (Enter to send)" style={{flex:1,padding:'10px 14px',border:'1.5px solid var(--grey2)',borderRadius:10,fontSize:13,resize:'none',minHeight:44,maxHeight:120,fontFamily:'DM Sans,sans-serif',outline:'none'}} rows={1}/>
            <button className="btn btn-primary btn-sm" onClick={send} style={{height:44,padding:'0 16px'}}>Send →</button>
          </div>
        </div>
        <div style={{width:220,display:'flex',flexDirection:'column',gap:12}}>
          <div className="card" style={{padding:16}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>Quick Actions</div>
            {[{icon:'📁',label:'Send a document'},{icon:'📅',label:'Book a meeting',href:'https://calendly.com/rashmi-balans'},{icon:'💬',label:'WhatsApp us',href:'https://wa.me/971527404854'}].map((a,i)=>(
              a.href?<a key={i} href={a.href} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'flex-start',marginBottom:6,display:'flex',textDecoration:'none'}}>{a.icon} {a.label}</a>:<button key={i} className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'flex-start',marginBottom:6}}>{a.icon} {a.label}</button>
            ))}
          </div>
          <div className="card" style={{padding:16}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>Support Hours</div>
            <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
              <div>🕙 Mon–Sat: 10AM–7PM</div><div>🇦🇪 UAE Time (GST+4)</div>
              <div style={{marginTop:8,color:'var(--green)',fontWeight:600}}>● Currently Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PROFILE ──────────────────────────────────────────────
export function ClientProfile(){
  const{profile}=useAuth()
  const[form,setForm]=useState({full_name:profile?.full_name||'Sara Mohammed',email:profile?.email||'sara@saraskitchen.ae',phone:'+971 50 123 4567',company:"Sara's Kitchen",country:'UAE',vat_number:'100234567890001'})
  return(
    <div>
      <div className="ph"><div><div className="ph-title">👤 My Profile</div><div className="ph-sub">Manage your account details</div></div></div>
      <div style={{background:'linear-gradient(135deg,#0F0F0F,#1A0005)',borderRadius:16,padding:'24px 28px',marginBottom:20,display:'flex',alignItems:'center',gap:20}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:26,flexShrink:0}}>{form.full_name[0]}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,fontWeight:700,color:'#fff'}}>{form.full_name}</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:3}}>{form.company} · {form.country}</div>
          <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
            {['🌱 Growth Plan','✓ KYC In Progress','Member since Feb 2025'].map((b,i)=>(
              <span key={i} style={{fontSize:11,background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.5)',padding:'3px 10px',borderRadius:50,fontWeight:600}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card" style={{padding:22,gridColumn:'1/-1'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Personal Information</div>
          <div className="fg-row">
            <div className="fg"><label>Full Name</label><input value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></div>
            <div className="fg"><label>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
            <div className="fg"><label>WhatsApp / Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div className="fg"><label>Company Name</label><input value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></div>
            <div className="fg"><label>Country</label><select value={form.country} onChange={e=>setForm({...form,country:e.target.value})}><option>UAE</option><option>UK</option></select></div>
            <div className="fg"><label>VAT TRN</label><input value={form.vat_number} onChange={e=>setForm({...form,vat_number:e.target.value})}/></div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Profile updated!')}>Save Changes ✓</button>
        </div>
        <div className="card" style={{padding:22}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Change Password</div>
          <div className="fg"><label>Current Password</label><input type="password" placeholder="••••••••"/></div>
          <div className="fg"><label>New Password</label><input type="password" placeholder="••••••••"/></div>
          <div className="fg"><label>Confirm New Password</label><input type="password" placeholder="••••••••"/></div>
          <button className="btn btn-outline btn-sm" onClick={()=>toast.success('Password updated!')}>Update Password</button>
        </div>
        <div className="card" style={{padding:22}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Notification Preferences</div>
          {['New document uploaded','Report ready to view','VAT deadline reminders','Credit low warning','Monthly invoice','Promotional emails'].map((n,i)=>(
            <label key={i} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,marginBottom:10,cursor:'pointer'}}>
              <input type="checkbox" defaultChecked={i<5}/>{n}
            </label>
          ))}
          <button className="btn btn-outline btn-sm" onClick={()=>toast.success('Preferences saved!')}>Save Preferences</button>
        </div>
      </div>
    </div>
  )
}
