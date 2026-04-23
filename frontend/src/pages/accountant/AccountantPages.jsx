import React,{useState}from'react'
import{useAuth}from'../../context/AuthContext'
import toast from'react-hot-toast'

// ── MY TASKS ──────────────────────────────────────────────
export function AccountantTasks(){
  const[tab,setTab]=useState('all')
  const[modal,setModal]=useState(null)

  const tasks=[
    {id:1,title:'VAT Return Q1 — Ahmed Al Rashid',client:'Ahmed Al Rashid',type:'VAT',priority:'critical',due:'Jun 20',status:'overdue',daysOver:5,credits:120},
    {id:2,title:'Bookkeeping May — Nadia Khoury',client:'Nadia Khoury',type:'Bookkeeping',priority:'high',due:'Jun 22',status:'overdue',daysOver:3,credits:80},
    {id:3,title:'Monthly Report — Mohammed Hassan',client:'Mohammed Hassan',type:'Report',priority:'medium',due:'Jun 15',status:'due_today',daysOver:0,credits:60},
    {id:4,title:'Bookkeeping — Sara Mohammed',client:'Sara Mohammed',type:'Bookkeeping',priority:'medium',due:'Jun 15',status:'due_today',daysOver:0,credits:80},
    {id:5,title:'VAT Review — Fatima Al Amiri',client:'Fatima Al Amiri',type:'VAT',priority:'normal',due:'Jun 28',status:'in_progress',daysOver:0,credits:40},
    {id:6,title:'CT Registration — Gulf Import',client:'Mohammed Hassan',type:'Corp Tax',priority:'medium',due:'Jun 30',status:'in_progress',daysOver:0,credits:100},
    {id:7,title:'Payroll — May Processing',client:'Fatima Al Amiri',type:'Payroll',priority:'normal',due:'Jun 28',status:'done',daysOver:0,credits:60},
    {id:8,title:'Bank Reconciliation Q1',client:'Lara Petrov',type:'Bookkeeping',priority:'normal',due:'Jul 5',status:'pending',daysOver:0,credits:80},
    {id:9,title:'Advisory Call — Tax Planning',client:'Mohammed Hassan',type:'Advisory',priority:'low',due:'Jul 10',status:'pending',daysOver:0,credits:100},
  ]

  const stColors={overdue:'badge-red',due_today:'badge-orange',in_progress:'badge-blue',done:'badge-green',pending:'badge-grey'}
  const prColors={critical:'var(--red)',high:'var(--orange)',medium:'var(--gold)',normal:'var(--green)',low:'var(--muted)'}

  const filtered=tasks.filter(t=>{
    if(tab==='overdue')return t.status==='overdue'
    if(tab==='today')return t.status==='due_today'
    if(tab==='progress')return t.status==='in_progress'
    if(tab==='done')return t.status==='done'
    if(tab==='pending')return t.status==='pending'
    return true
  })

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">✅ My Tasks</div><div className="ph-sub">{tasks.length} tasks assigned to you</div></div>
      </div>

      <div className="sg sg-5" style={{marginBottom:16}}>
        {[
          {v:tasks.filter(t=>t.status==='overdue').length,l:'Overdue',bg:'var(--red-lt)'},
          {v:tasks.filter(t=>t.status==='due_today').length,l:'Due Today',bg:'var(--orange-lt)'},
          {v:tasks.filter(t=>t.status==='in_progress').length,l:'In Progress',bg:'var(--blue-lt)'},
          {v:tasks.filter(t=>t.status==='pending').length,l:'Upcoming',bg:'var(--soft)'},
          {v:tasks.filter(t=>t.status==='done').length,l:'Done This Month',bg:'var(--green-lt)'},
        ].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🔴🟡🔵📋✅'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        {[['all','All'],['overdue','🔴 Overdue'],['today','🟡 Today'],['progress','🔵 In Progress'],['pending','📋 Upcoming'],['done','✅ Done']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {filtered.map(t=>(
          <div key={t.id} className="card" style={{padding:0,borderLeft:`4px solid ${prColors[t.priority]}`,overflow:'hidden',background:t.status==='overdue'?'var(--red-xlt)':t.status==='due_today'?'#FFFBF0':'var(--white)'}}>
            <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 18px'}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
                  <div style={{fontWeight:700,fontSize:14}}>{t.title}</div>
                  <span className={`badge ${stColors[t.status]}`}>{t.status.replace('_',' ')}</span>
                  <span className="badge badge-grey">{t.type}</span>
                </div>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>👥 {t.client}</span>
                  <span style={{color:t.status==='overdue'?'var(--red)':'inherit',fontWeight:t.status==='overdue'?700:400}}>
                    📅 Due: {t.due}{t.daysOver>0?` (${t.daysOver} days overdue)`:''}</span>
                  <span>🪙 {t.credits} credits</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                {t.status!=='done'&&(
                  <button className="btn btn-primary btn-sm" onClick={()=>setModal(t)}>
                    {t.status==='pending'?'Start Task':t.status==='in_progress'?'Mark Done':'Mark Done'}
                  </button>
                )}
                {t.status==='done'&&<span className="badge badge-green">✓ Completed</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>✅ Complete Task</h3>
          <p style={{color:'var(--muted)',fontSize:13,marginBottom:16}}>{modal.title} — {modal.client}</p>
          <div className="fg"><label>Completion Notes</label><textarea style={{minHeight:80,resize:'vertical'}} placeholder="Describe what was done..."/></div>
          <div className="fg"><label>Credits Used</label><input type="number" defaultValue={modal.credits}/></div>
          <div className="fg"><label>Upload Output (optional)</label><input type="file"/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);toast.success('Task marked complete! Client notified.')}}>✓ Mark Complete</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── DOCUMENTS ──────────────────────────────────────────────
export function AccountantDocuments(){
  const[tab,setTab]=useState('pending')
  const docs=[
    {name:'Emirates ID — Front & Back',client:'Nadia Khoury',type:'KYC',date:'Jun 13',size:'1.2 MB',status:'pending'},
    {name:'Passport Copy',client:'Rajan Joshi',type:'KYC',date:'Jun 9',size:'2.4 MB',status:'pending'},
    {name:'Invoices Bundle — May 2025',client:'Ahmed Al Rashid',type:'Bookkeeping',date:'Jun 7',size:'5.6 MB',status:'pending'},
    {name:'Bank Statement May 2025',client:'Mohammed Hassan',type:'Bank',date:'Jun 12',size:'892 KB',status:'approved'},
    {name:'VAT Return Q1 2025',client:'Sara Mohammed',type:'VAT',date:'Jun 14',size:'284 KB',status:'approved'},
    {name:'Trade Licence — Renewal',client:'Fatima Al Amiri',type:'KYC',date:'Jun 12',size:'3.1 MB',status:'approved'},
    {name:'P&L Report — May 2025',client:'Lara Petrov',type:'Report',date:'Jun 10',size:'156 KB',status:'approved'},
  ]
  const typeColor={VAT:'badge-blue',Report:'badge-green',Bank:'badge-purple',KYC:'badge-gold',Bookkeeping:'badge-orange'}
  const filtered=tab==='all'?docs:docs.filter(d=>d.status===tab)

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📁 Documents</div><div className="ph-sub">Client documents to review and manage</div></div>
        <label className="btn btn-primary btn-sm" style={{cursor:'pointer'}}>⬆ Upload<input type="file" style={{display:'none'}} onChange={()=>toast.success('Document uploaded!')}/></label>
      </div>
      <div className="tabs">
        {[['pending','⏳ Pending Review (3)'],['approved','✅ Approved'],['all','All Documents']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Document</th><th>Client</th><th>Type</th><th>Uploaded</th><th>Size</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map((d,i)=>(
                <tr key={i} style={{background:d.status==='pending'?'var(--gold-lt)':''}}>
                  <td style={{fontWeight:600}}>{d.name}</td>
                  <td style={{fontSize:12}}>{d.client}</td>
                  <td><span className={`badge ${typeColor[d.type]||'badge-grey'}`}>{d.type}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{d.date}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{d.size}</td>
                  <td><span className={`badge ${d.status==='approved'?'badge-green':'badge-orange'}`}>{d.status==='approved'?'✓ Approved':'⏳ Pending'}</span></td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon">⬇</button>
                      {d.status==='pending'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>toast.success('Document approved!')}>✓ Approve</button>}
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

// ── REPORTS ──────────────────────────────────────────────
export function AccountantReports(){
  const[modal,setModal]=useState(false)
  const reports=[
    {name:'P&L Report — May 2025',client:'Mohammed Hassan',type:'P&L',period:'May 2025',sent:'Jun 5',opened:true,openedDate:'Jun 6'},
    {name:'VAT Return Summary Q1',client:'Sara Mohammed',type:'VAT',period:'Q1 2025',sent:'Jun 4',opened:true,openedDate:'Jun 4'},
    {name:'Monthly Review — May',client:'Fatima Al Amiri',type:'Review',period:'May 2025',sent:'Jun 5',opened:true,openedDate:'Jun 7'},
    {name:'Bookkeeping Summary',client:'Nadia Khoury',type:'Bookkeeping',period:'May 2025',sent:'Jun 6',opened:false},
    {name:'P&L Report — Apr 2025',client:'Mohammed Hassan',type:'P&L',period:'Apr 2025',sent:'May 5',opened:true,openedDate:'May 6'},
  ]
  const typeColor={'P&L':'badge-green',VAT:'badge-blue',Review:'badge-purple',Bookkeeping:'badge-orange'}

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📊 Reports</div><div className="ph-sub">Monthly reports sent to your clients</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Create Report</button>
      </div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'5',l:'Sent This Month',bg:'var(--blue-lt)'},{v:'4',l:'Opened',bg:'var(--green-lt)'},{v:'1',l:'Not Yet Opened',bg:'var(--orange-lt)'},{v:'80%',l:'Open Rate',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'📊✅⚠️📈'[i]}</div><div className="sc-val" style={{fontSize:i===3?22:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Report</th><th>Client</th><th>Type</th><th>Period</th><th>Sent</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {reports.map((r,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{r.name}</td>
                  <td style={{fontSize:12}}>{r.client}</td>
                  <td><span className={`badge ${typeColor[r.type]||'badge-grey'}`}>{r.type}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{r.period}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{r.sent}</td>
                  <td>{r.opened?<span className="badge badge-green">✓ Opened {r.openedDate}</span>:<span className="badge badge-orange">Not opened</span>}</td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon">👁</button>
                      {!r.opened&&<button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>toast.success('Reminder sent to client!')}>🔔 Remind</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(false)}>×</button>
          <h3>📊 Create New Report</h3>
          <div className="fg"><label>Client *</label><select><option>Ahmed Al Rashid</option><option>Sara Mohammed</option><option>Mohammed Hassan</option><option>Fatima Al Amiri</option><option>Nadia Khoury</option></select></div>
          <div className="fg-row">
            <div className="fg"><label>Report Type *</label><select><option>P&L</option><option>VAT Summary</option><option>Monthly Review</option><option>Bookkeeping</option><option>Corp Tax</option></select></div>
            <div className="fg"><label>Period *</label><input placeholder="e.g. May 2025 / Q1 2025"/></div>
          </div>
          <div className="fg"><label>Upload Report File *</label><input type="file" accept=".pdf,.xlsx,.docx"/></div>
          <div className="fg"><label>Notes to Client (optional)</label><textarea style={{minHeight:60,resize:'vertical'}} placeholder="Any notes to include with the report..."/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(false);toast.success('Report sent to client!')}}>Send Report</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── CORPORATE TAX ──────────────────────────────────────────────
export function AccountantCorpTax(){
  const clients=[
    {name:'Mohammed Hassan',company:'Gulf Import FZE',fyEnd:'Dec 31 2024',due:'Sep 30 2025',days:107,taxable:true,reg:true,status:'in_prep'},
    {name:'Fatima Al Amiri',company:'Amiri Clinic',fyEnd:'Dec 31 2024',due:'Sep 30 2025',days:107,taxable:true,reg:true,status:'on_track'},
    {name:'Sara Mohammed',company:"Sara's Kitchen",fyEnd:'Dec 31 2024',due:'Sep 30 2025',days:107,taxable:false,reg:true,status:'relief'},
    {name:'Ahmed Al Rashid',company:'Al Rashid Trading',fyEnd:'Dec 31 2024',due:'Sep 30 2025',days:107,taxable:false,reg:false,status:'reg_needed'},
  ]
  const stColors={in_prep:'badge-orange',on_track:'badge-blue',relief:'badge-green',reg_needed:'badge-red'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🏛 Corporate Tax</div><div className="ph-sub">UAE CT 9% — deadline tracking for your clients</div></div></div>
      <div style={{background:'var(--blue-lt)',border:'1px solid #93C5FD',borderRadius:10,padding:'12px 16px',marginBottom:14,fontSize:12,color:'var(--blue)'}}>
        ℹ️ UAE Corporate Tax: 9% on taxable income above AED 375,000. Annual return due 9 months after fiscal year end. Small Business Relief available for revenue below AED 3M.
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>FY End</th><th>CT Due</th><th>Days Left</th><th>Taxable?</th><th>CT Registration</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {clients.map((c,i)=>(
                <tr key={i} style={{background:c.status==='reg_needed'?'var(--red-xlt)':''}}>
                  <td>
                    <div style={{fontWeight:600}}>{c.name}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{c.company}</div>
                  </td>
                  <td style={{fontSize:12}}>{c.fyEnd}</td>
                  <td style={{fontSize:12,fontWeight:600}}>{c.due}</td>
                  <td><span className={`badge ${c.days<120?'badge-orange':'badge-green'}`}>{c.days} days</span></td>
                  <td><span className={`badge ${c.taxable?'badge-red':'badge-grey'}`}>{c.taxable?'Yes — taxable':'Small Biz Relief'}</span></td>
                  <td><span className={`badge ${c.reg?'badge-green':c.status==='exempt'?'badge-grey':'badge-red'}`}>{c.reg?'✓ Registered':'Not Registered'}</span></td>
                  <td><span className={`badge ${stColors[c.status]}`}>{c.status.replace('_',' ')}</span></td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      {!c.reg&&<button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>toast.success('CT registration started!')}>Register</button>}
                      {c.reg&&<button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>toast.success('Task created!')}>+ Task</button>}
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

// ── BOOKKEEPING ──────────────────────────────────────────────
export function AccountantBookkeeping(){
  const[activeClient,setActiveClient]=useState(0)
  const clients=[
    {name:'Mohammed Hassan',company:'Gulf Import FZE',plan:'Pro',month:'May 2025',status:'in_progress',txCount:142,reconciled:98,pending:44},
    {name:'Sara Mohammed',company:"Sara's Kitchen",plan:'Growth',month:'May 2025',status:'done',txCount:67,reconciled:67,pending:0},
    {name:'Fatima Al Amiri',company:'Amiri Clinic',plan:'Pro',month:'May 2025',status:'pending',txCount:89,reconciled:0,pending:89},
  ]
  const c=clients[activeClient]

  return(
    <div>
      <div className="ph"><div><div className="ph-title">📚 Bookkeeping Workspace</div><div className="ph-sub">Monthly reconciliation for your clients</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'240px 1fr',gap:14}}>
        <div className="card" style={{padding:8}}>
          <div style={{fontSize:10,fontWeight:700,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',padding:'10px 12px 6px'}}>Select Client</div>
          {clients.map((cl,i)=>(
            <button key={i} className={`ni${activeClient===i?' active':''}`} style={{marginBottom:2}} onClick={()=>setActiveClient(i)}>
              <div>
                <div style={{fontSize:12,fontWeight:600}}>{cl.name}</div>
                <div style={{fontSize:10,opacity:.7}}>{cl.month} · <span className={cl.status==='done'?'':cl.status==='in_progress'?'':''} style={{color:cl.status==='done'?'#86EFAC':cl.status==='in_progress'?'#FCD34D':'#F9A8D4'}}>{cl.status}</span></div>
              </div>
            </button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card" style={{padding:20}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
              <div>
                <div style={{fontSize:15,fontWeight:700}}>{c.name} — {c.month}</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>{c.company} · {c.plan} Plan</div>
              </div>
              <span className={`badge ${c.status==='done'?'badge-green':c.status==='in_progress'?'badge-orange':'badge-grey'}`}>{c.status}</span>
            </div>
            <div className="sg sg-3" style={{marginBottom:16}}>
              {[{v:c.txCount,l:'Total Transactions',bg:'var(--blue-lt)'},{v:c.reconciled,l:'Reconciled',bg:'var(--green-lt)'},{v:c.pending,l:'Pending Review',bg:c.pending>0?'var(--orange-lt)':'var(--soft)'}].map((s,i)=>(
                <div key={i} style={{background:s.bg,borderRadius:10,padding:14,textAlign:'center'}}>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:900}}>{s.v}</div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:3}}>{s.l}</div>
                </div>
              ))}
            </div>
            {c.txCount>0&&(
              <div style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
                  <span>Reconciliation Progress</span>
                  <span style={{fontWeight:700}}>{Math.round(c.reconciled/c.txCount*100)}%</span>
                </div>
                <div className="pb-track" style={{height:10}}>
                  <div className="pb-fill" style={{width:`${(c.reconciled/c.txCount)*100}%`,background:'linear-gradient(90deg,var(--green),var(--teal))'}}/>
                </div>
              </div>
            )}
            <div style={{display:'flex',gap:10}}>
              <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Bookkeeping workspace opened!')}>📊 Open Workspace</button>
              {c.status==='in_progress'&&<button className="btn btn-gold btn-sm" onClick={()=>toast.success('Marked as complete!')}>✓ Mark Complete</button>}
            </div>
          </div>
          <div className="card" style={{padding:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📋 Recent Transactions</div>
            {[
              {date:'Jun 14',desc:'Invoice — Client Payment',amount:'+AED 15,000',cat:'Revenue'},
              {date:'Jun 13',desc:'Office Rent — June',amount:'-AED 8,500',cat:'Rent'},
              {date:'Jun 12',desc:'Staff Salary — May',amount:'-AED 22,000',cat:'Payroll'},
              {date:'Jun 10',desc:'Marketing — Meta Ads',amount:'-AED 3,200',cat:'Marketing'},
              {date:'Jun 8',desc:'Invoice — Client Payment',amount:'+AED 9,500',cat:'Revenue'},
            ].map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:i<4?'1px solid var(--grey2)':'none',fontSize:12}}>
                <span style={{color:'var(--muted)',width:40,flexShrink:0}}>{t.date}</span>
                <span style={{flex:1}}>{t.desc}</span>
                <span className="badge badge-grey">{t.cat}</span>
                <span style={{fontWeight:700,color:t.amount.startsWith('+')?'var(--green)':'var(--red)',width:90,textAlign:'right'}}>{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MEETINGS ──────────────────────────────────────────────
export function AccountantMeetings(){
  const meetings=[
    {client:'Mohammed Hassan',company:'Gulf Import FZE',type:'Monthly Review',date:'Jun 17, 2025',time:'10:00 AM',duration:'45 min',via:'Zoom',status:'upcoming'},
    {client:'Sara Mohammed',company:"Sara's Kitchen",type:'VAT Consultation',date:'Jun 19, 2025',time:'2:00 PM',duration:'30 min',via:'Zoom',status:'upcoming'},
    {client:'Ahmed Al Rashid',company:'Al Rashid Trading',type:'Onboarding Call',date:'Jun 22, 2025',time:'11:00 AM',duration:'60 min',via:'Zoom',status:'upcoming'},
    {client:'Fatima Al Amiri',company:'Amiri Clinic',type:'Monthly Review',date:'Jun 5, 2025',time:'10:00 AM',duration:'45 min',via:'Zoom',status:'done'},
    {client:'Nadia Khoury',company:'NK Beauty Lounge',type:'KYC & Onboarding',date:'Jun 3, 2025',time:'3:00 PM',duration:'30 min',via:'WhatsApp Call',status:'done'},
  ]

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📅 Meetings</div><div className="ph-sub">Scheduled client calls and consultations</div></div>
        <a href="https://calendly.com" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">📅 Open Calendly</a>
      </div>
      <div className="sg sg-3" style={{marginBottom:16}}>
        {[{v:'3',l:'Upcoming',bg:'var(--blue-lt)'},{v:'45 min',l:'Avg Duration',bg:'var(--gold-lt)'},{v:'12',l:'Total This Month',bg:'var(--green-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'📅⏱✅'[i]}</div><div className="sc-val" style={{fontSize:i===1?18:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="tabs">
        <div className="tab active">Upcoming (3)</div>
        <div className="tab">Completed</div>
        <div className="tab">All</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {meetings.filter(m=>m.status==='upcoming').map((m,i)=>(
          <div key={i} className="card" style={{padding:18}}>
            <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
              <div style={{width:46,height:46,borderRadius:12,background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'grid',placeItems:'center',fontSize:20,flexShrink:0}}>📅</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
                  <div style={{fontWeight:700,fontSize:14}}>{m.client}</div>
                  <span className="badge badge-blue">{m.type}</span>
                </div>
                <div style={{fontSize:12,color:'var(--muted)'}}>{m.company} · {m.date} at {m.time} · {m.duration} · {m.via}</div>
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <button className="btn btn-primary btn-sm" onClick={()=>window.open('https://zoom.us','_blank')}>Join Meeting</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Reschedule link sent!')}>Reschedule</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── NOTIFICATIONS ──────────────────────────────────────────────
export function AccountantNotifications(){
  const[notifs,setNotifs]=useState([
    {id:1,icon:'📋',bg:'var(--red-lt)',title:'Task overdue — VAT Return Q1 (Ahmed Al Rashid)',msg:'This task is 5 days overdue. Admin has been notified.',time:'1h ago',unread:true},
    {id:2,icon:'👥',bg:'var(--blue-lt)',title:'New client assigned — Khalid Al Mansoori',msg:'Growth plan · KM Real Estate · Please review onboarding docs.',time:'2h ago',unread:true},
    {id:3,icon:'📁',bg:'var(--gold-lt)',title:'Document uploaded — Nadia Khoury',msg:'Emirates ID uploaded for KYC review.',time:'3h ago',unread:true},
    {id:4,icon:'📅',bg:'var(--orange-lt)',title:'VAT deadline in 8 days — Ahmed Al Rashid',msg:'Q1 2025 VAT return due Jun 28. Task has been created.',time:'Yesterday',unread:true},
    {id:5,icon:'💬',bg:'var(--green-lt)',title:'New message — Mohammed Hassan',msg:"Hi Rashmi, can you check the May report?",time:'Yesterday',unread:false},
    {id:6,icon:'📢',bg:'var(--purple-lt)',title:'Announcement from Musa',msg:'FTA portal maintenance Jun 12 — file VAT before 8 AM.',time:'Jun 11',unread:false},
  ])

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🔔 Notifications</div><div className="ph-sub">{notifs.filter(n=>n.unread).length} unread</div></div>
        <button className="btn btn-ghost btn-sm" onClick={()=>setNotifs(n=>n.map(x=>({...x,unread:false})))}>✓ Mark All Read</button>
      </div>
      <div className="card">
        {notifs.map((n,i)=>(
          <div key={n.id} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,unread:false}:x))} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 18px',borderBottom:i<notifs.length-1?'1px solid var(--grey2)':'none',background:n.unread?'var(--red-xlt)':'var(--white)',cursor:'pointer',transition:'.2s'}}>
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
export function AccountantProfile(){
  const{profile}=useAuth()
  const name=profile?.full_name||'Rashmi Sharma'

  return(
    <div>
      <div className="ph"><div><div className="ph-title">👤 My Profile</div><div className="ph-sub">Manage your account and preferences</div></div></div>
      <div style={{background:'linear-gradient(135deg,#0F0F0F,#1A0005)',borderRadius:16,padding:'24px 28px',marginBottom:20,display:'flex',alignItems:'center',gap:20}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:26,flexShrink:0}}>{name[0]}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,fontWeight:700,color:'#fff'}}>{name}</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:3}}>Senior Accountant (ACCA) · Balans Accounting</div>
          <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
            {['👩‍💼 Senior Accountant','🏆 ACCA Qualified','🇦🇪 UAE Specialist','👥 8 Clients','💰 40% Commission'].map((b,i)=>(
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
            <div className="fg"><label>Email</label><input defaultValue={profile?.email||'rashmi@balans.ae'}/></div>
            <div className="fg"><label>WhatsApp</label><input defaultValue="+971 50 123 4567"/></div>
            <div className="fg"><label>ACCA Number</label><input defaultValue="ACCA #1234567"/></div>
            <div className="fg"><label>Calendly URL</label><input defaultValue="calendly.com/rashmi-balans"/></div>
            <div className="fg"><label>Specialisations</label><input defaultValue="UAE VAT, Corporate Tax, Bookkeeping"/></div>
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
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Performance — June 2025</div>
          <div className="sg sg-2">
            {[{v:'8',l:'Active Clients',c:'var(--blue)'},{v:'87%',l:'On-Time Rate',c:'var(--green)'},{v:'AED 6,840',l:'Commission',c:'var(--gold)'},{v:'4h 22m',l:'Logged Today',c:'var(--purple)'}].map((s,i)=>(
              <div key={i} style={{background:'var(--soft)',borderRadius:10,padding:14,textAlign:'center'}}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:900,color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
