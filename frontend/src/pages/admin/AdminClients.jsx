import React,{useState}from'react'
import{useNavigate}from'react-router-dom'

// ── ALL CLIENTS ──────────────────────────────────────────
export function AdminClients(){
  const[tab,setTab]=useState('all')
  const[search,setSearch]=useState('')
  const[modal,setModal]=useState(null)
  const nav=useNavigate()

  const clients=[
    {id:1,name:'Ahmed Al Rashid',company:'Al Rashid Trading',plan:'starter',country:'🇦🇪',accountant:'Rashmi S.',mrr:750,payment:'overdue',joined:'Jan 2025',vat:'Pending',kyc:'✓',credits:{used:480,total:600}},
    {id:2,name:'Sara Mohammed',company:"Sara's Kitchen",plan:'growth',country:'🇦🇪',accountant:'Rashmi S.',mrr:1500,payment:'active',joined:'Feb 2025',vat:'✓ Filed',kyc:'✓',credits:{used:840,total:1200}},
    {id:3,name:'Mohammed Hassan',company:'Gulf Import FZE',plan:'pro',country:'🇦🇪',accountant:'Rashmi S.',mrr:2250,payment:'active',joined:'Jan 2025',vat:'✓ Filed',kyc:'✓',credits:{used:1200,total:1800}},
    {id:4,name:'Lara Petrov',company:'Petrov Consulting',plan:'growth',country:'🇬🇧',accountant:'Aisha M.',mrr:1500,payment:'active',joined:'Mar 2025',vat:'✓ Filed',kyc:'✓',credits:{used:600,total:1200}},
    {id:5,name:'James Anderson',company:'Anderson Tech Ltd',plan:'growth',country:'🇬🇧',accountant:'Aisha M.',mrr:1500,payment:'active',joined:'Apr 2025',vat:'✓ Filed',kyc:'✓',credits:{used:400,total:1200}},
    {id:6,name:'Fatima Al Amiri',company:'Amiri Clinic',plan:'pro',country:'🇦🇪',accountant:'Rashmi S.',mrr:2250,payment:'active',joined:'Feb 2025',vat:'✓ Filed',kyc:'✓',credits:{used:900,total:1800}},
    {id:7,name:'Nadia Khoury',company:'NK Beauty Lounge',plan:'starter',country:'🇦🇪',accountant:'Rashmi S.',mrr:750,payment:'active',joined:'Jun 2025',vat:'Not Reg',kyc:'Pending',credits:{used:45,total:600}},
    {id:8,name:'Rajan Joshi',company:'Freelance Consulting',plan:'starter',country:'🇦🇪',accountant:'Aisha M.',mrr:750,payment:'pending',joined:'May 2025',vat:'Not Reg',kyc:'Pending',credits:{used:200,total:600}},
  ]

  const planColor={starter:'badge-blue',growth:'badge-green',pro:'badge-gold'}
  const payColor={active:'badge-green',overdue:'badge-red',pending:'badge-orange',trial:'badge-grey'}

  const filtered=clients.filter(c=>{
    if(tab==='starter')return c.plan==='starter'
    if(tab==='growth')return c.plan==='growth'
    if(tab==='pro')return c.plan==='pro'
    if(tab==='uae')return c.country==='🇦🇪'
    if(tab==='uk')return c.country==='🇬🇧'
    return true
  }).filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.company.toLowerCase().includes(search.toLowerCase()))

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">👥 All Clients</div><div className="ph-sub">{clients.length} active clients · Full admin view</div></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setModal('add')}>+ Add Client</button>
        </div>
      </div>

      <div className="sg sg-5" style={{marginBottom:16}}>
        {[
          {v:'24',l:'Total Clients',bg:'var(--blue-lt)'},
          {v:'AED 17,250',l:'Total MRR',bg:'var(--gold-lt)'},
          {v:'10',l:'Starter',bg:'var(--soft)'},
          {v:'8',l:'Growth',bg:'var(--green-lt)'},
          {v:'6',l:'Pro',bg:'var(--purple-lt)'},
        ].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'👥💰📦🌱⭐'[i]}</div><div className="sc-val" style={{fontSize:i===1?16:28}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        {[['all','All (24)'],['starter','Starter (10)'],['growth','Growth (8)'],['pro','Pro (6)'],['uae','🇦🇪 UAE'],['uk','🇬🇧 UK']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="toolbar">
        <div className="fil">👩‍💼 Accountant ▾</div>
        <div className="fil">💳 Payment ▾</div>
        <div style={{flex:1}}/>
        <div className="srch">🔍 <input placeholder="Search clients..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Plan</th><th>Country</th><th>Accountant</th><th>MRR</th><th>Credits</th><th>Payment</th><th>VAT</th><th>KYC</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c.id}>
                  <td>
                    <div style={{fontWeight:600}}>{c.name}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{c.company}</div>
                  </td>
                  <td><span className={`badge ${planColor[c.plan]}`}>{c.plan}</span></td>
                  <td style={{fontSize:16}}>{c.country}</td>
                  <td style={{fontSize:12}}>{c.accountant}</td>
                  <td style={{fontWeight:700,color:'var(--green)'}}>AED {c.mrr.toLocaleString()}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div className="pb-track" style={{width:50}}><div className="pb-fill" style={{width:`${(c.credits.used/c.credits.total)*100}%`,background:(c.credits.used/c.credits.total)>0.9?'var(--red)':'var(--green)'}}/></div>
                      <span style={{fontSize:10,color:'var(--muted)'}}>{c.credits.used}/{c.credits.total}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${payColor[c.payment]}`}>{c.payment}</span></td>
                  <td><span className={`badge ${c.vat==='✓ Filed'?'badge-green':c.vat==='Not Reg'?'badge-red':'badge-orange'}`}>{c.vat}</span></td>
                  <td><span className={`badge ${c.kyc==='✓'?'badge-green':'badge-orange'}`}>{c.kyc}</span></td>
                  <td>
                    <div style={{display:'flex',gap:3}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="View">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Reassign" onClick={()=>setModal('reassign')}>🔄</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Upgrade" onClick={()=>setModal('upgrade')}>⬆</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>{filtered.length} of 24 clients · AED 17,250 MRR</div><div className="pag"><div className="pgb">‹</div><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">3</div><div className="pgb">›</div></div></div>
      </div>

      {modal==='add'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>+ Add New Client</h3>
          <div className="fg-row">
            <div className="fg"><label>First Name *</label><input placeholder="Ahmed"/></div>
            <div className="fg"><label>Last Name *</label><input placeholder="Al Rashid"/></div>
          </div>
          <div className="fg"><label>Company Name</label><input placeholder="Al Rashid Trading LLC"/></div>
          <div className="fg-row">
            <div className="fg"><label>Email *</label><input type="email" placeholder="ahmed@company.ae"/></div>
            <div className="fg"><label>WhatsApp *</label><input placeholder="+971 5X XXX XXXX"/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label>Plan *</label><select><option>Starter — AED 750/mo</option><option>Growth — AED 1,500/mo</option><option>Pro — AED 2,250/mo</option></select></div>
            <div className="fg"><label>Country *</label><select><option>🇦🇪 UAE</option><option>🇬🇧 UK</option></select></div>
          </div>
          <div className="fg"><label>Assign Accountant *</label><select><option>Rashmi Sharma (8 clients)</option><option>Aisha Malik (4 clients)</option></select></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>setModal(null)}>Add Client</button>
          </div>
        </div></div>
      )}
      {modal==='reassign'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>🔄 Reassign Client</h3>
          <div className="fg"><label>Client</label><select><option>Ahmed Al Rashid</option></select></div>
          <div className="fg"><label>Current Accountant</label><input value="Rashmi Sharma" readOnly style={{background:'var(--soft)'}}/></div>
          <div className="fg"><label>New Accountant *</label><select><option>Aisha Malik (4 clients — has capacity)</option><option>Rashmi Sharma (8 clients)</option></select></div>
          <div className="fg"><label>Reason</label><textarea placeholder="Reason for reassignment..." style={{minHeight:60,resize:'vertical'}}/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>setModal(null)}>Confirm Reassign</button>
          </div>
        </div></div>
      )}
      {modal==='upgrade'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>⬆ Upgrade / Downgrade Plan</h3>
          <div className="fg"><label>Client</label><select><option>Ahmed Al Rashid — Starter</option><option>Sara Mohammed — Growth</option></select></div>
          <div className="fg"><label>New Plan *</label><select><option>Starter — AED 750/mo (600 credits)</option><option>Growth — AED 1,500/mo (1,200 credits)</option><option>Pro — AED 2,250/mo (1,800 credits)</option></select></div>
          <div className="fg"><label>Effective</label><select><option>Next billing cycle (recommended)</option><option>Immediately</option></select></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>setModal(null)}>Confirm Change</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── KYC APPROVALS ──────────────────────────────────────────
export function AdminKYC(){
  const[tab,setTab]=useState('pending')
  const[modal,setModal]=useState(null)

  const pending=[
    {name:'Nadia Khoury',company:'NK Beauty Lounge',plan:'Starter',submitted:'Jun 13',docs:[{label:'Emirates ID (Front)',status:'uploaded'},{label:'Emirates ID (Back)',status:'uploaded'},{label:'Trade Licence',status:'uploaded'},{label:'Passport Copy',status:'missing'},{label:'Bank Statement',status:'missing'}]},
    {name:'Rajan Joshi',company:'Freelance Consulting',plan:'Starter',submitted:'Jun 9',docs:[{label:'Passport Copy',status:'uploaded'},{label:'Trade Licence',status:'uploaded'},{label:'Emirates ID',status:'missing'},{label:'Bank Statement (3mo)',status:'missing'}]},
    {name:'Khalid Al Mansoori',company:'KM Real Estate',plan:'Growth',submitted:'Jun 15',docs:[{label:'Emirates ID',status:'uploaded'},{label:'Trade Licence',status:'uploaded'},{label:'Passport',status:'uploaded'},{label:'Bank Statement',status:'uploaded'}]},
    {name:'Yasmin Al Farsi',company:'YF Fashion',plan:'Starter',submitted:'Jun 14',docs:[{label:'Emirates ID',status:'uploaded'},{label:'Trade Licence',status:'uploaded'},{label:'Passport',status:'uploaded'},{label:'Bank Statement',status:'uploaded'}]},
  ]

  const canApprove=(docs)=>docs.every(d=>d.status==='uploaded')

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🪪 KYC Approvals</div><div className="ph-sub">Review & approve client identity documents</div></div>
        <div className="tb-chip chip-red">● {pending.length} Awaiting Approval</div>
      </div>

      <div className="tabs">
        {[['pending',`⏳ Pending (${pending.length})`],['approved','✅ Approved (20)'],['rejected','❌ Rejected (1)']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {tab==='pending'&&pending.map((c,i)=>(
          <div key={i} className="card" style={{border:`2px solid ${canApprove(c.docs)?'var(--green)':'var(--orange)'}`}}>
            <div style={{padding:18}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:16}}>{c.name[0]}</div>
                  <div><div style={{fontSize:14,fontWeight:700}}>{c.name}</div><div style={{fontSize:11,color:'var(--muted)'}}>{c.company} · {c.plan}</div></div>
                </div>
                <span className={`badge ${canApprove(c.docs)?'badge-green':'badge-orange'}`}>{canApprove(c.docs)?'Ready':'Incomplete'}</span>
              </div>

              <div style={{background:'var(--soft)',borderRadius:8,padding:12,marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--muted)',marginBottom:8,textTransform:'uppercase',letterSpacing:.5}}>Documents</div>
                {c.docs.map((d,j)=>(
                  <div key={j} style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:12}}>
                    <span>{d.label}</span>
                    <span className={`badge ${d.status==='uploaded'?'badge-green':'badge-red'}`}>{d.status==='uploaded'?'✓ Uploaded':'Missing'}</span>
                  </div>
                ))}
              </div>

              <div style={{fontSize:11,color:'var(--muted)',marginBottom:10}}>Submitted {c.submitted}</div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:'center',opacity:canApprove(c.docs)?1:.4}} disabled={!canApprove(c.docs)} onClick={()=>alert(`✅ KYC Approved — ${c.name}`)}>✓ Approve KYC</button>
                <button className="btn btn-outline btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>setModal(c)}>📋 Request Docs</button>
              </div>
            </div>
          </div>
        ))}
        {tab==='approved'&&(
          <div className="card card-pad" style={{gridColumn:'1/-1'}}>
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--muted)'}}>
              <div style={{fontSize:32,marginBottom:8}}>✅</div>
              <div style={{fontWeight:600}}>20 clients fully KYC verified</div>
            </div>
          </div>
        )}
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>📋 Request More Documents</h3>
          <p>Send request to {modal.name} for missing documents</p>
          <div className="fg"><label>Missing Documents (select all that apply)</label>
            {['Emirates ID (Front)','Emirates ID (Back)','Passport Copy','Trade Licence','Bank Statement (3 months)'].map((d,i)=>(
              <label key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,marginBottom:6}}><input type="checkbox" defaultChecked={!modal.docs.find(x=>x.label===d||d.includes(x.label.split(' ')[0]))||modal.docs.find(x=>x.label.includes(d.split(' ')[0]))?.status==='missing'}/>{d}</label>
            ))}
          </div>
          <div className="fg"><label>Message to Client</label><textarea style={{minHeight:80,resize:'vertical'}} defaultValue={`Dear ${modal.name.split(' ')[0]}, we need a few more documents to complete your KYC verification. Please upload the items above at your earliest convenience. Thank you — Balans Team.`}/></div>
          <div className="fg"><label>Send Via</label>
            <div style={{display:'flex',gap:12,marginTop:4}}>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}><input type="checkbox" defaultChecked/>📧 Email</label>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}><input type="checkbox" defaultChecked/>💬 WhatsApp</label>
            </div>
          </div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);alert('✅ Request sent!')}}>Send Request</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── VAT DEADLINES ──────────────────────────────────────────
export function AdminVATDeadlines(){
  const[tab,setTab]=useState('urgent')

  const vatList=[
    {client:'Ahmed Al Rashid',company:'Al Rashid Trading',accountant:'Rashmi S.',plan:'Starter',period:'Q1 2025',due:'Jun 28, 2025',days:8,status:'not_started',trn:'100123456789003',country:'🇦🇪',urgent:true},
    {client:'Rajan Joshi',company:'Freelance Consulting',accountant:'Aisha M.',plan:'Starter',period:'Q1 2025',due:'Jun 28, 2025',days:8,status:'in_progress',trn:'100987654321001',country:'🇦🇪',urgent:true},
    {client:'Nadia Khoury',company:'NK Beauty Lounge',accountant:'Rashmi S.',plan:'Starter',period:'Q1 2025',due:'Jul 2, 2025',days:12,status:'not_started',trn:'Pending Reg',country:'🇦🇪',urgent:true},
    {client:'Sara Mohammed',company:"Sara's Kitchen",accountant:'Rashmi S.',plan:'Growth',period:'Q1 2025',due:'Jul 15, 2025',days:25,status:'filed',trn:'100234567890001',country:'🇦🇪',urgent:false},
    {client:'Mohammed Hassan',company:'Gulf Import FZE',accountant:'Rashmi S.',plan:'Pro',period:'Q1 2025',due:'Jul 15, 2025',days:25,status:'filed',trn:'100345678901002',country:'🇦🇪',urgent:false},
    {client:'Fatima Al Amiri',company:'Amiri Clinic',accountant:'Rashmi S.',plan:'Pro',period:'Q1 2025',due:'Jul 28, 2025',days:38,status:'filed',trn:'100456789012003',country:'🇦🇪',urgent:false},
    {client:'Lara Petrov',company:'Petrov Consulting',accountant:'Aisha M.',plan:'Growth',period:'Q2 2025',due:'Aug 28, 2025',days:69,status:'upcoming',trn:'100567890123004',country:'🇬🇧',urgent:false},
    {client:'James Anderson',company:'Anderson Tech Ltd',accountant:'Aisha M.',plan:'Growth',period:'Q2 2025',due:'Aug 28, 2025',days:69,status:'upcoming',trn:'100678901234005',country:'🇬🇧',urgent:false},
  ]

  const stColors={not_started:'badge-red',in_progress:'badge-orange',filed:'badge-green',upcoming:'badge-blue'}

  const filtered={
    urgent:vatList.filter(v=>v.urgent),
    month30:vatList.filter(v=>v.days<=30),
    month60:vatList.filter(v=>v.days<=60),
    all:vatList,
    filed:vatList.filter(v=>v.status==='filed'),
  }

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📅 VAT Deadlines</div><div className="ph-sub">UAE FTA quarterly filing schedule — all clients</div></div>
        <button className="btn btn-ghost btn-sm">⬇ Export Schedule</button>
      </div>

      <div style={{background:'var(--red-lt)',border:'1px solid #FCA5A5',borderRadius:10,padding:'12px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:18}}>🚨</span>
        <div><div style={{fontSize:13,fontWeight:700,color:'var(--red)'}}>3 clients have VAT returns due within 14 days</div><div style={{fontSize:12,color:'var(--red)',opacity:.8}}>Ahmed Al Rashid, Rajan Joshi, Nadia Khoury — action required immediately</div></div>
      </div>

      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'3',l:'Due in 14 Days',bg:'var(--red-lt)',tc:'t-down'},{v:'6',l:'Due in 30 Days',bg:'var(--orange-lt)',tc:'t-warn'},{v:'5',l:'Filed This Quarter',bg:'var(--green-lt)',tc:'t-up'},{v:'1',l:'Penalty Risk',bg:'var(--red-lt)',tc:'t-down'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'🚨📅✅⚠️'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="tabs">
        {[['urgent','🔴 Due in 14 Days (3)'],['month30','🟡 Next 30 Days (6)'],['month60','Next 60 Days'],['all','All Clients (24)'],['filed','✅ Filed']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Accountant</th><th>Plan</th><th>VAT Period</th><th>Due Date</th><th>Days Left</th><th>TRN</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {(filtered[tab]||vatList).map((v,i)=>(
                <tr key={i} style={{background:v.urgent&&v.status!=='filed'?'var(--red-xlt)':''}}>
                  <td>
                    <div style={{fontWeight:600}}>{v.client} {v.country}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{v.company}</div>
                  </td>
                  <td style={{fontSize:12}}>{v.accountant}</td>
                  <td><span className={`badge ${v.plan==='Pro'?'badge-gold':v.plan==='Growth'?'badge-green':'badge-blue'}`}>{v.plan}</span></td>
                  <td style={{fontSize:12}}>{v.period}</td>
                  <td style={{fontWeight:v.days<=14?700:400,color:v.days<=14&&v.status!=='filed'?'var(--red)':'inherit'}}>{v.due}</td>
                  <td><span className={`badge ${v.days<=14?'badge-red':v.days<=30?'badge-orange':'badge-green'}`}>{v.days} days</span></td>
                  <td style={{fontSize:11,color:'var(--muted)',fontFamily:'monospace'}}>{v.trn}</td>
                  <td><span className={`badge ${stColors[v.status]||'badge-grey'}`}>{v.status.replace('_',' ')}</span></td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Alert accountant">🔔</button>
                      {v.status!=='filed'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}}>+ Task</button>}
                      {v.status==='filed'&&<button className="btn btn-ghost btn-sm" style={{fontSize:11}}>👁 View</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>{(filtered[tab]||vatList).length} clients shown</div></div>
      </div>

      <div className="card" style={{marginTop:14,padding:18}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--red)',marginBottom:12}}>⚠️ FTA Penalty Risk Tracker</div>
        <div className="sg sg-3">
          {[{v:'3',l:'Late Filing Risk',sub:'AED 1,000 per client',bg:'var(--red-lt)',c:'var(--red)'},{v:'1',l:'Not VAT Registered',sub:'Registration overdue',bg:'var(--orange-lt)',c:'var(--orange)'},{v:'20',l:'Fully Compliant',sub:'No action needed',bg:'var(--green-lt)',c:'var(--green)'}].map((s,i)=>(
            <div key={i} style={{background:s.bg,borderRadius:10,padding:14,textAlign:'center'}}>
              <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div>
              <div style={{fontSize:12,fontWeight:600,margin:'4px 0'}}>{s.l}</div>
              <div style={{fontSize:11,color:s.c,opacity:.8}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CORPORATE TAX ──────────────────────────────────────────
export function AdminCorpTax(){
  const clients=[
    {client:'Mohammed Hassan',company:'Gulf Import FZE',accountant:'Rashmi S.',fyEnd:'Dec 31 2024',ctDue:'Sep 30 2025',days:107,taxable:true,registered:true,status:'in_prep'},
    {client:'Fatima Al Amiri',company:'Amiri Clinic',accountant:'Rashmi S.',fyEnd:'Dec 31 2024',ctDue:'Sep 30 2025',days:107,taxable:true,registered:true,status:'on_track'},
    {client:'Sara Mohammed',company:"Sara's Kitchen",accountant:'Rashmi S.',fyEnd:'Dec 31 2024',ctDue:'Sep 30 2025',days:107,taxable:false,registered:true,status:'relief'},
    {client:'Ahmed Al Rashid',company:'Al Rashid Trading',accountant:'Rashmi S.',fyEnd:'Dec 31 2024',ctDue:'Sep 30 2025',days:107,taxable:false,registered:false,status:'reg_needed'},
    {client:'Lara Petrov',company:'Petrov Consulting',accountant:'Aisha M.',fyEnd:'Mar 31 2025',ctDue:'Dec 31 2025',days:199,taxable:false,registered:false,status:'exempt'},
  ]
  const stColors={in_prep:'badge-orange',on_track:'badge-blue',relief:'badge-green',reg_needed:'badge-red',exempt:'badge-grey'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🏛 Corporate Tax</div><div className="ph-sub">UAE CT 9% — deadlines per client</div></div><button className="btn btn-ghost btn-sm">⬇ Export</button></div>

      <div style={{background:'var(--blue-lt)',border:'1px solid #93C5FD',borderRadius:10,padding:'12px 16px',marginBottom:14,fontSize:12,color:'var(--blue)'}}>
        ℹ️ UAE Corporate Tax effective June 2023. 9% on taxable income above AED 375,000. Annual return due 9 months after fiscal year end. Small Business Relief available under AED 3M revenue.
      </div>

      <div className="sg sg-4" style={{marginBottom:16}}>
        {[{v:'4',l:'Action Required',bg:'var(--red-lt)'},{v:'2',l:'Taxable (above AED 375K)',bg:'var(--orange-lt)'},{v:'2',l:'Small Business Relief',bg:'var(--green-lt)'},{v:'1',l:'Not Yet Registered',bg:'var(--red-lt)'}].map((s,i)=>(
          <div key={i} className="sc"><div className="sc-ic" style={{background:s.bg}}>{'⚠️💰✅📋'[i]}</div><div className="sc-val">{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Accountant</th><th>FY End</th><th>CT Return Due</th><th>Days Left</th><th>Taxable?</th><th>CT Registration</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {clients.map((c,i)=>(
                <tr key={i} style={{background:c.status==='reg_needed'?'var(--red-xlt)':''}}>
                  <td>
                    <div style={{fontWeight:600}}>{c.client}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{c.company}</div>
                  </td>
                  <td style={{fontSize:12}}>{c.accountant}</td>
                  <td style={{fontSize:12}}>{c.fyEnd}</td>
                  <td style={{fontSize:12,fontWeight:c.days<120?600:400}}>{c.ctDue}</td>
                  <td><span className={`badge ${c.days<120?'badge-orange':'badge-green'}`}>{c.days} days</span></td>
                  <td><span className={`badge ${c.taxable?'badge-red':'badge-grey'}`}>{c.taxable?'Yes — above AED 375K':'Small Business Relief'}</span></td>
                  <td><span className={`badge ${c.registered?'badge-green':c.status==='exempt'?'badge-grey':'badge-red'}`}>{c.registered?'✓ Registered':c.status==='exempt'?'Exempt':'Not Registered'}</span></td>
                  <td><span className={`badge ${stColors[c.status]}`}>{c.status.replace('_',' ')}</span></td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon">🔔</button>
                      {!c.registered&&c.status!=='exempt'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}}>+ Register</button>}
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
