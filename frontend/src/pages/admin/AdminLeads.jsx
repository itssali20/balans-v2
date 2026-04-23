import React,{useState}from'react'

const leads=[
  {id:1,name:'Khalid Al Mansoori',phone:'+971501234567',source:'instagram',rep:'Sara Al Nabi',status:'new',time:'8 min ago',timer:52,country:'🇦🇪'},
  {id:2,name:'Fatima Zahra',phone:'+971559876543',source:'facebook',rep:'Omar Hassan',status:'contacted',time:'1h ago',timer:null,country:'🇦🇪'},
  {id:3,name:'James Murphy',phone:'+447911123456',source:'lead_form',rep:'Khalil Rashid',status:'qualified',time:'2h ago',timer:null,country:'🇬🇧'},
  {id:4,name:'Aisha Malik',phone:'+971521234567',source:'whatsapp',rep:'Nour Al Amin',status:'new',time:'14 min ago',timer:46,country:'🇦🇪'},
  {id:5,name:'Mohammed Al Rashid',phone:'+971509998877',source:'google_sheet',rep:'Reem Saleh',status:'proposal',time:'3h ago',timer:null,country:'🇦🇪'},
  {id:6,name:'Priya Sharma',phone:'+971561234567',source:'instagram',rep:'Sara Al Nabi',status:'won',time:'Yesterday',timer:null,country:'🇦🇪'},
  {id:7,name:'Tom Wilson',phone:'+447700900123',source:'facebook',rep:'Omar Hassan',status:'lost',time:'Yesterday',timer:null,country:'🇬🇧'},
]
const srcColors={instagram:'var(--purple-lt)',facebook:'var(--blue-lt)',whatsapp:'var(--green-lt)',lead_form:'var(--gold-lt)',google_sheet:'var(--teal-lt)',other:'var(--soft)'}
const srcLabels={instagram:'📸 Instagram',facebook:'👥 Facebook',whatsapp:'💬 WhatsApp',lead_form:'📋 Lead Form',google_sheet:'📊 Google Sheet',other:'Other'}
const stColors={new:'badge-blue',contacted:'badge-orange',qualified:'badge-gold',proposal:'badge-purple',negotiation:'badge-orange',won:'badge-green',lost:'badge-grey'}

export default function AdminLeads(){
  const[tab,setTab]=useState('all')
  const[search,setSearch]=useState('')
  const filtered=leads.filter(l=>{
    if(tab==='new')return l.status==='new'
    if(tab==='active')return['contacted','qualified','proposal','negotiation'].includes(l.status)
    if(tab==='won')return l.status==='won'
    if(tab==='lost')return l.status==='lost'
    return true
  }).filter(l=>l.name.toLowerCase().includes(search.toLowerCase())||l.rep.toLowerCase().includes(search.toLowerCase()))

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">📥 All Leads</div><div className="ph-sub">All incoming leads across all sources and sales reps</div></div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>alert('Syncing Google Sheet...')}>🔄 Sync Google Sheet</button>
          <button className="btn btn-primary btn-sm" onClick={()=>alert('Add lead modal')}>+ Add Lead</button>
        </div>
      </div>

      {/* Source breakdown */}
      <div className="sg sg-5" style={{marginBottom:16}}>
        {[
          {src:'instagram',count:18,conv:11,rate:'61%'},
          {src:'facebook',count:14,conv:8,rate:'57%'},
          {src:'whatsapp',count:22,conv:15,rate:'68%'},
          {src:'lead_form',count:8,conv:4,rate:'50%'},
          {src:'google_sheet',count:12,conv:6,rate:'50%'},
        ].map((s,i)=>(
          <div key={i} className="sc" style={{cursor:'pointer'}} onClick={()=>setTab(s.src)}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--muted)',marginBottom:6,textTransform:'uppercase',letterSpacing:.5}}>{srcLabels[s.src]}</div>
            <div className="sc-val" style={{fontSize:22}}>{s.count}</div>
            <div className="sc-lbl">Leads · {s.conv} converted</div>
            <div className="sc-trend t-up">{s.rate} conversion</div>
          </div>
        ))}
      </div>

      {/* 1-hour alerts */}
      {leads.filter(l=>l.timer&&l.timer<30).length>0&&(
        <div style={{background:'var(--red-lt)',border:'1px solid #FCA5A5',borderRadius:10,padding:'12px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:18}}>🚨</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:'var(--red)'}}>1-Hour Rule Warning</div><div style={{fontSize:12,color:'var(--red)',opacity:.8}}>Aisha Malik assigned to Nour — only 46 min remaining to contact</div></div>
          <button className="btn btn-danger btn-sm">View Lead →</button>
        </div>
      )}

      <div className="tabs">
        {[['all',`All (${leads.length})`],['new','🆕 New'],['active','🔵 Active'],['won','✅ Won'],['lost','❌ Lost']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="toolbar">
        <div className="fil">📸 Source ▾</div>
        <div className="fil">👤 Rep ▾</div>
        <div className="fil">🌍 Country ▾</div>
        <div style={{flex:1}}/>
        <div className="srch">🔍 <input placeholder="Search leads..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Lead</th><th>Source</th><th>Assigned To</th><th>Status</th><th>1-Hr Timer</th><th>Time</th><th>Country</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(l=>(
                <tr key={l.id} style={{background:l.timer&&l.timer<30?'var(--red-xlt)':''}}>
                  <td>
                    <div style={{fontWeight:600}}>{l.name}</div>
                    <div style={{fontSize:11,color:'var(--muted)'}}>{l.phone}</div>
                  </td>
                  <td><span className="badge" style={{background:srcColors[l.source],color:'var(--text)'}}>{srcLabels[l.source]}</span></td>
                  <td style={{fontSize:12}}>{l.rep}</td>
                  <td><span className={`badge ${stColors[l.status]}`}>{l.status}</span></td>
                  <td>
                    {l.timer?(
                      <span style={{fontWeight:700,color:l.timer<30?'var(--red)':'var(--orange)',fontSize:13}}>⏱ {l.timer} min left</span>
                    ):<span style={{color:'var(--muted)',fontSize:12}}>—</span>}
                  </td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>{l.time}</td>
                  <td style={{fontSize:16}}>{l.country}</td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-sm btn-icon" title="View">👁</button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Reassign">🔄</button>
                      {l.status==='won'&&<button className="btn btn-primary btn-sm" style={{fontSize:11}}>→ Convert</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tf"><div>{filtered.length} leads shown</div><div className="pag"><div className="pgb">‹</div><div className="pgb active">1</div><div className="pgb">2</div><div className="pgb">›</div></div></div>
      </div>
    </div>
  )
}
