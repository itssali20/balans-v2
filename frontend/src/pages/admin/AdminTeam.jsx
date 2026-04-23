import React,{useState}from'react'

// ── TEAM WORKLOAD ──────────────────────────────────────────
export function AdminWorkload(){
  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">⚖️ Team Workload</div><div className="ph-sub">Accountant capacity · Task load · Overload alerts</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>alert('Rebalance modal')}>🔄 Rebalance Workload</button>
      </div>

      <div style={{background:'var(--orange-lt)',border:'1px solid var(--orange)',borderRadius:10,padding:'12px 16px',marginBottom:14,display:'flex',gap:10,alignItems:'center'}}>
        <span style={{fontSize:18}}>⚠️</span>
        <div><div style={{fontSize:13,fontWeight:700,color:'var(--orange)'}}>Rashmi Sharma is approaching capacity — 8/10 clients, 18 open tasks</div><div style={{fontSize:12,color:'var(--orange)',opacity:.8}}>Consider redistributing 2–3 clients to Aisha Malik who has spare capacity</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
        {[
          {name:'Rashmi Sharma',role:'Senior Accountant (ACCA)',clients:8,maxClients:10,tasks:18,overdue:3,hours:'4h 22m',status:'near',color:'var(--orange)',tags:['Ahmed Al Rashid','Sara Mohammed','Mohammed Hassan','Fatima Al Amiri','Nadia Khoury','Khalid Al M.','Yasmin Al F.','Hanan Saleh']},
          {name:'Aisha Malik',role:'Accountant (ACCA) · UAE & UK',clients:4,maxClients:10,tasks:9,overdue:0,hours:'4h 30m',status:'good',color:'var(--green)',tags:['Lara Petrov','James Anderson','Rajan Joshi','Fiona Kelly']},
        ].map((a,i)=>(
          <div key={i} className="card" style={{borderLeft:`4px solid ${a.color}`}}>
            <div style={{padding:18}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${a.color},${a.color}99)`,display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:18,flexShrink:0}}>{a.name[0]}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>{a.name}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>{a.role}</div>
                </div>
                <span className={`badge ${a.status==='near'?'badge-orange':'badge-green'}`} style={{marginLeft:'auto'}}>{a.status==='near'?'⚠ Near Capacity':'✓ Has Capacity'}</span>
              </div>

              <div className="sg sg-3" style={{marginBottom:14}}>
                {[{v:a.clients,sub:`Max: ${a.maxClients}`,l:'Clients'},{v:a.tasks,sub:`${a.overdue} overdue`,l:'Tasks'},{v:a.hours,sub:'Online now',l:'Today'}].map((s,j)=>(
                  <div key={j} style={{background:'var(--soft)',borderRadius:8,padding:'10px',textAlign:'center'}}>
                    <div style={{fontSize:18,fontWeight:900,color:a.color,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div>
                    <div style={{fontSize:9,color:'var(--muted)',margin:'2px 0'}}>{s.l}</div>
                    <div style={{fontSize:9,color:j===1&&a.overdue>0?'var(--red)':'var(--muted)'}}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}><span>Client Capacity</span><span style={{fontWeight:700,color:a.color}}>{Math.round((a.clients/a.maxClients)*100)}%</span></div><div className="pb-track"><div className="pb-fill" style={{width:`${(a.clients/a.maxClients)*100}%`,background:a.color}}/></div></div>
              <div style={{marginBottom:12}}><div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}><span>Task Load</span><span style={{fontWeight:700,color:a.color}}>{Math.round((a.tasks/20)*100)}%</span></div><div className="pb-track"><div className="pb-fill" style={{width:`${(a.tasks/20)*100}%`,background:a.color}}/></div></div>

              <div style={{fontSize:11,fontWeight:600,marginBottom:6}}>Clients:</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                {a.tags.map((t,j)=><span key={j} className="badge badge-grey">{t}</span>)}
                {a.status==='good'&&<span style={{fontSize:11,background:'var(--green-lt)',color:'var(--green)',padding:'3px 9px',borderRadius:50,fontWeight:700,border:'1px dashed var(--green)'}}>+ Can take {a.maxClients-a.clients} more</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:18}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--red)',marginBottom:12}}>🚨 Overdue Task Escalations</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Task</th><th>Client</th><th>Accountant</th><th>Due</th><th>Days Overdue</th><th>Escalated</th><th>Action</th></tr></thead>
            <tbody>
              {[
                {task:'VAT Return Q1 — Filing',client:'Ahmed Al Rashid',acc:'Rashmi S.',due:'Jun 20',over:5},
                {task:'Bookkeeping reconciliation',client:'Nadia Khoury',acc:'Rashmi S.',due:'Jun 22',over:3},
                {task:'Document review KYC',client:'Nadia Khoury',acc:'Aisha M.',due:'Jun 18',over:2},
              ].map((e,i)=>(
                <tr key={i} style={{background:'var(--red-xlt)'}}>
                  <td style={{fontWeight:600}}>{e.task}</td>
                  <td style={{fontSize:12}}>{e.client}</td>
                  <td><span className="badge badge-blue">{e.acc}</span></td>
                  <td style={{color:'var(--red)',fontWeight:600,fontSize:12}}>{e.due}</td>
                  <td><span className="badge badge-red">-{e.over} days</span></td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>Auto-escalated</td>
                  <td><div style={{display:'flex',gap:4}}><button className="btn btn-ghost btn-sm btn-icon">📋</button><button className="btn btn-ghost btn-sm btn-icon">🔔</button><button className="btn btn-ghost btn-sm btn-icon">🔄</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── ACCOUNTANTS ──────────────────────────────────────────
export function AdminAccountants(){
  const accs=[
    {name:'Rashmi Sharma',email:'rashmi@balans.ae',acca:'ACCA #1234567',clients:8,tasks:18,commission:'AED 6,840',rate:'40%',joined:'Jan 2025',status:'active',onTime:'87%'},
    {name:'Aisha Malik',email:'aisha@balans.ae',acca:'ACCA #7654321',clients:4,tasks:9,commission:'AED 3,200',rate:'40%',joined:'Feb 2025',status:'active',onTime:'94%'},
  ]
  const[modal,setModal]=useState(false)

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">👩‍💼 Accountants</div><div className="ph-sub">Manage your accountant team</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ Add Accountant</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {accs.map((a,i)=>(
          <div key={i} className="card" style={{padding:22}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16,paddingBottom:14,borderBottom:'1px solid var(--grey2)'}}>
              <div style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:22,flexShrink:0}}>{a.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700}}>{a.name}</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>{a.email}</div>
                <div style={{fontSize:11,color:'var(--blue)',marginTop:2}}>{a.acca}</div>
              </div>
              <span className="badge badge-green">✓ Active</span>
            </div>
            <div className="sg sg-3" style={{marginBottom:14}}>
              {[{v:a.clients,l:'Clients'},{v:a.tasks,l:'Open Tasks'},{v:a.onTime,l:'On-Time Rate'}].map((s,j)=>(
                <div key={j} style={{background:'var(--soft)',borderRadius:8,padding:'10px',textAlign:'center'}}>
                  <div style={{fontSize:18,fontWeight:700,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div>
                  <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:8,paddingBottom:8,borderBottom:'1px solid var(--grey2)'}}>
              <span style={{color:'var(--muted)'}}>Commission Rate</span><span style={{fontWeight:700,color:'var(--gold)'}}>{a.rate}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:14}}>
              <span style={{color:'var(--muted)'}}>Commission (Jun)</span><span style={{fontWeight:700,color:'var(--green)'}}>{a.commission}</span>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-outline btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>alert('Edit accountant')}>✏ Edit</button>
              <button className="btn btn-ghost btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>alert('Change commission rate')}>% Rate</button>
            </div>
          </div>
        ))}
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(false)}>×</button>
          <h3>+ Add Accountant</h3>
          <div className="fg-row">
            <div className="fg"><label>Full Name *</label><input placeholder="Rashmi Sharma"/></div>
            <div className="fg"><label>Email *</label><input placeholder="rashmi@balans.ae"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>WhatsApp</label><input placeholder="+971 5X XXX XXXX"/></div>
            <div className="fg"><label>ACCA Number</label><input placeholder="ACCA #1234567"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Commission Rate (%)</label><input type="number" defaultValue={40}/></div>
            <div className="fg"><label>Max Clients</label><input type="number" defaultValue={10}/></div>
          </div>
          <div className="fg"><label>Calendly URL</label><input placeholder="calendly.com/name-balans"/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(false);alert('Accountant added! Login credentials sent.')}}>Add Accountant</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── SALES TEAM ──────────────────────────────────────────
export function AdminSalesTeam(){
  const reps=[
    {name:'Sara Al Nabi',email:'sara@balans.ae',conv:15,target:20,leads:28,rate:'54%',commission:'AED 3,000',effort:92,status:'leading'},
    {name:'Omar Hassan',email:'omar@balans.ae',conv:12,target:20,leads:24,rate:'50%',commission:'AED 2,400',effort:78,status:'good'},
    {name:'Khalil Rashid',email:'khalil@balans.ae',conv:13,target:20,leads:22,rate:'59%',commission:'AED 2,600',effort:83,status:'good'},
    {name:'Nour Al Amin',email:'nour@balans.ae',conv:9,target:20,leads:18,rate:'50%',commission:'AED 1,800',effort:61,status:'watch'},
    {name:'Reem Saleh',email:'reem@balans.ae',conv:7,target:20,leads:15,rate:'47%',commission:'AED 1,400',effort:48,status:'below'},
  ]
  const effortColor=(s)=>s>=80?'var(--green)':s>=60?'var(--orange)':'var(--red)'
  const statusBadge={leading:'badge-gold',good:'badge-green',watch:'badge-orange',below:'badge-red'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">📈 Sales Team</div><div className="ph-sub">5 active sales representatives · June 2025</div></div></div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Sales Rep</th><th>Conversions</th><th>Target Progress</th><th>Leads</th><th>Conv. Rate</th><th>Commission</th><th>Effort Score</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {reps.map((r,i)=>(
                <tr key={i}>
                  <td>
                    <div style={{fontWeight:600}}>{r.name}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{r.email}</div>
                  </td>
                  <td style={{fontWeight:700,fontSize:16,fontFamily:'Cormorant Garamond,serif'}}>{r.conv}<span style={{fontSize:12,color:'var(--muted)',fontFamily:'DM Sans,sans-serif',fontWeight:400}}>/{r.target}</span></td>
                  <td style={{minWidth:140}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div className="pb-track" style={{flex:1}}><div className="pb-fill" style={{width:`${(r.conv/r.target)*100}%`,background:(r.conv/r.target)>=0.75?'var(--green)':(r.conv/r.target)>=0.5?'var(--orange)':'var(--red)'}}/></div>
                      <span style={{fontSize:11,fontWeight:700,color:'var(--muted)',whiteSpace:'nowrap'}}>{Math.round((r.conv/r.target)*100)}%</span>
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{r.leads} total</td>
                  <td style={{fontWeight:600,color:'var(--green)'}}>{r.rate}</td>
                  <td style={{fontWeight:700,color:'var(--gold)'}}>{r.commission}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div className="pb-track" style={{width:60}}><div className="pb-fill" style={{width:`${r.effort}%`,background:effortColor(r.effort)}}/></div>
                      <span style={{fontSize:11,fontWeight:700,color:effortColor(r.effort)}}>{r.effort}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Edit targets">🎯</button>
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

// ── TEAM LOGINS ──────────────────────────────────────────
export function AdminLogins(){
  const[modal,setModal]=useState(null)
  const logins=[
    {name:'Musa',role:'admin',email:'musa@balans.ae',portal:'Admin Portal',created:'Jan 1 2025',lastLogin:'Just now',loginCount:521,status:'active'},
    {name:'Rashmi Sharma',role:'accountant',email:'rashmi@balans.ae',portal:'Accountant Portal',created:'Jan 1 2025',lastLogin:'Today 8:45 AM',loginCount:312,status:'active'},
    {name:'Aisha Malik',role:'accountant',email:'aisha@balans.ae',portal:'Accountant Portal',created:'Feb 10 2025',lastLogin:'Today 1:30 PM',loginCount:248,status:'active'},
    {name:'Sara Al Nabi',role:'sales',email:'sara@balans.ae',portal:'Sales Portal',created:'Jan 5 2025',lastLogin:'Today 9:10 AM',loginCount:298,status:'active'},
    {name:'Omar Hassan',role:'sales',email:'omar@balans.ae',portal:'Sales Portal',created:'Jan 5 2025',lastLogin:'Today 10:40 AM',loginCount:276,status:'active'},
    {name:'Khalil Rashid',role:'sales',email:'khalil@balans.ae',portal:'Sales Portal',created:'Jan 8 2025',lastLogin:'Today 9:55 AM',loginCount:261,status:'active'},
    {name:'Nour Al Amin',role:'sales',email:'nour@balans.ae',portal:'Sales Portal',created:'Mar 1 2025',lastLogin:'Today 11:15 AM',loginCount:187,status:'active'},
    {name:'Reem Saleh',role:'sales',email:'reem@balans.ae',portal:'Sales Portal',created:'Mar 15 2025',lastLogin:'Jun 14',loginCount:142,status:'active'},
  ]
  const roleColor={admin:'badge-red',accountant:'badge-blue',sales:'badge-gold'}

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🔐 Team Logins</div><div className="ph-sub">Create, manage and delete team member logins</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal('create')}>🔐 Create Login</button>
      </div>
      <div style={{background:'var(--orange-lt)',border:'1px solid var(--orange)',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:12,color:'var(--orange)',fontWeight:500}}>
        ⚠️ All logins are admin-controlled. Team members cannot change their own email. You can reset any password at any time.
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Portal</th><th>Created</th><th>Last Login</th><th>Logins</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {logins.map((l,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{l.name}</td>
                  <td><span className={`badge ${roleColor[l.role]}`}>{l.role}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{l.email}</td>
                  <td style={{fontSize:12}}>{l.portal}</td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>{l.created}</td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>{l.lastLogin}</td>
                  <td style={{fontSize:12,fontWeight:600}}>{l.loginCount}</td>
                  <td><span className="badge badge-green">✓ Active</span></td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={()=>setModal('edit')}>✏</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Reset Password" onClick={()=>alert('Password reset email sent!')}>🔑</button>
                      {l.role!=='admin'&&<button className="btn btn-danger btn-sm btn-icon" title="Suspend" onClick={()=>alert('Account suspended!')}>⛔</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal==='create'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>🔐 Create Team Login</h3>
          <div className="fg-row">
            <div className="fg"><label>Full Name *</label><input placeholder="Team member name"/></div>
            <div className="fg"><label>Role *</label><select><option>accountant</option><option>sales</option></select></div>
          </div>
          <div className="fg"><label>Email Address *</label><input type="email" placeholder="name@balans.ae"/></div>
          <div className="fg"><label>Temporary Password *</label><input type="password" placeholder="They will be asked to change this"/></div>
          <div className="fg"><label>WhatsApp (for notifications)</label><input placeholder="+971 5X XXX XXXX"/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);alert('Login created! Credentials sent via WhatsApp.')}}>Create Login</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── PERMISSIONS ──────────────────────────────────────────
export function AdminPermissions(){
  const[tab,setTab]=useState('accountant')
  const perms=[
    {section:'Client Access',items:[
      {label:'View own assigned clients only',accountant:true,sales:false},
      {label:'View all clients (cross-team)',accountant:false,sales:false},
      {label:'Download client documents',accountant:true,sales:false},
      {label:'Upload documents',accountant:true,sales:false},
      {label:'View client payment status',accountant:true,sales:false},
    ]},
    {section:'Finance',items:[
      {label:'View MRR / revenue data',accountant:false,sales:false},
      {label:'View own commission',accountant:false,sales:true},
      {label:'Submit commission for approval',accountant:false,sales:true},
      {label:'View Stripe payments',accountant:false,sales:false},
    ]},
    {section:'Tasks & Work',items:[
      {label:'View own tasks',accountant:true,sales:false},
      {label:'Create tasks',accountant:true,sales:false},
      {label:'Mark tasks complete',accountant:true,sales:false},
      {label:'Escalate tasks',accountant:true,sales:false},
    ]},
    {section:'Leads (Sales Only)',items:[
      {label:'View own leads',accountant:false,sales:true},
      {label:'View all team leads',accountant:false,sales:false},
      {label:'Add / edit leads',accountant:false,sales:true},
      {label:'Move leads in pipeline',accountant:false,sales:true},
    ]},
  ]

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🛡 Team Permissions</div><div className="ph-sub">Control exactly what each role can see and do</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>alert('Permissions saved!')}>Save All Changes</button>
      </div>
      <div style={{background:'var(--blue-lt)',border:'1px solid #93C5FD',borderRadius:10,padding:'12px 16px',marginBottom:14,fontSize:12,color:'var(--blue)'}}>
        ℹ️ Changes take effect immediately on the team member's next page load.
      </div>
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 140px 140px',gap:12,padding:'14px 18px',background:'var(--soft)',borderBottom:'1px solid var(--grey2)',alignItems:'center'}}>
          <div style={{fontSize:12,fontWeight:700,color:'var(--muted)'}}>FEATURE / ACCESS</div>
          <div style={{fontSize:12,fontWeight:700,textAlign:'center'}}>👩‍💼 ACCOUNTANT</div>
          <div style={{fontSize:12,fontWeight:700,textAlign:'center'}}>📈 SALES REP</div>
        </div>
        {perms.map((section,si)=>(
          <React.Fragment key={si}>
            <div style={{fontSize:10,fontWeight:700,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',padding:'10px 18px',background:'var(--red-xlt)',borderBottom:'1px solid var(--grey2)'}}>{section.section}</div>
            {section.items.map((item,ii)=>(
              <div key={ii} style={{display:'grid',gridTemplateColumns:'1fr 140px 140px',gap:12,padding:'10px 18px',borderBottom:'1px solid var(--grey2)',alignItems:'center'}}>
                <span style={{fontSize:13}}>{item.label}</span>
                <div style={{textAlign:'center'}}><input type="checkbox" defaultChecked={item.accountant}/></div>
                <div style={{textAlign:'center'}}><input type="checkbox" defaultChecked={item.sales}/></div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
