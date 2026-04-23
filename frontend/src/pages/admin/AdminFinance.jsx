import React,{useState}from'react'
import{LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,BarChart,Bar}from'recharts'

const mrrData=[{m:'Jan',mrr:8250,clients:11},{m:'Feb',mrr:10500,clients:14},{m:'Mar',mrr:11250,clients:15},{m:'Apr',mrr:13500,clients:18},{m:'May',mrr:15000,clients:21},{m:'Jun',mrr:17250,clients:24}]

export function AdminRevenue(){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">💰 Revenue & MRR</div><div className="ph-sub">Monthly recurring revenue dashboard</div></div><button className="btn btn-ghost btn-sm">⬇ Export</button></div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'AED 17,250',l:'MRR (June)',bg:'var(--gold-lt)',t:'+16% MoM',tc:'t-up'},{v:'24',l:'Active Clients',bg:'var(--blue-lt)',t:'+3 this month',tc:'t-up'},{v:'98%',l:'Retention Rate',bg:'var(--green-lt)',t:'0 churned',tc:'t-up'},{v:'AED 862',l:'VAT Collected',bg:'var(--orange-lt)',t:'5% of revenue',tc:'t-neu'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'💰📊✅🧾'[i]}</div><div className="sc-val" style={{fontSize:18}}>{s.v}</div><div className="sc-lbl">{s.l}</div><div className={`sc-trend ${s.tc}`}>{s.t}</div></div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-head"><div className="card-title">MRR Growth 2025</div></div>
          <div style={{padding:'16px 18px'}}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mrrData}><XAxis dataKey="m" tick={{fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`}/><Tooltip formatter={v=>[`AED ${v.toLocaleString()}`,'']} contentStyle={{fontSize:12,borderRadius:8}}/><Line type="monotone" dataKey="mrr" stroke="var(--red)" strokeWidth={2.5} dot={{fill:'var(--red)',r:4}}/></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Revenue by Plan</div>
          {[{plan:'Pro',clients:6,mrr:13500,color:'var(--gold)'},{plan:'Growth',clients:8,mrr:12000,color:'var(--red)'},{plan:'Starter',clients:10,mrr:7500,color:'var(--blue)'}].map((p,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}><span style={{fontWeight:600}}>{p.plan} ({p.clients} clients)</span><span style={{fontWeight:700,color:p.color}}>AED {p.mrr.toLocaleString()}</span></div>
              <div className="pb-track"><div className="pb-fill" style={{width:`${(p.mrr/17250)*100}%`,background:p.color}}/></div>
            </div>
          ))}
          <div style={{marginTop:14,padding:'10px 12px',background:'var(--red-xlt)',borderRadius:8}}>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:2}}>Unpaid / Overdue</div>
            <div style={{fontSize:13,fontWeight:700,color:'var(--red)'}}>AED 1,500 — 2 clients</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminCommissions(){
  const[tab,setTab]=useState('pending')
  const comms=[
    {rep:'Sara Al Nabi',client:'Mohammed Hassan',plan:'Pro',date:'Jun 15',base:200,bonus:500,total:700,status:'pending'},
    {rep:'Omar Hassan',client:'Sara Mohammed',plan:'Growth',date:'Jun 14',base:200,bonus:0,total:200,status:'pending'},
    {rep:'Khalil Rashid',client:'Lara Petrov',plan:'Growth',date:'Jun 13',base:200,bonus:0,total:200,status:'pending'},
    {rep:'Sara Al Nabi',client:'Fatima Al Amiri',plan:'Pro',date:'Jun 10',base:200,bonus:0,total:200,status:'paid'},
    {rep:'Nour Al Amin',client:'James Anderson',plan:'Growth',date:'Jun 8',base:200,bonus:0,total:200,status:'paid'},
  ]
  const filtered=comms.filter(c=>tab==='all'||c.status===tab)
  return(
    <div>
      <div className="ph"><div><div className="ph-title">🏆 Commissions</div><div className="ph-sub">Review & approve sales commissions</div></div></div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'AED 16,400',l:'Total Paid YTD',bg:'var(--green-lt)'},{v:'3',l:'Pending Approval',bg:'var(--orange-lt)'},{v:'AED 1,100',l:'Pending Amount',bg:'var(--red-lt)'},{v:'AED 200',l:'Per Conversion',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'💰⏳💵🎯'[i]}</div><div className="sc-val" style={{fontSize:18}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="tabs">{[['all','All'],['pending','⏳ Pending (3)'],['paid','✅ Paid']].map(([k,l])=><div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>)}</div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Sales Rep</th><th>Client</th><th>Plan</th><th>Date</th><th>Base</th><th>Bonus</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map((c,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{c.rep}</td><td>{c.client}</td>
                  <td><span className={`badge ${c.plan==='Pro'?'badge-gold':c.plan==='Growth'?'badge-green':'badge-blue'}`}>{c.plan}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{c.date}</td>
                  <td style={{color:'var(--green)',fontWeight:600}}>AED {c.base}</td>
                  <td style={{color:'var(--gold)',fontWeight:600}}>{c.bonus?`AED ${c.bonus}`:'—'}</td>
                  <td style={{color:'var(--red)',fontWeight:700}}>AED {c.total}</td>
                  <td><span className={`badge ${c.status==='paid'?'badge-green':'badge-orange'}`}>{c.status}</span></td>
                  <td>
                    {c.status==='pending'?(
                      <div style={{display:'flex',gap:4}}>
                        <button className="btn btn-primary btn-sm" onClick={()=>alert('Approved!')}>✓ Approve</button>
                        <button className="btn btn-danger btn-sm">✗</button>
                      </div>
                    ):<span style={{fontSize:11,color:'var(--muted)'}}>Paid</span>}
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

export function AdminPayroll(){
  const[tab,setTab]=useState('current')
  const items=[
    {name:'Rashmi Sharma',role:'Accountant',salary:0,commission:6840,bonus:0,afterHours:0,fine:0,total:6840},
    {name:'Aisha Malik',role:'Accountant',salary:0,commission:3200,bonus:0,afterHours:0,fine:0,total:3200},
    {name:'Sara Al Nabi',role:'Sales',salary:0,commission:3000,bonus:500,afterHours:400,fine:0,total:3900},
    {name:'Omar Hassan',role:'Sales',salary:0,commission:2400,bonus:0,afterHours:0,fine:200,total:2200},
    {name:'Khalil Rashid',role:'Sales',salary:0,commission:2600,bonus:0,afterHours:0,fine:0,total:2600},
    {name:'Nour Al Amin',role:'Sales',salary:0,commission:1800,bonus:0,afterHours:0,fine:200,total:1600},
    {name:'Reem Saleh',role:'Sales',salary:0,commission:1400,bonus:0,afterHours:0,fine:0,total:1400},
  ]
  const totalPayroll=items.reduce((s,i)=>s+i.total,0)
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">💵 Payroll</div><div className="ph-sub">Monthly payroll management — June 2025</div></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm">⬇ Export WPS</button>
          <button className="btn btn-primary btn-sm" onClick={()=>alert('Payroll processed! Team notified.')}>✓ Run Payroll</button>
        </div>
      </div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:`AED ${totalPayroll.toLocaleString()}`,l:'Total Payable',bg:'var(--red-lt)'},{v:'7',l:'Team Members',bg:'var(--blue-lt)'},{v:'AED 200',l:'Fine Deductions',bg:'var(--orange-lt)'},{v:'AED 900',l:'After-Hours Bonuses',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'💵👥⚠️🌙'[i]}</div><div className="sc-val" style={{fontSize:18}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><div className="card-title">June 2025 Payroll — Draft</div><span className="badge badge-orange">Draft</span></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Name</th><th>Role</th><th>Commission</th><th>Bonus</th><th>After-Hours</th><th>Fine Deduction</th><th>Total Payable</th><th>Action</th></tr></thead>
            <tbody>
              {items.map((p,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{p.name}</td>
                  <td><span className={`badge ${p.role==='Accountant'?'badge-blue':'badge-gold'}`}>{p.role}</span></td>
                  <td style={{color:'var(--green)',fontWeight:600}}>AED {p.commission.toLocaleString()}</td>
                  <td style={{color:'var(--gold)',fontWeight:600}}>{p.bonus?`AED ${p.bonus}`:'—'}</td>
                  <td style={{color:'var(--purple)',fontWeight:600}}>{p.afterHours?`AED ${p.afterHours}`:'—'}</td>
                  <td style={{color:'var(--red)',fontWeight:600}}>{p.fine?`-AED ${p.fine}`:'—'}</td>
                  <td style={{fontWeight:700,color:'var(--text)'}}>AED {p.total.toLocaleString()}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={()=>alert(`Edit ${p.name}`)}>✏ Edit</button></td>
                </tr>
              ))}
              <tr style={{background:'var(--soft)',fontWeight:700}}>
                <td colSpan={6} style={{textAlign:'right',padding:'12px 14px',fontWeight:700}}>Total:</td>
                <td style={{fontWeight:700,fontSize:15,color:'var(--red)'}}>AED {totalPayroll.toLocaleString()}</td>
                <td/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function AdminExpenses(){
  const[modal,setModal]=useState(false)
  const expenses=[
    {cat:'Software',desc:'Supabase Pro Plan',amount:550,date:'Jun 1',by:'Musa'},
    {cat:'Marketing',desc:'Meta Ads — June campaign',amount:2200,date:'Jun 1',by:'Musa'},
    {cat:'Software',desc:'Stripe fees',amount:485,date:'Jun 15',by:'System'},
    {cat:'Software',desc:'Calendly Team',amount:180,date:'Jun 1',by:'Musa'},
    {cat:'Office',desc:'Virtual office — Jumeirah',amount:1200,date:'Jun 1',by:'Musa'},
    {cat:'Legal',desc:'Trade licence renewal',amount:3200,date:'Jun 5',by:'Musa'},
  ]
  const total=expenses.reduce((s,e)=>s+e.amount,0)
  const catColors={Software:'badge-blue',Marketing:'badge-purple',Office:'badge-orange',Legal:'badge-red',Tools:'badge-gold',Other:'badge-grey'}
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🧾 Expenses</div><div className="ph-sub">Business expenses tracker — June 2025</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Log Expense</button>
      </div>
      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:`AED ${total.toLocaleString()}`,l:'Total June',bg:'var(--red-lt)'},{v:'6',l:'Entries',bg:'var(--blue-lt)'},{v:'AED 2,730',l:'Software & Tools',bg:'var(--purple-lt)'},{v:'AED 2,200',l:'Marketing',bg:'var(--gold-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'💸📋💻📣'[i]}</div><div className="sc-val" style={{fontSize:18}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Category</th><th>Description</th><th>Amount (AED)</th><th>Date</th><th>By</th><th>Action</th></tr></thead>
            <tbody>
              {expenses.map((e,i)=>(
                <tr key={i}>
                  <td><span className={`badge ${catColors[e.cat]||'badge-grey'}`}>{e.cat}</span></td>
                  <td style={{fontWeight:500}}>{e.desc}</td>
                  <td style={{fontWeight:700,color:'var(--red)'}}>AED {e.amount.toLocaleString()}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{e.date}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{e.by}</td>
                  <td><button className="btn btn-ghost btn-sm btn-icon">🗑</button></td>
                </tr>
              ))}
              <tr style={{background:'var(--soft)'}}>
                <td colSpan={2} style={{fontWeight:700,padding:'12px 14px',textAlign:'right'}}>Total Expenses:</td>
                <td style={{fontWeight:700,color:'var(--red)',fontSize:15}}>AED {total.toLocaleString()}</td>
                <td colSpan={3}/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <div className="mo">
          <div className="md">
            <button className="md-x" onClick={()=>setModal(false)}>×</button>
            <h3>🧾 Log Expense</h3>
            <div className="fg"><label>Category</label><select><option>Software</option><option>Marketing</option><option>Office</option><option>Legal</option><option>Tools</option><option>Other</option></select></div>
            <div className="fg"><label>Description</label><input placeholder="What was this expense for?"/></div>
            <div className="fg-row">
              <div className="fg"><label>Amount (AED)</label><input type="number" placeholder="0"/></div>
              <div className="fg"><label>Date</label><input type="date"/></div>
            </div>
            <div className="fg"><label>Receipt (optional)</label><input type="file"/></div>
            <div className="md-acts">
              <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{setModal(false);alert('Expense logged!')}}>Save Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function AdminPL(){
  const revenue=17250,expenses=7815,commissions=totalComm(),payroll=0,netProfit=revenue-expenses-commissions
  function totalComm(){return 1100}
  const rows=[
    {label:'Gross Revenue (MRR)',amount:revenue,type:'income'},
    {label:'  → Starter (10 clients × AED 750)',amount:7500,type:'sub'},
    {label:'  → Growth (8 clients × AED 1,500)',amount:12000,type:'sub'},
    {label:'  → Pro (6 clients × AED 2,250)',amount:13500,type:'sub'},
    {label:'UAE VAT Collected (5%)',amount:862,type:'note'},
    {label:'Net Revenue (ex-VAT)',amount:revenue-862,type:'subtotal'},
    {label:'Commissions Paid',amount:-totalComm(),type:'expense'},
    {label:'Operating Expenses',amount:-expenses,type:'expense'},
    {label:'  → Software & Tools',amount:-2730,type:'sub'},
    {label:'  → Marketing',amount:-2200,type:'sub'},
    {label:'  → Office',amount:-1200,type:'sub'},
    {label:'  → Legal',amount:-3200,type:'sub'},
  ]
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📉 P&L Report</div><div className="ph-sub">Profit & Loss — June 2025</div></div>
        <button className="btn btn-ghost btn-sm">⬇ Export PDF</button>
      </div>
      <div className="sg sg-3" style={{marginBottom:16}}>
        {[{v:`AED ${revenue.toLocaleString()}`,l:'Gross Revenue',bg:'var(--green-lt)',color:'var(--green)'},{v:`AED ${(expenses+totalComm()).toLocaleString()}`,l:'Total Expenses',bg:'var(--red-lt)',color:'var(--red)'},{v:`AED ${(revenue-expenses-totalComm()).toLocaleString()}`,l:'Net Profit',bg:'var(--gold-lt)',color:'var(--gold)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'📈💸💰'[i]}</div><div className="sc-val" style={{fontSize:24,color:s.color,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="card card-pad">
        <div style={{fontSize:14,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>June 2025 Profit & Loss Statement</div>
        {rows.map((r,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:`${r.type==='subtotal'?'10px':'7px'} 0`,borderBottom:r.type==='subtotal'?'2px solid var(--grey2)':'1px solid var(--grey2)',fontWeight:r.type==='subtotal'||r.type==='income'?700:400,color:r.type==='expense'?'var(--red)':r.type==='income'?'var(--green)':r.type==='subtotal'?'var(--text)':'var(--muted)',fontSize:r.type==='sub'?12:13,paddingLeft:r.type==='sub'?16:0}}>
            <span>{r.label}</span>
            <span>{r.amount>0?`AED ${Math.abs(r.amount).toLocaleString()}`:`-AED ${Math.abs(r.amount).toLocaleString()}`}</span>
          </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0 0',fontWeight:900,fontSize:16,color:'var(--gold)'}}>
          <span>NET PROFIT</span>
          <span>AED {(revenue-expenses-totalComm()).toLocaleString()}</span>
        </div>
        <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>Profit Margin: {Math.round(((revenue-expenses-totalComm())/revenue)*100)}%</div>
      </div>
    </div>
  )
}
