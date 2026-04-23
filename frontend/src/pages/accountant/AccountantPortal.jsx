import React,{useState}from'react'
import PortalLayout from'../../components/common/PortalLayout'

// ── LAYOUT ──────────────────────────────────────────────
const nav=[
  {section:'Overview',items:[
    {path:'/accountant/dashboard',icon:'⊞',label:'Dashboard'},
  ]},
  {section:'My Work',items:[
    {path:'/accountant/clients',icon:'👥',label:'My Clients'},
    {path:'/accountant/tasks',icon:'✅',label:'My Tasks',badge:3},
    {path:'/accountant/documents',icon:'📁',label:'Documents'},
    {path:'/accountant/reports',icon:'📊',label:'Reports'},
  ]},
  {section:'Compliance',items:[
    {path:'/accountant/vat',icon:'🧾',label:'VAT Centre'},
    {path:'/accountant/corp-tax',icon:'🏛',label:'Corporate Tax'},
    {path:'/accountant/bookkeeping',icon:'📚',label:'Bookkeeping'},
  ]},
  {section:'Communication',items:[
    {path:'/accountant/chat',icon:'💬',label:'Client Chat',badge:2},
    {path:'/accountant/meetings',icon:'📅',label:'Meetings'},
  ]},
  {section:'System',items:[
    {path:'/accountant/notifications',icon:'🔔',label:'Notifications',badge:4},
    {path:'/accountant/profile',icon:'👤',label:'My Profile'},
  ]},
]

export function AccountantLayout(){
  return <PortalLayout navItems={nav} role="accountant" topbarExtras={<div className="tb-chip chip-red">⚠️ 2 Overdue Tasks</div>}/>
}

// ── DASHBOARD ──────────────────────────────────────────
export function AccountantDashboard(){
  return(
    <div>
      <div className="dark-hero" style={{marginBottom:16}}>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',marginBottom:6}}>Good morning</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:26,fontWeight:900,color:'#fff',marginBottom:6}}>Welcome back, Rashmi 👋</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.5)'}}>You have <strong style={{color:'#ff8080'}}>2 overdue tasks</strong> and <strong style={{color:'var(--gold)'}}>3 tasks due today</strong>.</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{v:'8',l:'Active Clients'},{v:'18',l:'Open Tasks'},{v:'AED 6,840',l:'Commission (Jun)'},{v:'4h 22m',l:'Logged Today'}].map((s,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:18,fontWeight:900,color:i===2?'var(--gold)':'#fff'}}>{s.v}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.35)',marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 300px',gap:16}}>
        {/* Overdue tasks */}
        <div className="card">
          <div className="card-head"><div className="card-title">🔴 Overdue Tasks</div><span className="badge badge-red">2 overdue</span></div>
          {[
            {task:'VAT Return Q1 — Ahmed Al Rashid',due:'Jun 20',overdue:5,client:'Ahmed Al Rashid'},
            {task:'Bookkeeping May — Nadia Khoury',due:'Jun 22',overdue:3,client:'Nadia Khoury'},
          ].map((t,i)=>(
            <div key={i} style={{padding:'12px 18px',borderBottom:i<1?'1px solid var(--grey2)':'none',background:'var(--red-xlt)'}}>
              <div style={{fontSize:12,fontWeight:600,color:'var(--red)',marginBottom:4}}>{t.task}</div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{fontSize:11,color:'var(--muted)'}}>Due: {t.due}</span>
                <span className="badge badge-red">-{t.overdue} days overdue</span>
                <button className="btn btn-primary btn-sm" style={{marginLeft:'auto'}}>Start Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Today's tasks */}
        <div className="card">
          <div className="card-head"><div className="card-title">📋 Due Today</div><span className="badge badge-orange">3 tasks</span></div>
          {[
            {task:'Monthly Report — Mohammed Hassan',type:'Report',credits:60},
            {task:'Bookkeeping — Sara Mohammed',type:'Bookkeeping',credits:80},
            {task:'VAT Review — Fatima Al Amiri',type:'VAT',credits:40},
          ].map((t,i)=>(
            <div key={i} style={{padding:'12px 18px',borderBottom:i<2?'1px solid var(--grey2)':'none'}}>
              <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{t.task}</div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span className="badge badge-blue">{t.type}</span>
                <span style={{fontSize:11,color:'var(--muted)'}}>🪙 {t.credits} credits</span>
                <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto'}}>Mark Done ✓</button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming VAT */}
        <div className="card">
          <div className="card-head"><div className="card-title">📅 VAT Deadlines</div></div>
          {[
            {client:'Ahmed Al Rashid',due:'Jun 28',days:8,urgent:true},
            {client:'Rajan Joshi',due:'Jun 28',days:8,urgent:true},
            {client:'Sara Mohammed',due:'Jul 15',days:25,urgent:false},
            {client:'Mohammed Hassan',due:'Jul 28',days:38,urgent:false},
          ].map((v,i)=>(
            <div key={i} style={{padding:'10px 14px',borderBottom:i<3?'1px solid var(--grey2)':'none',background:v.urgent?'var(--red-xlt)':''}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:12,fontWeight:600}}>{v.client}</div>
                <span className={`badge ${v.urgent?'badge-red':'badge-green'}`}>{v.days} days</span>
              </div>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Due: {v.due}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── MY CLIENTS ──────────────────────────────────────────
export function AccountantClients(){
  const clients=[
    {name:'Ahmed Al Rashid',company:'Al Rashid Trading',plan:'Starter',credits:{used:480,total:600},vat:'Pending',kyc:'✓',last:'Today'},
    {name:'Sara Mohammed',company:"Sara's Kitchen",plan:'Growth',credits:{used:840,total:1200},vat:'✓ Filed',kyc:'✓',last:'Yesterday'},
    {name:'Mohammed Hassan',company:'Gulf Import FZE',plan:'Pro',credits:{used:1200,total:1800},vat:'✓ Filed',kyc:'✓',last:'Today'},
    {name:'Fatima Al Amiri',company:'Amiri Clinic',plan:'Pro',credits:{used:900,total:1800},vat:'✓ Filed',kyc:'✓',last:'Jun 12'},
    {name:'Nadia Khoury',company:'NK Beauty Lounge',plan:'Starter',credits:{used:45,total:600},vat:'Not Reg',kyc:'Pending',last:'Jun 10'},
    {name:'Khalid Al M.',company:'KM Real Estate',plan:'Growth',credits:{used:600,total:1200},vat:'✓ Filed',kyc:'✓',last:'Jun 11'},
    {name:'Yasmin Al F.',company:'YF Fashion',plan:'Starter',credits:{used:200,total:600},vat:'Pending',kyc:'Pending',last:'Jun 9'},
    {name:'Hanan Saleh',company:'HS Boutique',plan:'Growth',credits:{used:500,total:1200},vat:'✓ Filed',kyc:'✓',last:'Jun 8'},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">👥 My Clients</div><div className="ph-sub">8 clients assigned to you</div></div></div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'8',l:'Total Clients',bg:'var(--blue-lt)'},{v:'5',l:'Fully Compliant',bg:'var(--green-lt)'},{v:'3',l:'Need Attention',bg:'var(--orange-lt)'},{v:'80%',l:'Capacity Used',bg:'var(--red-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'👥✅⚠️⚖️'[i]}</div><div className="sc-val" style={{fontSize:24}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Plan</th><th>Credits</th><th>VAT Status</th><th>KYC</th><th>Last Active</th><th>Action</th></tr></thead>
            <tbody>
              {clients.map((c,i)=>(
                <tr key={i} style={{background:c.credits.used/c.credits.total>0.9?'var(--red-xlt)':c.vat==='Pending'||c.kyc==='Pending'?'var(--gold-lt)':''}}>
                  <td>
                    <div style={{fontWeight:600}}>{c.name}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{c.company}</div>
                  </td>
                  <td><span className={`badge ${c.plan==='Pro'?'badge-gold':c.plan==='Growth'?'badge-green':'badge-blue'}`}>{c.plan}</span></td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div className="pb-track" style={{width:60}}><div className="pb-fill" style={{width:`${(c.credits.used/c.credits.total)*100}%`,background:c.credits.used/c.credits.total>0.9?'var(--red)':'var(--green)'}}/></div>
                      <span style={{fontSize:11,color:'var(--muted)'}}>{c.credits.used}/{c.credits.total}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${c.vat==='✓ Filed'?'badge-green':c.vat==='Not Reg'?'badge-red':'badge-orange'}`}>{c.vat}</span></td>
                  <td><span className={`badge ${c.kyc==='✓'?'badge-green':'badge-orange'}`}>{c.kyc}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{c.last}</td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="View">👁</button>
                      <button className="btn btn-primary btn-sm" style={{fontSize:11}}>+ Task</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── VAT CENTRE ──────────────────────────────────────────
export function AccountantVAT(){
  const[tab,setTab]=useState('urgent')
  const vatList=[
    {client:'Ahmed Al Rashid',period:'Q1 2025',due:'Jun 28',days:8,status:'not_started',trn:'100123456789003',urgent:true},
    {client:'Rajan Joshi',period:'Q1 2025',due:'Jun 28',days:8,status:'in_progress',trn:'100987654321001',urgent:true},
    {client:'Nadia Khoury',period:'Q1 2025',due:'Jul 2',days:12,status:'not_started',trn:'Pending Reg',urgent:false},
    {client:'Sara Mohammed',period:'Q1 2025',due:'Jul 15',days:25,status:'filed',trn:'100234567890001',urgent:false},
    {client:'Mohammed Hassan',period:'Q1 2025',due:'Jul 15',days:25,status:'filed',trn:'100345678901002',urgent:false},
  ]
  const stColors={not_started:'badge-red',in_progress:'badge-orange',filed:'badge-green',upcoming:'badge-blue'}
  return(
    <div>
      <div className="ph"><div><div className="ph-title">🧾 VAT Centre</div><div className="ph-sub">UAE FTA VAT filing tracker for all your clients</div></div></div>
      <div style={{background:'var(--red-lt)',border:'1px solid #FCA5A5',borderRadius:10,padding:'12px 16px',marginBottom:14,fontSize:13,color:'var(--red)',fontWeight:500}}>
        🚨 2 clients have VAT returns due within 14 days. File immediately to avoid FTA penalties.
      </div>
      <div className="tabs">
        {[['urgent','🔴 Urgent (2)'],['all','All Clients'],['filed','✅ Filed']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>VAT Period</th><th>Due Date</th><th>Days Left</th><th>TRN</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {vatList.filter(v=>tab==='filed'?v.status==='filed':tab==='urgent'?v.urgent:true).map((v,i)=>(
                <tr key={i} style={{background:v.urgent&&v.status!=='filed'?'var(--red-xlt)':''}}>
                  <td style={{fontWeight:600}}>{v.client}</td>
                  <td style={{fontSize:12}}>{v.period}</td>
                  <td style={{fontWeight:v.urgent?700:400,color:v.urgent&&v.status!=='filed'?'var(--red)':'inherit'}}>{v.due}</td>
                  <td><span className={`badge ${v.days<=14?'badge-red':v.days<=30?'badge-orange':'badge-green'}`}>{v.days} days</span></td>
                  <td style={{fontSize:11,color:'var(--muted)',fontFamily:'monospace'}}>{v.trn}</td>
                  <td><span className={`badge ${stColors[v.status]}`}>{v.status.replace('_',' ')}</span></td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      {v.status!=='filed'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}}>Start Filing</button>}
                      {v.status==='filed'&&<button className="btn btn-ghost btn-sm">👁 View</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── CHAT ──────────────────────────────────────────
export function AccountantChat(){
  const[active,setActive]=useState(0)
  const[input,setInput]=useState('')
  const convos=[
    {name:'Ahmed Al Rashid',company:'Al Rashid Trading',unread:1,last:'Can you send the report?',time:'10:12 AM'},
    {name:'Nadia Khoury',company:'NK Beauty Lounge',unread:1,last:'I uploaded the documents',time:'9:30 AM'},
    {name:'Sara Mohammed',company:"Sara's Kitchen",unread:0,last:'Thank you!',time:'Yesterday'},
    {name:'Mohammed Hassan',company:'Gulf Import FZE',unread:0,last:'Looks good 👍',time:'Jun 13'},
  ]
  const msgs=[
    {from:'client',text:"Hi Rashmi, can you please send me the May P&L report? I need it for a bank meeting.",time:'10:12 AM'},
    {from:'me',text:"Hi Ahmed! Of course. I'm just finalising it — will send it over within the hour.",time:'10:15 AM'},
    {from:'client',text:"Thank you so much! Also, should I be worried about the VAT return? It's due soon.",time:'10:18 AM'},
    {from:'me',text:"Don't worry at all — I've already started preparing it. I just need your May bank statement. Could you upload it to the portal?",time:'10:20 AM'},
  ]
  const send=()=>{if(!input.trim())return;setInput('')}
  return(
    <div style={{height:'calc(100vh - 110px)',display:'flex',flexDirection:'column'}}>
      <div className="ph" style={{marginBottom:12}}><div><div className="ph-title">💬 Client Chat</div><div className="ph-sub">Direct communication with your clients</div></div></div>
      <div style={{display:'flex',gap:0,flex:1,minHeight:0,border:'1px solid var(--grey2)',borderRadius:14,overflow:'hidden',boxShadow:'var(--shadow)'}}>
        {/* Conversations list */}
        <div style={{width:260,borderRight:'1px solid var(--grey2)',display:'flex',flexDirection:'column',background:'var(--white)'}}>
          <div style={{padding:'12px 16px',borderBottom:'1px solid var(--grey2)',fontSize:12,fontWeight:700,color:'var(--muted)'}}>CONVERSATIONS</div>
          {convos.map((c,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{padding:'12px 16px',borderBottom:'1px solid var(--grey2)',cursor:'pointer',background:active===i?'var(--red-xlt)':'var(--white)',transition:'.2s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:3}}>
                <div style={{fontSize:13,fontWeight:c.unread?700:500}}>{c.name}</div>
                <div style={{fontSize:10,color:'var(--muted)'}}>{c.time}</div>
              </div>
              <div style={{fontSize:11,color:'var(--muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.last}</div>
              {c.unread>0&&<div style={{width:18,height:18,background:'var(--red)',borderRadius:'50%',display:'grid',placeItems:'center',color:'#fff',fontSize:10,fontWeight:700,marginTop:4}}>{c.unread}</div>}
            </div>
          ))}
        </div>
        {/* Messages */}
        <div style={{flex:1,display:'flex',flexDirection:'column',background:'var(--off)'}}>
          <div style={{padding:'14px 18px',borderBottom:'1px solid var(--grey2)',background:'var(--white)',display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,flexShrink:0}}>{convos[active].name[0]}</div>
            <div><div style={{fontSize:13,fontWeight:700}}>{convos[active].name}</div><div style={{fontSize:11,color:'var(--muted)'}}>{convos[active].company}</div></div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:12}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:m.from==='me'?'flex-end':'flex-start'}}>
                <div style={{maxWidth:'70%',padding:'10px 14px',borderRadius:m.from==='me'?'14px 14px 4px 14px':'14px 14px 14px 4px',background:m.from==='me'?'linear-gradient(135deg,var(--red-dk),var(--red))':'var(--white)',color:m.from==='me'?'#fff':'var(--text)',fontSize:13,lineHeight:1.6,border:m.from==='me'?'none':'1px solid var(--grey2)',boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}>
                  {m.text}
                  <div style={{fontSize:10,marginTop:4,opacity:.6,textAlign:m.from==='me'?'right':'left'}}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 16px',borderTop:'1px solid var(--grey2)',background:'var(--white)',display:'flex',gap:10}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type a message..." style={{flex:1,padding:'10px 14px',border:'1.5px solid var(--grey2)',borderRadius:10,fontSize:13}}/>
            <button className="btn btn-primary btn-sm" onClick={send}>Send →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
