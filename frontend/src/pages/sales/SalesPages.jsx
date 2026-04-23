import React,{useState}from'react'
import{useAuth}from'../../context/AuthContext'
import toast from'react-hot-toast'

// ── MY LEADS ──────────────────────────────────────────────
export function SalesMyLeads(){
  const[tab,setTab]=useState('all')
  const[search,setSearch]=useState('')
  const[modal,setModal]=useState(null)

  const leads=[
    {id:1,name:'Khalid Al Mansoori',phone:'+971501234567',whatsapp:'+971501234567',company:'KM Real Estate',source:'instagram',status:'new',country:'🇦🇪',time:'8 min ago',timer:52,notes:'Interested in Growth plan'},
    {id:2,name:'Fatima Zahra',phone:'+971559876543',whatsapp:'+971559876543',company:'FZ Beauty',source:'whatsapp',status:'contacted',country:'🇦🇪',time:'1h ago',timer:null,notes:'Asked about pricing'},
    {id:3,name:'Mohammed Al Salem',phone:'+971521234567',whatsapp:'+971521234567',company:'MS Trading',source:'lead_form',status:'qualified',country:'🇦🇪',time:'2h ago',timer:null,notes:'Ready for proposal'},
    {id:4,name:'James Murphy',phone:'+447911123456',whatsapp:'+447911123456',company:'Murphy Tech UK',source:'google_sheet',status:'proposal',country:'🇬🇧',time:'Yesterday',timer:null,notes:'Sent Growth plan proposal'},
    {id:5,name:'Priya Sharma',phone:'+971561234567',whatsapp:'+971561234567',company:'PS Wellness',source:'facebook',status:'negotiation',country:'🇦🇪',time:'2 days ago',timer:null,notes:'Wants custom pricing'},
    {id:6,name:'Sara Al Farsi',phone:'+971509998877',whatsapp:'+971509998877',company:'SA Consulting',source:'instagram',status:'won',country:'🇦🇪',time:'Jun 12',timer:null,notes:'Signed up for Starter'},
    {id:7,name:'Reem Hassan',phone:'+971507654321',whatsapp:'+971507654321',company:'RH Boutique',source:'whatsapp',status:'lost',country:'🇦🇪',time:'Jun 10',timer:null,notes:'Said too expensive'},
  ]

  const srcLabels={instagram:'📸 Insta',facebook:'👥 Facebook',whatsapp:'💬 WhatsApp',lead_form:'📋 Form',google_sheet:'📊 Sheet',other:'Other'}
  const stColors={new:'badge-blue',contacted:'badge-orange',qualified:'badge-gold',proposal:'badge-purple',negotiation:'badge-orange',won:'badge-green',lost:'badge-grey'}

  const filtered=leads
    .filter(l=>tab==='all'||l.status===tab)
    .filter(l=>l.name.toLowerCase().includes(search.toLowerCase())||l.company.toLowerCase().includes(search.toLowerCase()))

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📥 My Leads</div><div className="ph-sub">{leads.length} leads assigned to you</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal('add')}>+ Add Lead</button>
      </div>

      {/* 1-hour alert */}
      {leads.filter(l=>l.timer&&l.timer<60).length>0&&(
        <div style={{background:'var(--red-lt)',border:'1px solid #FCA5A5',borderRadius:10,padding:'12px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:18}}>⏰</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:'var(--red)'}}>Khalid Al Mansoori — Contact within 52 minutes!</div><div style={{fontSize:12,color:'var(--red)',opacity:.8}}>Instagram lead · Arrived 8 minutes ago · Missed = lead reassigned + fine</div></div>
          <button className="btn btn-danger btn-sm" onClick={()=>window.open('https://wa.me/971501234567','_blank')}>💬 Contact Now →</button>
        </div>
      )}

      <div className="sg sg-4" style={{marginBottom:16}}>
        {[
          {v:leads.filter(l=>l.status==='new').length,l:'New Leads',bg:'var(--blue-lt)'},
          {v:leads.filter(l=>['contacted','qualified','proposal','negotiation'].includes(l.status)).length,l:'Active',bg:'var(--orange-lt)'},
          {v:leads.filter(l=>l.status==='won').length,l:'Won',bg:'var(--green-lt)'},
          {v:leads.filter(l=>l.status==='lost').length,l:'Lost',bg:'var(--soft)'},
        ].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🆕🔵✅❌'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        {[['all','All'],['new','🆕 New'],['contacted','📞 Contacted'],['qualified','✅ Qualified'],['proposal','📋 Proposal'],['won','🏆 Won'],['lost','❌ Lost']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="toolbar">
        <div className="fil">📅 Date ▾</div>
        <div className="fil">📸 Source ▾</div>
        <div style={{flex:1}}/>
        <div className="srch">🔍 <input placeholder="Search leads..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map(l=>(
          <div key={l.id} className="card" style={{padding:0,border:l.timer?'2px solid var(--red)':'1px solid var(--grey2)',overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 18px'}}>
              <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:18,flexShrink:0}}>{l.name[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                  <div style={{fontWeight:700,fontSize:14}}>{l.name} {l.country}</div>
                  <span className={`badge ${stColors[l.status]}`}>{l.status}</span>
                  <span className="badge badge-grey">{srcLabels[l.source]}</span>
                  {l.timer&&<span style={{fontSize:12,fontWeight:700,color:'var(--red)'}}>⏱ {l.timer} min left</span>}
                </div>
                <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{l.company} · {l.phone} · {l.time}</div>
                {l.notes&&<div style={{fontSize:12,color:'var(--text)',marginTop:3,fontStyle:'italic'}}>"{l.notes}"</div>}
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <button className="btn btn-primary btn-sm" onClick={()=>window.open(`https://wa.me/${l.whatsapp.replace(/\D/g,'')}`)}>💬 WhatsApp</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>setModal({...l,type:'update'})}>✏ Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      {modal==='add'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>+ Add New Lead</h3>
          <div className="fg-row">
            <div className="fg"><label>Full Name *</label><input placeholder="John Smith"/></div>
            <div className="fg"><label>Company</label><input placeholder="Company name"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>WhatsApp *</label><input placeholder="+971 5X XXX XXXX"/></div>
            <div className="fg"><label>Email</label><input type="email" placeholder="email@company.ae"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Source *</label><select><option>💬 WhatsApp</option><option>📸 Instagram</option><option>👥 Facebook</option><option>📋 Lead Form</option><option>Referral</option></select></div>
            <div className="fg"><label>Country</label><select><option>🇦🇪 UAE</option><option>🇬🇧 UK</option></select></div>
          </div>
          <div className="fg"><label>Notes</label><textarea placeholder="Any relevant notes about this lead..." style={{minHeight:60,resize:'vertical'}}/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);toast.success('Lead added!')}}>Add Lead</button>
          </div>
        </div></div>
      )}

      {/* Update Status Modal */}
      {modal?.type==='update'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>✏ Update Lead — {modal.name}</h3>
          <div className="fg"><label>New Status *</label>
            <select defaultValue={modal.status}>
              {['new','contacted','qualified','proposal','negotiation','won','lost'].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="fg"><label>Notes</label><textarea defaultValue={modal.notes} style={{minHeight:80,resize:'vertical'}}/></div>
          <div className="fg"><label>Next Follow-up Date</label><input type="date"/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);toast.success('Lead updated!')}}>Save Update</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── FOLLOW-UPS ──────────────────────────────────────────────
export function SalesFollowUps(){
  const followups=[
    {name:'James Murphy',company:'Murphy Tech UK',due:'Today 2:00 PM',type:'Call',notes:'Discussed Growth plan. Follow up on proposal sent Jun 12.',status:'due',priority:'high'},
    {name:'Priya Sharma',company:'PS Wellness',due:'Today 4:00 PM',type:'WhatsApp',notes:'Wants to negotiate pricing. Send custom offer.',status:'due',priority:'high'},
    {name:'Fatima Zahra',company:'FZ Beauty',due:'Tomorrow 10:00 AM',type:'WhatsApp',notes:'First follow-up after initial contact.',status:'upcoming',priority:'medium'},
    {name:'Ali Hassan',company:'AH Contracting',due:'Jun 22 11:00 AM',type:'Call',notes:'Requested callback after reviewing the portal.',status:'upcoming',priority:'medium'},
    {name:'Nadia Al Farsi',company:'NF Retail',due:'Jun 24 3:00 PM',type:'Email',notes:'Send pricing comparison vs traditional accountant.',status:'upcoming',priority:'low'},
  ]
  const priorityColor={high:'var(--red)',medium:'var(--orange)',low:'var(--muted)'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">📞 Follow-Ups</div><div className="ph-sub">Leads requiring follow-up action</div></div></div>

      <div className="sg sg-3" style={{marginBottom:16}}>
        {[{v:'2',l:'Due Today',bg:'var(--red-lt)',tc:'t-down'},{v:'3',l:'This Week',bg:'var(--orange-lt)',tc:'t-warn'},{v:'8',l:'Total Scheduled',bg:'var(--blue-lt)',tc:'t-neu'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🔴📅📋'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        <div className="tab active">Today (2)</div>
        <div className="tab">This Week (5)</div>
        <div className="tab">All (8)</div>
        <div className="tab">✅ Completed</div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {followups.map((f,i)=>(
          <div key={i} className="card" style={{padding:18,borderLeft:`4px solid ${priorityColor[f.priority]}`}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                  <div style={{fontWeight:700,fontSize:14}}>{f.name}</div>
                  <span className="badge badge-grey">{f.company}</span>
                  <span className={`badge ${f.status==='due'?'badge-red':'badge-blue'}`}>{f.type}</span>
                </div>
                <div style={{fontSize:12,color:f.status==='due'?'var(--red)':'var(--muted)',fontWeight:f.status==='due'?700:400,marginBottom:6}}>
                  📅 {f.due}
                </div>
                <div style={{fontSize:12,color:'var(--text)',background:'var(--soft)',padding:'8px 12px',borderRadius:8}}>
                  💬 {f.notes}
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <button className="btn btn-primary btn-sm" onClick={()=>window.open('https://wa.me/971500000000')}>
                  {f.type==='WhatsApp'?'💬 Send WhatsApp':f.type==='Call'?'📞 Call Now':'📧 Send Email'}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Marked as done!')}>✓ Done</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── OBJECTION HANDLER ──────────────────────────────────────────────
export function SalesObjections(){
  const[active,setActive]=useState(0)
  const objections=[
    {
      title:'💰 "It\'s too expensive"',
      response:`That's completely understandable — let me put it in perspective.

A traditional accountant in Dubai charges AED 2,000–5,000/month, often requires office visits, has long response times, and still charges extra for VAT filings.

With Balans at AED 750/month you get:
✅ Dedicated ACCA-qualified accountant
✅ VAT filing handled every quarter
✅ Monthly P&L reports
✅ Direct WhatsApp access — same day responses
✅ Your own client portal

That's less than AED 25/day — less than a business lunch.

Would it help to start with our free 3-day trial so you can see the value yourself? No credit card needed.`,
    },
    {
      title:'⏳ "I need to think about it"',
      response:`Absolutely, take your time! Just so you have the full picture:

We offer a 3-day free trial — no credit card, no commitment. You can cancel anytime.

Many clients said the same thing, then tried the free trial and were surprised how quickly their accountant organised everything.

What specific part would you like more clarity on? I'm happy to answer any questions — it's what I'm here for.`,
    },
    {
      title:'🤷 "I already have an accountant"',
      response:`That's great to hear — it means you already understand the value of good accounting!

Many of our clients actually switched to us from traditional accountants because:

1. We're significantly more affordable (AED 750 vs AED 2,000+/month)
2. Everything is online — no office visits, no waiting
3. You get a dedicated ACCA accountant who knows your business
4. We handle UAE and UK compliance in one place

Would you be open to a quick 10-minute comparison so you can decide what works best for your business?`,
    },
    {
      title:'❓ "How do I know you\'re trustworthy?"',
      response:`That's a very fair question and I appreciate you asking it.

Here's what makes Balans trustworthy:
✅ All our accountants are ACCA-qualified (internationally certified)
✅ We're based in Dubai with a physical trade licence
✅ Bank-level data encryption for all your financial information
✅ Daily data backups — your data is never at risk
✅ 100% transparency — you see everything in your client portal in real time
✅ You can cancel anytime — no lock-in contracts

We also offer a 3-day free trial so you can experience the service before paying anything.

Would you like me to share some client testimonials as well?`,
    },
    {
      title:'🔒 "Is my financial data safe?"',
      response:`100% yes — security is our top priority.

Your data is protected by:
🔐 AES-256 bank-level encryption (same as your bank uses)
🔐 Secure cloud storage with daily automated backups
🔐 Only your dedicated accountant can access your files
🔐 Two-factor authentication on your client portal
🔐 GDPR compliant for UK clients

Your financial data is never shared, never sold, and never accessed by anyone outside your account team.

Any other questions I can help with?`,
    },
    {
      title:'🤔 "I\'ll manage it myself"',
      response:`I completely respect that! Self-managing finances shows you care about your business.

However, I always ask business owners one question: How many hours per month do you spend on bookkeeping, VAT, and financial reports?

Most say 10–20 hours. At AED 750/month, that's less than AED 37.50 per hour — and you get that time back to focus on growing your business.

Plus, a professional accountant spots tax savings and compliance issues that self-management often misses. The service pays for itself.

Would you like to try it free for 3 days and see the difference?`,
    },
  ]

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🛡 Objection Handler</div><div className="ph-sub">How to handle every common objection with confidence</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:16}}>
        <div className="card" style={{padding:8}}>
          <div style={{fontSize:10,fontWeight:700,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',padding:'10px 12px 6px'}}>Common Objections</div>
          {objections.map((o,i)=>(
            <button key={i} className={`ni${active===i?' active':''}`} style={{marginBottom:2}} onClick={()=>setActive(i)}>{o.title}</button>
          ))}
        </div>
        <div className="card" style={{padding:24}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:16,paddingBottom:12,borderBottom:'1px solid var(--grey2)'}}>{objections[active].title}</div>
          <div style={{fontSize:13,lineHeight:1.9,color:'var(--text)',whiteSpace:'pre-line',marginBottom:20}}>{objections[active].response}</div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-primary btn-sm" onClick={()=>{navigator.clipboard.writeText(objections[active].response);toast.success('Copied to clipboard!')}}>📋 Copy Response</button>
            <button className="btn btn-ghost btn-sm" onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(objections[active].response)}`)}>💬 Use in WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── TARGETS & KPIs ──────────────────────────────────────────────
export function SalesTargets(){
  const data={
    name:'Omar Hassan',
    month:'June 2025',
    conv:12,target:20,
    leads:28,contacted:22,qualified:8,
    avgResponse:'18 min',
    afterHoursConv:2,
    daysLeft:16,
  }
  const convRate=Math.round((data.conv/data.leads)*100)
  const progress=Math.round((data.conv/data.target)*100)

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🎯 Targets & KPIs</div><div className="ph-sub">Your monthly performance — {data.month}</div></div></div>

      <div className="dark-hero" style={{marginBottom:16}}>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:16,alignItems:'center'}}>
            <div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',marginBottom:8}}>Monthly Target Progress</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:56,fontWeight:900,color:'#fff',lineHeight:1}}>{data.conv}<span style={{fontSize:24,color:'rgba(255,255,255,.4)'}}>/{data.target}</span></div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.5)',marginTop:4}}>conversions · {data.daysLeft} days remaining</div>
              <div style={{marginTop:14,height:10,background:'rgba(255,255,255,.1)',borderRadius:5,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,var(--red),var(--gold))',borderRadius:5,transition:'width .5s'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(255,255,255,.3)',marginTop:5}}><span>0</span><span style={{color:'var(--gold)',fontWeight:700}}>{progress}%</span><span>{data.target}</span></div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[{v:`AED ${data.conv*200}`,l:'Base Commission'},{v:data.conv>=15?'AED 500':'Need '+(15-data.conv)+' more',l:'Tier 1 Bonus'},{v:data.conv>=20?'AED 1,500':'Locked',l:'Tier 2 Bonus'}].map((s,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:10,padding:'10px 16px',textAlign:'center',minWidth:140}}>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:18,fontWeight:900,color:i===0?'var(--gold)':data.conv>=(i===1?15:20)?'var(--green)':'rgba(255,255,255,.3)'}}>{s.v}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.35)',marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sg sg-4" style={{marginBottom:16}}>
        {[
          {v:`${data.leads}`,l:'Total Leads',sub:'This month',bg:'var(--blue-lt)'},
          {v:`${data.contacted}`,l:'Contacted',sub:`${Math.round(data.contacted/data.leads*100)}% contact rate`,bg:'var(--orange-lt)'},
          {v:`${convRate}%`,l:'Conversion Rate',sub:'12 of 28 leads',bg:'var(--green-lt)'},
          {v:data.avgResponse,l:'Avg Response Time',sub:'1-hour rule: 2 breaches',bg:'var(--gold-lt)'},
        ].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'📥📞🎯⏱'[i]}</div><div className="sc-val" style={{fontSize:22}}>{s.v}</div><div className="sc-lbl">{s.l}</div><div className="sc-trend t-neu">{s.sub}</div></div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {/* Bonus tiers */}
        <div className="card" style={{padding:20}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>🏆 Bonus Tiers</div>
          {[{target:15,bonus:'AED 500',reached:data.conv>=15},{target:20,bonus:'AED 1,500',reached:data.conv>=20},{target:25,bonus:'AED 3,000',reached:data.conv>=25}].map((b,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:i<2?'1px solid var(--grey2)':'none'}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:b.reached?'var(--green-lt)':'var(--soft)',display:'grid',placeItems:'center',fontSize:18}}>{b.reached?'✅':'🔒'}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600}}>{b.target} conversions</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Earn {b.bonus} bonus</div>
              </div>
              {!b.reached&&<span style={{fontSize:12,fontWeight:700,color:'var(--orange)'}}>Need {b.target-data.conv} more</span>}
              {b.reached&&<span className="badge badge-green">Reached!</span>}
            </div>
          ))}
        </div>

        {/* After hours */}
        <div className="card" style={{padding:20}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>🌙 After-Hours Performance</div>
          <div style={{background:'var(--purple-lt)',borderRadius:10,padding:16,marginBottom:14,textAlign:'center'}}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:32,fontWeight:900,color:'var(--purple)'}}>{data.afterHoursConv}</div>
            <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>After-hours conversions</div>
            <div style={{fontSize:11,color:'var(--purple)',marginTop:4,fontWeight:600}}>+50% bonus multiplier applied</div>
          </div>
          <div style={{fontSize:12,lineHeight:1.8,color:'var(--muted)'}}>
            Sales closed outside 10AM–7PM UAE time earn a <strong style={{color:'var(--purple)'}}>1.5× commission multiplier</strong> automatically.
          </div>
          <div style={{marginTop:12,padding:'10px 12px',background:'var(--gold-lt)',borderRadius:8,fontSize:12,fontWeight:600,color:'var(--gold)'}}>
            💰 After-hours bonus this month: AED {data.afterHoursConv*200*0.5}
          </div>
        </div>

        {/* Weekly breakdown */}
        <div className="card" style={{padding:20,gridColumn:'1/-1'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>📅 Weekly Breakdown</div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Week</th><th>Leads</th><th>Contacted</th><th>Converted</th><th>Rate</th><th>After Hours</th></tr></thead>
              <tbody>
                {[{w:'Week 1 (Jun 1–7)',leads:8,contacted:7,conv:4,ah:1},{w:'Week 2 (Jun 8–14)',leads:10,contacted:8,conv:5,ah:1},{w:'Week 3 (Jun 15–21)',leads:7,contacted:5,conv:3,ah:0},{w:'Week 4 (Jun 22–30)',leads:3,contacted:2,conv:0,ah:0}].map((w,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:500}}>{w.w}</td>
                    <td>{w.leads}</td>
                    <td>{w.contacted}</td>
                    <td style={{fontWeight:700,color:'var(--green)'}}>{w.conv}</td>
                    <td style={{fontWeight:600,color:Math.round(w.conv/w.leads*100)>40?'var(--green)':'var(--orange)'}}>{Math.round(w.conv/w.leads*100)}%</td>
                    <td style={{color:'var(--purple)',fontWeight:600}}>{w.ah||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── NOTIFICATIONS ──────────────────────────────────────────────
export function SalesNotifications(){
  const[notifs,setNotifs]=useState([
    {id:1,icon:'🆕',bg:'var(--blue-lt)',title:'New lead assigned — Khalid Al Mansoori',msg:'Instagram lead · Contact within 1 hour!',time:'8 min ago',unread:true},
    {id:2,icon:'💰',bg:'var(--green-lt)',title:'Commission approved — AED 200',msg:'Mohammed Hassan conversion approved by Musa.',time:'2h ago',unread:true},
    {id:3,icon:'⚠️',bg:'var(--orange-lt)',title:'Follow-up due — James Murphy',msg:'Proposal follow-up was due at 2:00 PM today.',time:'1h ago',unread:true},
    {id:4,icon:'🏆',bg:'var(--gold-lt)',title:'You reached 60% of monthly target!',msg:'12 conversions so far — 8 more for Tier 1 bonus!',time:'Yesterday',unread:false},
    {id:5,icon:'📢',bg:'var(--purple-lt)',title:'Announcement from Musa',msg:'June targets update — Sara is leading at 75%.',time:'Yesterday',unread:false},
    {id:6,icon:'🆕',bg:'var(--blue-lt)',title:'New lead assigned — Sara Al Farsi',msg:'Facebook lead · Contacted and qualified.',time:'2 days ago',unread:false},
  ])

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🔔 Notifications</div><div className="ph-sub">{notifs.filter(n=>n.unread).length} unread</div></div>
        <button className="btn btn-ghost btn-sm" onClick={()=>setNotifs(n=>n.map(x=>({...x,unread:false})))}>✓ Mark All Read</button>
      </div>
      <div className="card">
        {notifs.map((n,i)=>(
          <div key={n.id} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,unread:false}:x))} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 18px',borderBottom:i<notifs.length-1?'1px solid var(--grey2)':'none',background:n.unread?'var(--red-xlt)':'var(--white)',cursor:'pointer',transition:'.2s'}}>
            <div style={{width:38,height:38,borderRadius:10,background:n.bg,display:'grid',placeItems:'center',fontSize:16,flexShrink:0}}>{n.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:n.unread?700:500,marginBottom:3}}>{n.title}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>{n.msg}</div>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{n.time}</div>
            </div>
            {n.unread&&<div style={{width:8,height:8,borderRadius:'50%',background:'var(--red)',flexShrink:0,marginTop:6}}/>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── PROFILE ──────────────────────────────────────────────
export function SalesProfile(){
  const{profile,signOut}=useAuth()
  const name=profile?.full_name||'Omar Hassan'
  return(
    <div>
      <div className="ph"><div><div className="ph-title">👤 My Profile</div><div className="ph-sub">Manage your account</div></div></div>
      <div style={{background:'linear-gradient(135deg,#0F0F0F,#1A0005)',borderRadius:16,padding:'24px 28px',marginBottom:20,display:'flex',alignItems:'center',gap:20}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(135deg,var(--gold),#E0A020)',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:26,flexShrink:0}}>{name[0]}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,fontWeight:700,color:'#fff'}}>{name}</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:3}}>Sales Executive · Balans Accounting</div>
          <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
            {['📈 Sales Rep','🇦🇪 UAE Based','🎯 12 Conversions','💰 AED 2,400 Earned'].map((b,i)=>(
              <span key={i} style={{fontSize:11,background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.5)',padding:'3px 10px',borderRadius:50,fontWeight:600}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card" style={{padding:22,gridColumn:'1/-1'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Personal Information</div>
          <div className="fg-row">
            <div className="fg"><label>Full Name</label><input defaultValue={name}/></div>
            <div className="fg"><label>Email</label><input defaultValue={profile?.email||'omar@balans.ae'}/></div>
            <div className="fg"><label>WhatsApp</label><input defaultValue="+971 52 123 4567"/></div>
            <div className="fg"><label>Role</label><input defaultValue="Sales Executive" readOnly style={{background:'var(--soft)'}}/></div>
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
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Working Hours</div>
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:12}}>Your standard hours as set by admin</div>
          {[{d:'Monday–Saturday',h:'10:00 AM – 7:00 PM'},{d:'Sunday',h:'Day Off'},{d:'Timezone',h:'UAE (GST +4)'}].map((r,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<2?'1px solid var(--grey2)':'none',fontSize:13}}>
              <span style={{color:'var(--muted)'}}>{r.d}</span><span style={{fontWeight:600}}>{r.h}</span>
            </div>
          ))}
          <div style={{marginTop:14,padding:'10px 12px',background:'var(--purple-lt)',borderRadius:8,fontSize:12,color:'var(--purple)',fontWeight:500}}>
            🌙 Sales closed outside hours earn a 1.5× after-hours commission bonus
          </div>
        </div>
      </div>
    </div>
  )
}
