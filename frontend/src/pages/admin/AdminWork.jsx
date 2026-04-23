import React,{useState}from'react'

// ── ALL TASKS ──────────────────────────────────────────
export function AdminAllTasks(){
  const[tab,setTab]=useState('all')
  const[modal,setModal]=useState(false)

  const tasks=[
    {id:1,title:'VAT Return Q1 — Filing',client:'Ahmed Al Rashid',accountant:'Rashmi S.',type:'VAT',priority:'critical',due:'Jun 20',status:'overdue',daysOver:5},
    {id:2,title:'Bookkeeping May reconciliation',client:'Nadia Khoury',accountant:'Rashmi S.',type:'Bookkeeping',priority:'high',due:'Jun 22',status:'overdue',daysOver:3},
    {id:3,title:'Monthly Report — May',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'Report',priority:'medium',due:'Jun 15',status:'due_today'},
    {id:4,title:'VAT Registration — Initial',client:'Rajan Joshi',accountant:'Aisha M.',type:'VAT',priority:'normal',due:'Jun 25',status:'in_progress'},
    {id:5,title:'CT Registration — Gulf Import',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'Corp Tax',priority:'medium',due:'Jun 30',status:'in_progress'},
    {id:6,title:'Payroll — May processing',client:'Fatima Al Amiri',accountant:'Rashmi S.',type:'Payroll',priority:'normal',due:'Jun 28',status:'done'},
    {id:7,title:'Document Review — KYC',client:'Nadia Khoury',accountant:'Aisha M.',type:'KYC',priority:'medium',due:'Jun 18',status:'escalated'},
    {id:8,title:'Bank Statement Review Q1',client:'Lara Petrov',accountant:'Aisha M.',type:'Bookkeeping',priority:'normal',due:'Jul 5',status:'pending'},
    {id:9,title:'Advisory Call — Tax Planning',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'Advisory',priority:'low',due:'Jul 10',status:'pending'},
  ]

  const stColors={overdue:'badge-red',due_today:'badge-orange',in_progress:'badge-blue',done:'badge-green',escalated:'badge-purple',pending:'badge-grey'}
  const prColors={critical:'var(--red)',high:'var(--orange)',medium:'var(--gold)',normal:'var(--green)',low:'var(--muted)'}

  const filtered=tasks.filter(t=>{
    if(tab==='overdue')return t.status==='overdue'
    if(tab==='today')return t.status==='due_today'
    if(tab==='progress')return t.status==='in_progress'
    if(tab==='done')return t.status==='done'
    if(tab==='escalated')return t.status==='escalated'
    return true
  })

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">✅ All Tasks</div><div className="ph-sub">Every task across all accountants — {tasks.length} total</div></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Assign Task</button>
        </div>
      </div>

      <div className="sg sg-5" style={{marginBottom:16}}>
        {[
          {v:tasks.filter(t=>t.status==='overdue').length,l:'Overdue',bg:'var(--red-lt)'},
          {v:tasks.filter(t=>t.status==='due_today').length,l:'Due Today',bg:'var(--orange-lt)'},
          {v:tasks.filter(t=>t.status==='in_progress').length,l:'In Progress',bg:'var(--blue-lt)'},
          {v:tasks.filter(t=>t.status==='escalated').length,l:'Escalated',bg:'var(--purple-lt)'},
          {v:tasks.filter(t=>t.status==='done').length,l:'Completed',bg:'var(--green-lt)'},
        ].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🔴🟡🔵⚠️✅'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        {[['all',`All (${tasks.length})`],['overdue','🔴 Overdue'],['today','🟡 Due Today'],['progress','🔵 In Progress'],['escalated','⚠️ Escalated'],['done','✅ Done']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="toolbar">
        <div className="fil">👩‍💼 Accountant ▾</div>
        <div className="fil">👥 Client ▾</div>
        <div className="fil">📋 Type ▾</div>
        <div style={{flex:1}}/>
        <div className="srch">🔍 <input placeholder="Search tasks..."/></div>
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Task</th><th>Client</th><th>Accountant</th><th>Type</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(t=>(
                <tr key={t.id} style={{background:t.status==='overdue'?'var(--red-xlt)':t.status==='escalated'?'var(--purple-lt)':''}}>
                  <td style={{fontWeight:600}}>{t.title}</td>
                  <td style={{fontSize:12}}>{t.client}</td>
                  <td><span className="badge badge-blue">{t.accountant}</span></td>
                  <td><span className="badge badge-grey">{t.type}</span></td>
                  <td><span style={{fontSize:11,fontWeight:700,color:prColors[t.priority]}}>● {t.priority}</span></td>
                  <td style={{color:t.status==='overdue'?'var(--red)':'inherit',fontWeight:t.status==='overdue'?700:400,fontSize:12}}>
                    {t.due}{t.daysOver?` (-${t.daysOver}d)`:''}
                  </td>
                  <td><span className={`badge ${stColors[t.status]}`}>{t.status.replace('_',' ')}</span></td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="View">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Reassign">🔄</button>
                      {t.status!=='done'&&<button className="btn btn-ghost btn-sm btn-icon" title="Escalate" style={{color:'var(--red)'}}>⚠️</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>{filtered.length} tasks</div><div className="pag"><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">›</div></div></div>
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(false)}>×</button>
          <h3>📋 Assign New Task</h3>
          <div className="fg"><label>Task Title *</label><input placeholder="e.g. VAT Return Q2 — Filing"/></div>
          <div className="fg-row">
            <div className="fg"><label>Client *</label><select><option>Ahmed Al Rashid</option><option>Sara Mohammed</option><option>Mohammed Hassan</option></select></div>
            <div className="fg"><label>Assign To *</label><select><option>Rashmi Sharma</option><option>Aisha Malik</option></select></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Type</label><select><option>VAT</option><option>Bookkeeping</option><option>Report</option><option>Corp Tax</option><option>Payroll</option><option>KYC</option></select></div>
            <div className="fg"><label>Priority</label><select><option>🔴 Critical</option><option>🟡 High</option><option>🟢 Normal</option></select></div>
          </div>
          <div className="fg"><label>Due Date *</label><input type="date"/></div>
          <div className="fg"><label>Notes</label><textarea style={{minHeight:55,resize:'vertical'}}/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(false);alert('✅ Task assigned! Accountant notified.')}}>Assign Task</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── ALL DOCUMENTS ──────────────────────────────────────────
export function AdminAllDocuments(){
  const[tab,setTab]=useState('all')
  const docs=[
    {name:'VAT Return Q1 2025 — Final',client:'Sara Mohammed',accountant:'Rashmi S.',type:'VAT',date:'Jun 14',size:'284 KB',status:'approved'},
    {name:'Emirates ID — Front & Back',client:'Nadia Khoury',accountant:'Rashmi S.',type:'KYC',date:'Jun 13',size:'1.2 MB',status:'pending'},
    {name:'Bank Statement May 2025',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'Bank',date:'Jun 12',size:'892 KB',status:'approved'},
    {name:'Trade Licence — Renewal',client:'Fatima Al Amiri',accountant:'Rashmi S.',type:'KYC',date:'Jun 12',size:'3.1 MB',status:'approved'},
    {name:'Monthly P&L — May 2025',client:'Lara Petrov',accountant:'Aisha M.',type:'Report',date:'Jun 10',size:'156 KB',status:'approved'},
    {name:'Passport Copy',client:'Rajan Joshi',accountant:'Aisha M.',type:'KYC',date:'Jun 9',size:'2.4 MB',status:'pending'},
    {name:'VAT Certificate — FTA',client:'James Anderson',accountant:'Aisha M.',type:'VAT',date:'Jun 8',size:'210 KB',status:'approved'},
    {name:'Invoices Bundle — May 2025',client:'Ahmed Al Rashid',accountant:'Rashmi S.',type:'Bookkeeping',date:'Jun 7',size:'5.6 MB',status:'pending'},
  ]
  const typeColor={VAT:'badge-blue',Report:'badge-green',Bank:'badge-purple',KYC:'badge-gold',Bookkeeping:'badge-orange'}
  const filtered=docs.filter(d=>tab==='all'||tab==='pending'?d.status==='pending':tab==='approved'?d.status==='approved':d.type.toLowerCase()===tab)

  return(
    <div>
      <div className="ph"><div><div className="ph-title">📁 All Documents</div><div className="ph-sub">Every document from every client — {docs.length} shown</div></div><button className="btn btn-ghost btn-sm">⬇ Export List</button></div>
      <div className="tabs">
        {[['all','All (312)'],['pending','⏳ Pending (14)'],['approved','✅ Approved (298)'],['vat','VAT'],['kyc','KYC'],['bank','Bank']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="toolbar">
        <div className="fil">👩‍💼 Accountant ▾</div><div className="fil">👥 Client ▾</div><div className="fil">📅 Month ▾</div>
        <div style={{flex:1}}/><div className="srch">🔍 <input placeholder="Search documents..."/></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Document</th><th>Client</th><th>Accountant</th><th>Type</th><th>Date</th><th>Size</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {(tab==='all'?docs:filtered).map((d,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{d.name}</td>
                  <td style={{fontSize:12}}>{d.client}</td>
                  <td style={{fontSize:12}}>{d.accountant}</td>
                  <td><span className={`badge ${typeColor[d.type]||'badge-grey'}`}>{d.type}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{d.date}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{d.size}</td>
                  <td><span className={`badge ${d.status==='approved'?'badge-green':'badge-orange'}`}>{d.status==='approved'?'✓ Approved':'⏳ Pending'}</span></td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon">⬇</button>
                      {d.status==='pending'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>alert('Approved!')}>✓</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>8 of 312 documents · 14 awaiting review</div><div className="pag"><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">...</div><div className="pgb">39</div><div className="pgb">›</div></div></div>
      </div>
    </div>
  )
}

// ── ALL REPORTS ──────────────────────────────────────────
export function AdminAllReports(){
  const[tab,setTab]=useState('all')
  const reports=[
    {name:'Monthly P&L — May 2025',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'P&L',period:'May 2025',sent:'Jun 5',opened:true,openedDate:'Jun 6'},
    {name:'VAT Return Summary Q1',client:'Sara Mohammed',accountant:'Rashmi S.',type:'VAT',period:'Q1 2025',sent:'Jun 4',opened:true,openedDate:'Jun 4'},
    {name:'Monthly Review — May 2025',client:'Fatima Al Amiri',accountant:'Rashmi S.',type:'Review',period:'May 2025',sent:'Jun 5',opened:true,openedDate:'Jun 7'},
    {name:'Bookkeeping Summary — May',client:'Lara Petrov',accountant:'Aisha M.',type:'Bookkeeping',period:'May 2025',sent:'Jun 6',opened:false},
    {name:'CT Readiness Report',client:'Mohammed Hassan',accountant:'Rashmi S.',type:'CT',period:'FY2024',sent:'Jun 3',opened:true,openedDate:'Jun 3'},
    {name:'Monthly P&L — May 2025',client:'James Anderson',accountant:'Aisha M.',type:'P&L',period:'May 2025',sent:'Jun 5',opened:false},
    {name:'VAT Summary Q1',client:'Ahmed Al Rashid',accountant:'Rashmi S.',type:'VAT',period:'Q1 2025',sent:'Jun 2',opened:true,openedDate:'Jun 3'},
  ]
  const typeColor={PL:'badge-green','P&L':'badge-green',VAT:'badge-blue',Review:'badge-purple',Bookkeeping:'badge-orange',CT:'badge-grey',Annual:'badge-gold'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">📊 All Reports</div><div className="ph-sub">Every report sent to every client — 186 total this year</div></div><button className="btn btn-ghost btn-sm">⬇ Export</button></div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'186',l:'Total Sent 2025',bg:'var(--blue-lt)'},{v:'91%',l:'Open Rate',bg:'var(--green-lt)'},{v:'2',l:'Not Yet Opened',bg:'var(--orange-lt)'},{v:'62',l:'P&L Reports',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'📊✅⚠️📈'[i]}</div><div className="sc-val" style={{fontSize:i===0?22:i===1?22:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="tabs">
        {[['all','All (186)'],['pl','📈 P&L'],['vat','🧾 VAT'],['review','📋 Review'],['ct','🏛 CT']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="toolbar">
        <div className="fil">👩‍💼 Accountant ▾</div><div className="fil">👥 Client ▾</div><div className="fil">📅 Month ▾</div>
        <div style={{flex:1}}/><div className="srch">🔍 <input placeholder="Search reports..."/></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Report</th><th>Client</th><th>Accountant</th><th>Type</th><th>Period</th><th>Sent</th><th>Opened</th><th>Action</th></tr></thead>
            <tbody>
              {reports.map((r,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{r.name}</td>
                  <td style={{fontSize:12}}>{r.client}</td>
                  <td style={{fontSize:12}}>{r.accountant}</td>
                  <td><span className={`badge ${typeColor[r.type]||'badge-grey'}`}>{r.type}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{r.period}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{r.sent}</td>
                  <td>{r.opened?<span className="badge badge-green">✓ {r.openedDate}</span>:<span className="badge badge-orange">Not opened</span>}</td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon">⬇</button>
                      {!r.opened&&<button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>alert('Reminder sent!')}>🔔 Remind</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>7 of 186 reports · avg open rate 91%</div><div className="pag"><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">...</div><div className="pgb">27</div><div className="pgb">›</div></div></div>
      </div>
    </div>
  )
}

// ── TRANSACTIONS ──────────────────────────────────────────
export function AdminTransactions(){
  const[tab,setTab]=useState('all')
  const txs=[
    {date:'Jun 15',client:'Mohammed Hassan',type:'stripe',desc:'Pro Plan — June 2025',credits:'+1,800',amount:'+2,250',method:'Visa ••4242',status:'success'},
    {date:'Jun 15',client:'Fatima Al Amiri',type:'stripe',desc:'Pro Plan — June 2025',credits:'+1,800',amount:'+2,250',method:'MC ••8891',status:'success'},
    {date:'Jun 14',client:'Sara Mohammed',type:'stripe',desc:'Growth Plan — June 2025',credits:'+1,200',amount:'+1,500',method:'Visa ••5521',status:'success'},
    {date:'Jun 14',client:'Rashmi — VAT Filing',type:'credits',desc:'VAT Return Q1 — Ahmed Al Rashid',credits:'-120',amount:'—',method:'Credits',status:'deducted'},
    {date:'Jun 13',client:'Ahmed Al Rashid',type:'stripe',desc:'Starter Plan — June 2025',credits:'+600',amount:'+750',method:'Visa ••1122',status:'pending'},
    {date:'Jun 13',client:'Rajan Joshi',type:'failed',desc:'Starter Plan — Payment Failed',credits:'—',amount:'FAILED',method:'Visa ••7733',status:'failed'},
    {date:'Jun 12',client:'Aisha — Bookkeeping',type:'credits',desc:'Monthly bookkeeping — Lara Petrov',credits:'-80',amount:'—',method:'Credits',status:'deducted'},
    {date:'Jun 10',client:'Nadia Khoury',type:'topup',desc:'Credit top-up request — 300 credits',credits:'+300 req.',amount:'+375',method:'Pending',status:'review'},
  ]
  const stColors={success:'badge-green',pending:'badge-orange',failed:'badge-red',deducted:'badge-blue',review:'badge-orange'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">💳 Transactions</div><div className="ph-sub">Every Stripe payment · Every credit deduction · Full audit trail</div></div><button className="btn btn-ghost btn-sm">⬇ Export CSV</button></div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'AED 17,250',l:'Revenue (Jun)',bg:'var(--gold-lt)'},{v:'24',l:'Payments Collected',bg:'var(--green-lt)'},{v:'2',l:'Failed / Pending',bg:'var(--red-lt)'},{v:'1,240',l:'Avg Credits Used',bg:'var(--blue-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'💰💳⚠️🪙'[i]}</div><div className="sc-val" style={{fontSize:i===0?16:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="tabs">
        {[['all','All'],['stripe','💳 Stripe Payments'],['credits','🪙 Credits'],['failed','⚠️ Failed (2)'],['review','⏳ Review']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Client</th><th>Type</th><th>Description</th><th>Credits</th><th>Amount (AED)</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {txs.map((t,i)=>(
                <tr key={i} style={{background:t.status==='failed'?'var(--red-xlt)':''}}>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{t.date}</td>
                  <td style={{fontWeight:600,fontSize:12}}>{t.client}</td>
                  <td><span className={`badge ${t.type==='stripe'?'badge-blue':t.type==='credits'?'badge-purple':t.type==='failed'?'badge-red':'badge-orange'}`}>{t.type}</span></td>
                  <td style={{fontSize:12}}>{t.desc}</td>
                  <td style={{fontWeight:600,color:t.credits.startsWith('+')?'var(--green)':'var(--red)',fontSize:12}}>{t.credits}</td>
                  <td style={{fontWeight:700,color:t.amount==='FAILED'?'var(--red)':t.amount==='—'?'var(--muted)':'var(--green)'}}>{t.amount!=='—'&&t.amount!=='FAILED'?`AED ${t.amount}`:t.amount}</td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>{t.method}</td>
                  <td><span className={`badge ${stColors[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>8 of 284 transactions this year</div><div className="pag"><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">...</div><div className="pgb">36</div><div className="pgb">›</div></div></div>
      </div>
    </div>
  )
}
