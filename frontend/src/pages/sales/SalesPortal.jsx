import React,{useState}from'react'
import PortalLayout from'../../components/common/PortalLayout'

// ── LAYOUT ──────────────────────────────────────────────
const nav=[
  {section:'Overview',items:[
    {path:'/sales/dashboard',icon:'⊞',label:'Dashboard'},
  ]},
  {section:'Leads',items:[
    {path:'/sales/leads',icon:'📥',label:'My Leads',badge:'New'},
    {path:'/sales/pipeline',icon:'📊',label:'Pipeline'},
    {path:'/sales/follow-ups',icon:'📞',label:'Follow-Ups'},
  ]},
  {section:'Tools',items:[
    {path:'/sales/scripts',icon:'💬',label:'WhatsApp Scripts'},
    {path:'/sales/objections',icon:'🛡',label:'Objection Handler'},
  ]},
  {section:'Performance',items:[
    {path:'/sales/commission',icon:'💰',label:'My Commission'},
    {path:'/sales/targets',icon:'🎯',label:'Targets & KPIs'},
  ]},
  {section:'System',items:[
    {path:'/sales/notifications',icon:'🔔',label:'Notifications',badge:3},
    {path:'/sales/profile',icon:'👤',label:'My Profile'},
  ]},
]

export function SalesLayout(){
  return <PortalLayout navItems={nav} role="sales" topbarExtras={<div className="tb-chip chip-green">🎯 12/20 this month</div>}/>
}

// ── DASHBOARD ──────────────────────────────────────────
export function SalesDashboard(){
  return(
    <div>
      {/* Hero */}
      <div className="dark-hero" style={{marginBottom:16}}>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',marginBottom:6}}>Your Month — June 2025</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:900,color:'#fff',marginBottom:6}}>Welcome back, Omar 👋</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.5)'}}>You have <strong style={{color:'#fff'}}>3 new leads</strong> today. One hasn't been contacted yet — <strong style={{color:'var(--red)'}}>42 min remaining!</strong></div>
            </div>
            <div style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:12,padding:'14px 20px',textAlign:'center',minWidth:140}}>
              <div style={{fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>Commission Earned</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:26,fontWeight:900,color:'var(--gold)'}}>AED 2,400</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',marginTop:2}}>12 conversions</div>
            </div>
          </div>
          {/* 1-hour alert */}
          <div style={{marginTop:16,background:'rgba(192,0,26,.2)',border:'1px solid rgba(192,0,26,.4)',borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:16}}>⏰</span>
            <div style={{fontSize:12,color:'rgba(255,200,200,.9)',flex:1}}><strong>Urgent:</strong> Khalid Al Mansoori (Instagram lead) — contact within 42 minutes or lead will be reassigned!</div>
            <button className="btn btn-danger btn-sm">Contact Now →</button>
          </div>
        </div>
      </div>

      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'12',l:'Conversions',t:'Target: 20',tc:'t-neu',bg:'var(--blue-lt)'},{v:'28',l:'Active Leads',t:'8 contacted today',tc:'t-up',bg:'var(--green-lt)'},{v:'60%',l:'Progress to Target',t:'8 more needed',tc:'t-warn',bg:'var(--orange-lt)'},{v:'AED 2,400',l:'Commission Earned',t:'AED 200 per client',tc:'t-up',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🎯📥📈💰'[i]}</div><div className="sc-val" style={{fontSize:i===3?18:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div><div className={`sc-trend ${s.tc}`}>{s.t}</div></div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:16}}>
        {/* Today's leads */}
        <div className="card">
          <div className="card-head"><div className="card-title">📥 Today's Leads</div></div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Name</th><th>Source</th><th>Status</th><th>Timer</th><th>Action</th></tr></thead>
              <tbody>
                {[
                  {name:'Khalid Al Mansoori',src:'📸 Instagram',status:'new',timer:'42 min',urgent:true},
                  {name:'Fatima Zahra',src:'💬 WhatsApp',status:'contacted',timer:null,urgent:false},
                  {name:'Mohammed Al Salem',src:'📋 Lead Form',status:'qualified',timer:null,urgent:false},
                ].map((l,i)=>(
                  <tr key={i} style={{background:l.urgent?'var(--red-xlt)':''}}>
                    <td style={{fontWeight:600}}>{l.name}</td>
                    <td style={{fontSize:12}}>{l.src}</td>
                    <td><span className={`badge ${l.status==='new'?'badge-blue':l.status==='contacted'?'badge-orange':'badge-green'}`}>{l.status}</span></td>
                    <td style={{color:'var(--red)',fontWeight:l.urgent?700:400,fontSize:13}}>{l.timer||'—'}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={()=>window.open(`https://wa.me/971500000000`)}>💬 Contact</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Target progress */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card card-pad">
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>🎯 June Target Progress</div>
            <div style={{textAlign:'center',marginBottom:12}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:48,fontWeight:900,color:'var(--red)',lineHeight:1}}>12</div>
              <div style={{fontSize:13,color:'var(--muted)'}}>of 20 conversions</div>
            </div>
            <div className="pb-track" style={{height:10,marginBottom:8}}>
              <div className="pb-fill" style={{width:'60%',background:'linear-gradient(90deg,var(--red),var(--gold))'}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted)',marginBottom:14}}>
              <span>0</span><span style={{fontWeight:700,color:'var(--orange)'}}>60%</span><span>20</span>
            </div>
            {[{target:15,bonus:'AED 500',reached:false},{target:20,bonus:'AED 1,500',reached:false},{target:25,bonus:'AED 3,000',reached:false}].map((b,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:i<2?'1px solid var(--grey2)':'none',fontSize:12}}>
                <span style={{color:'var(--muted)'}}>{b.target} conversions</span>
                <span style={{fontWeight:700,color:'var(--gold)'}}>{b.bonus} bonus</span>
                <span className={`badge ${b.reached?'badge-green':'badge-grey'}`}>{b.reached?'✓ Reached':'Locked'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PIPELINE ──────────────────────────────────────────
export function SalesPipeline(){
  const stages=[
    {id:'new',label:'🆕 New',color:'var(--blue)',leads:[{name:'Khalid Al Mansoori',company:'KM Real Estate',value:'AED 750',src:'Instagram',time:'8 min'},{name:'Aisha Mohammed',company:'Freelance Designer',value:'AED 750',src:'WhatsApp',time:'2h'}]},
    {id:'contacted',label:'📞 Contacted',color:'var(--orange)',leads:[{name:'Sara Al Farsi',company:"Sara's Kitchen",value:'AED 1,500',src:'Facebook',time:'1h'},{name:'Reem Hassan',company:'RH Consulting',value:'AED 1,500',src:'Lead Form',time:'3h'}]},
    {id:'qualified',label:'✅ Qualified',color:'var(--gold)',leads:[{name:'James Murphy',company:'Murphy Tech UK',value:'AED 1,500',src:'Google Sheet',time:'Yesterday'}]},
    {id:'proposal',label:'📋 Proposal',color:'var(--purple)',leads:[{name:'Mohammed Salem',company:'Gulf Trade FZE',value:'AED 2,250',src:'WhatsApp',time:'2 days'}]},
    {id:'negotiation',label:'🤝 Negotiation',color:'var(--teal)',leads:[{name:'Priya Sharma',company:'PS Wellness',value:'AED 1,500',src:'Instagram',time:'3 days'}]},
    {id:'won',label:'🏆 Won',color:'var(--green)',leads:[{name:'Fatima Al Amiri',company:'Amiri Clinic',value:'AED 2,250',src:'Referral',time:'Jun 10'}]},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">📊 My Pipeline</div><div className="ph-sub">Drag leads through your sales funnel</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:12,overflowX:'auto'}}>
        {stages.map(stage=>(
          <div key={stage.id} style={{minWidth:160}}>
            <div style={{padding:'8px 12px',borderRadius:'8px 8px 0 0',background:stage.color,color:'#fff',fontSize:12,fontWeight:700,marginBottom:8}}>
              {stage.label} <span style={{opacity:.7,marginLeft:4}}>({stage.leads.length})</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {stage.leads.map((lead,i)=>(
                <div key={i} style={{background:'var(--white)',border:'1px solid var(--grey2)',borderLeft:`3px solid ${stage.color}`,borderRadius:8,padding:'10px 12px',boxShadow:'var(--shadow)',cursor:'pointer',transition:'.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-lg)'}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow)'}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:3}}>{lead.name}</div>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:5}}>{lead.company}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:11,fontWeight:700,color:'var(--green)'}}>{lead.value}</span>
                    <span style={{fontSize:10,color:'var(--muted)'}}>{lead.time}</span>
                  </div>
                  <div style={{marginTop:6,fontSize:10,color:'var(--muted)'}}>{lead.src}</div>
                  <button className="btn btn-primary btn-sm" style={{width:'100%',justifyContent:'center',marginTop:8,fontSize:11}} onClick={()=>window.open('https://wa.me/971500000000')}>💬 Contact</button>
                </div>
              ))}
              <div style={{border:'2px dashed var(--grey2)',borderRadius:8,padding:'10px',textAlign:'center',fontSize:11,color:'var(--muted)',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--red)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--grey2)'}>
                + Add Lead
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── SCRIPTS ──────────────────────────────────────────
export function SalesScripts(){
  const[active,setActive]=useState(0)
  const scripts=[
    {title:'🆕 First Contact — Cold Lead',body:`Hi [Name]! 👋\n\nI'm Omar from Balans Accounting & Bookkeeping. I came across your business and wanted to reach out.\n\nWe help UAE and UK businesses manage their accounts, VAT filings and bookkeeping — fully online, no office visits needed.\n\nWe're currently offering a *3-day free trial* — no credit card required.\n\nWould you be open to a quick 10-minute call to see if we can help? 🙏`},
    {title:'🔥 Follow-Up — No Response',body:`Hi [Name]! 😊\n\nJust following up on my earlier message about Balans Accounting.\n\nI know you're busy, so I'll keep it brief — we handle:\n✅ VAT filing\n✅ Monthly bookkeeping\n✅ Financial reports\n✅ Corporate tax\n\nAll online, from *AED 750/month.*\n\nFree 3-day trial available — no commitment. Would this help your business?`},
    {title:'💰 Pricing Question Response',body:`Great question! Our plans start from *AED 750/month* for the Starter Plan.\n\n📦 *Starter* — AED 750/month (600 credits)\n📦 *Growth* — AED 1,500/month (1,200 credits)\n📦 *Pro* — AED 2,250/month (1,800 credits)\n\nAll plans include a dedicated ACCA-qualified accountant and access to your own client portal.\n\nWant to start with the free 3-day trial? 🎁`},
    {title:'🤔 Objection — Too Expensive',body:`I completely understand! Let me put it in perspective:\n\nA traditional accountant in Dubai charges *AED 2,000–5,000/month* for less service.\n\nWith Balans you get:\n✅ ACCA-qualified accountant\n✅ VAT filing handled for you\n✅ Monthly reports\n✅ Direct WhatsApp support\n\nAll for *AED 750/month* — less than a cup of coffee a day! ☕\n\nAnd there's a free 3-day trial. Nothing to lose!`},
    {title:'✅ Ready to Convert — Closing',body:`Amazing! I'm so glad you're ready to get started! 🎉\n\nHere's what happens next:\n1️⃣ I'll set up your account today\n2️⃣ Your accountant will contact you within 24 hours\n3️⃣ We start your 3-day free trial immediately\n\nAll I need is your:\n• Full name\n• Company name\n• Email address\n• Best WhatsApp number\n\nReady? 🚀`},
    {title:'❓ What Do You Do? — Intro',body:`Hi! We're *Balans Accounting & Bookkeeping* — a virtual accounting firm serving UAE and UK businesses.\n\nWe handle everything finance-related for your business, 100% online:\n\n🇦🇪 *UAE:* VAT, corporate tax, bookkeeping, payroll\n🇬🇧 *UK:* Self assessment, company accounts, VAT, payroll\n\nYou get your own dedicated ACCA accountant and a client portal to see everything.\n\nPlans from AED 750/month. Free 3-day trial! 😊`},
    {title:'🔄 Upgrade Pitch — Existing Client',body:`Hi [Name]! Hope everything is going well with your account 😊\n\nI wanted to let you know that our *Pro Plan* at AED 2,250/month includes:\n\n✨ 1,800 credits (vs 600 on Starter)\n✅ Corporate tax return\n✅ Payroll processing\n✅ CFO advisory calls\n✅ Same-day response\n\nGiven your business is growing, this might be worth considering!\n\nWant me to upgrade your account today? 🚀`},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">💬 WhatsApp Scripts</div><div className="ph-sub">Proven scripts for every sales situation</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:16}}>
        <div className="card" style={{padding:'8px'}}>
          {scripts.map((s,i)=>(
            <button key={i} className={`ni${active===i?' active':''}`} onClick={()=>setActive(i)} style={{marginBottom:2}}>{s.title}</button>
          ))}
        </div>
        <div className="card card-pad">
          <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>{scripts[active].title}</div>
          <textarea value={scripts[active].body} readOnly style={{width:'100%',minHeight:280,padding:'14px',border:'1.5px solid var(--grey2)',borderRadius:10,fontSize:13,lineHeight:1.7,resize:'vertical',fontFamily:'DM Sans,sans-serif',background:'var(--soft)',color:'var(--text)'}}/>
          <div style={{display:'flex',gap:10,marginTop:12}}>
            <button className="btn btn-primary" onClick={()=>{navigator.clipboard.writeText(scripts[active].body);alert('Copied!')}}>📋 Copy Script</button>
            <button className="btn btn-ghost" onClick={()=>window.open(`https://wa.me/971500000000?text=${encodeURIComponent(scripts[active].body)}`)}>💬 Open in WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── COMMISSION ──────────────────────────────────────────
export function SalesCommission(){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">💰 My Commission</div><div className="ph-sub">June 2025 earnings tracker</div></div></div>
      <div className="gold-hero" style={{marginBottom:16}}>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:1,textTransform:'uppercase',marginBottom:6}}>Total Earned — June 2025</div>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:48,fontWeight:900,color:'var(--gold)',lineHeight:1,marginBottom:8}}>AED 2,400</div>
          <div style={{fontSize:13,color:'rgba(255,255,255,.5)',marginBottom:16}}>12 conversions × AED 200 base</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            {[{v:'AED 2,400',l:'Base Commission'},{v:'AED 0',l:'Bonus (need 3 more)'},{v:'AED 0',l:'After-Hours Bonus'}].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.06)',borderRadius:10,padding:'12px',textAlign:'center'}}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:900,color:'var(--gold)'}}>{s.v}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,.35)',marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'12',l:'This Month',bg:'var(--blue-lt)'},{v:'AED 200',l:'Per Conversion',bg:'var(--green-lt)'},{v:'Need 3',l:'For AED 500 Bonus',bg:'var(--orange-lt)'},{v:'Jun 5',l:'Last Payout',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🎯💸🏆📅'[i]}</div><div className="sc-val" style={{fontSize:i===1||i===3?18:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><div className="card-title">Commission History</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Plan</th><th>Date</th><th>Base</th><th>Bonus</th><th>After-Hours</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {[
                {client:'Mohammed Hassan',plan:'Pro',date:'Jun 15',base:200,bonus:0,ah:0,status:'pending'},
                {client:'Sara Mohammed',plan:'Growth',date:'Jun 12',base:200,bonus:0,ah:0,status:'pending'},
                {client:'Fatima Al Amiri',plan:'Pro',date:'Jun 10',base:200,bonus:0,ah:200,status:'paid'},
                {client:'Reem Saleh',plan:'Starter',date:'Jun 8',base:200,bonus:0,ah:0,status:'paid'},
              ].map((c,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{c.client}</td>
                  <td><span className={`badge ${c.plan==='Pro'?'badge-gold':c.plan==='Growth'?'badge-green':'badge-blue'}`}>{c.plan}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{c.date}</td>
                  <td style={{color:'var(--green)',fontWeight:600}}>AED {c.base}</td>
                  <td style={{color:'var(--gold)',fontWeight:600}}>{c.bonus?`AED ${c.bonus}`:'—'}</td>
                  <td style={{color:'var(--purple)',fontWeight:600}}>{c.ah?`AED ${c.ah}`:'—'}</td>
                  <td style={{fontWeight:700}}>AED {c.base+c.bonus+c.ah}</td>
                  <td><span className={`badge ${c.status==='paid'?'badge-green':'badge-orange'}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
