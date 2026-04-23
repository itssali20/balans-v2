import React,{useState}from'react'
import toast from'react-hot-toast'
import{BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer}from'recharts'

// ── SALES TARGETS ──────────────────────────────────────────
export function AdminSalesTargets(){
  const[modal,setModal]=useState(null)

  const reps=[
    {name:'Sara Al Nabi',conv:15,target:20,leads:28,rate:54,commission:3000,bonus:0,effort:92,color:'var(--gold)'},
    {name:'Khalil Rashid',conv:13,target:20,leads:22,rate:59,commission:2600,bonus:0,effort:83,color:'var(--blue)'},
    {name:'Omar Hassan',conv:12,target:20,leads:24,rate:50,commission:2400,bonus:0,effort:78,color:'var(--green)'},
    {name:'Nour Al Amin',conv:9,target:20,leads:18,rate:50,commission:1800,bonus:0,effort:61,color:'var(--orange)'},
    {name:'Reem Saleh',conv:7,target:20,leads:15,rate:47,commission:1400,bonus:0,effort:48,color:'var(--red)'},
  ]

  const monthData=[
    {m:'Jan',Sara:8,Khalil:7,Omar:6,Nour:5,Reem:4},
    {m:'Feb',Sara:10,Khalil:9,Omar:8,Nour:7,Reem:6},
    {m:'Mar',Sara:11,Khalil:10,Omar:9,Nour:8,Reem:7},
    {m:'Apr',Sara:11,Khalil:10,Omar:10,Nour:9,Reem:8},
    {m:'May',Sara:14,Khalil:11,Omar:12,Nour:10,Reem:8},
    {m:'Jun',Sara:15,Khalil:13,Omar:12,Nour:9,Reem:7},
  ]

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🎯 Sales Targets</div><div className="ph-sub">Monthly targets, leaderboard & performance — June 2025</div></div>
        <button className="btn btn-primary btn-sm" onClick={()=>setModal('set')}>⚙️ Set Targets</button>
      </div>

      {/* Leaderboard hero */}
      <div className="dark-hero" style={{marginBottom:16}}>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,.4)',letterSpacing:1,textTransform:'uppercase',marginBottom:12}}>🏆 June Leaderboard</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
            {reps.map((r,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.06)',border:`1px solid ${i===0?'rgba(201,146,26,.5)':'rgba(255,255,255,.08)'}`,borderRadius:12,padding:'14px',textAlign:'center'}}>
                <div style={{fontSize:i===0?28:20,marginBottom:4}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
                <div style={{fontSize:12,fontWeight:700,color:'#fff',marginBottom:4}}>{r.name.split(' ')[0]}</div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:900,color:r.color,lineHeight:1}}>{r.conv}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,.35)',marginTop:2}}>of {r.target}</div>
                <div style={{marginTop:8,height:4,background:'rgba(255,255,255,.1)',borderRadius:2,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${(r.conv/r.target)*100}%`,background:r.color,borderRadius:2}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Month-on-month chart */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-head"><div className="card-title">📈 Month-on-Month Conversions</div></div>
        <div style={{padding:'16px 18px'}}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthData} barSize={8}>
              <XAxis dataKey="m" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              {reps.map(r=>(
                <Bar key={r.name} dataKey={r.name.split(' ')[0]} fill={r.color} radius={[2,2,0,0]}/>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual target cards */}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {reps.map((r,i)=>(
          <div key={i} className="card" style={{padding:20,borderLeft:`4px solid ${r.color}`}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:14}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:r.color,display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:16,flexShrink:0}}>{r.name[0]}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>{r.name}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>Sales Executive · {r.leads} leads this month</div>
                </div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                <span className={`badge ${r.conv/r.target>=0.75?'badge-green':r.conv/r.target>=0.5?'badge-orange':'badge-red'}`}>
                  {r.conv/r.target>=0.75?'On Track':r.conv/r.target>=0.5?'Needs Push':'Below Target'}
                </span>
                <button className="btn btn-ghost btn-sm" onClick={()=>setModal({...r,type:'edit'})}>⚙️ Edit Target</button>
              </div>
            </div>

            <div className="sg sg-5" style={{marginBottom:14}}>
              {[
                {v:r.conv,l:'Conversions',c:r.color},
                {v:r.target,l:'Target',c:'var(--muted)'},
                {v:`${Math.round(r.conv/r.target*100)}%`,l:'Progress',c:r.color},
                {v:`${r.rate}%`,l:'Conv. Rate',c:'var(--blue)'},
                {v:`AED ${r.commission.toLocaleString()}`,l:'Commission',c:'var(--gold)'},
              ].map((s,j)=>(
                <div key={j} style={{background:'var(--soft)',borderRadius:8,padding:'10px',textAlign:'center'}}>
                  <div style={{fontSize:16,fontWeight:700,color:s.c,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div>
                  <div style={{fontSize:9,color:'var(--muted)',marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:5}}>
                <span>Monthly Progress</span>
                <span style={{fontWeight:700,color:r.color}}>{r.conv}/{r.target} ({Math.round(r.conv/r.target*100)}%)</span>
              </div>
              <div className="pb-track" style={{height:8}}>
                <div className="pb-fill" style={{width:`${(r.conv/r.target)*100}%`,background:r.color}}/>
              </div>
            </div>

            {r.conv/r.target<0.5&&(
              <div style={{marginTop:10,background:'var(--red-lt)',borderRadius:8,padding:'8px 12px',fontSize:12,color:'var(--red)',fontWeight:500}}>
                ⚠️ {r.name.split(' ')[0]} is at {Math.round(r.conv/r.target*100)}% with {30-new Date().getDate()} days remaining. Consider a coaching session.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Set Targets Modal */}
      {modal==='set'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>⚙️ Set Monthly Targets</h3>
          <div style={{fontSize:13,color:'var(--muted)',marginBottom:16}}>Set conversion targets for July 2025</div>
          {reps.map((r,i)=>(
            <div key={i} className="fg-row" style={{marginBottom:8}}>
              <div className="fg" style={{marginBottom:0}}><label>{r.name}</label><input type="number" defaultValue={r.target}/></div>
              <div className="fg" style={{marginBottom:0}}><label>Bonus multiplier ×</label><input type="number" defaultValue={1} step={0.1} min={1} max={3}/></div>
            </div>
          ))}
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);toast.success('Targets set for July! Team notified.')}}>Set Targets</button>
          </div>
        </div></div>
      )}

      {/* Edit Individual Target Modal */}
      {modal?.type==='edit'&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(null)}>×</button>
          <h3>✏ Edit — {modal.name}</h3>
          <div className="fg"><label>Monthly Target</label><input type="number" defaultValue={modal.target}/></div>
          <div className="fg"><label>After-Hours Bonus Multiplier</label><input type="number" defaultValue={1.5} step={0.1}/></div>
          <div className="fg"><label>Fine Per 1-Hour Breach (AED)</label><input type="number" defaultValue={0}/></div>
          <div className="fg"><label>Notes</label><textarea style={{minHeight:60,resize:'vertical'}} placeholder="Any notes about this rep's targets..."/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(null);toast.success('Target updated!')}}>Save Changes</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── REASSIGN CLIENTS ──────────────────────────────────────────
export function AdminReassign(){
  const[from,setFrom]=useState('')
  const[to,setTo]=useState('')
  const[selected,setSelected]=useState([])
  const[done,setDone]=useState(false)

  const accountants=[
    {id:'rashmi',name:'Rashmi Sharma',clients:8,max:10,capacity:'80%'},
    {id:'aisha',name:'Aisha Malik',clients:4,max:10,capacity:'40%'},
  ]

  const clients={
    rashmi:[
      {id:1,name:'Ahmed Al Rashid',company:'Al Rashid Trading',plan:'Starter'},
      {id:2,name:'Sara Mohammed',company:"Sara's Kitchen",plan:'Growth'},
      {id:3,name:'Mohammed Hassan',company:'Gulf Import FZE',plan:'Pro'},
      {id:4,name:'Fatima Al Amiri',company:'Amiri Clinic',plan:'Pro'},
      {id:5,name:'Nadia Khoury',company:'NK Beauty Lounge',plan:'Starter'},
      {id:6,name:'Khalid Al M.',company:'KM Real Estate',plan:'Growth'},
      {id:7,name:'Yasmin Al F.',company:'YF Fashion',plan:'Starter'},
      {id:8,name:'Hanan Saleh',company:'HS Boutique',plan:'Growth'},
    ],
    aisha:[
      {id:9,name:'Lara Petrov',company:'Petrov Consulting',plan:'Growth'},
      {id:10,name:'James Anderson',company:'Anderson Tech Ltd',plan:'Growth'},
      {id:11,name:'Rajan Joshi',company:'Freelance Consulting',plan:'Starter'},
      {id:12,name:'Fiona Kelly',company:'FK Design',plan:'Starter'},
    ],
  }

  const toggle=(id)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])

  const planColor={Starter:'badge-blue',Growth:'badge-green',Pro:'badge-gold'}

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🔄 Reassign Clients</div><div className="ph-sub">Move clients between accountants</div></div></div>

      {done?(
        <div style={{background:'var(--green-lt)',border:'1px solid #86EFAC',borderRadius:12,padding:'24px',textAlign:'center'}}>
          <div style={{fontSize:32,marginBottom:8}}>✅</div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>Reassignment Complete</div>
          <div style={{fontSize:13,color:'var(--muted)',marginBottom:16}}>{selected.length} client{selected.length!==1?'s':''} reassigned to {accountants.find(a=>a.id===to)?.name}</div>
          <button className="btn btn-primary btn-sm" onClick={()=>{setDone(false);setSelected([]);setFrom('');setTo('')}}>Reassign More</button>
        </div>
      ):(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {/* Step 1 - From */}
          <div className="card" style={{padding:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:24,height:24,borderRadius:'50%',background:'var(--red)',display:'grid',placeItems:'center',color:'#fff',fontSize:12,fontWeight:700}}>1</div>
              Select Source Accountant
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
              {accountants.map(a=>(
                <div key={a.id} onClick={()=>{setFrom(a.id);setSelected([])}} style={{padding:'12px 14px',borderRadius:10,border:`2px solid ${from===a.id?'var(--red)':'var(--grey2)'}`,cursor:'pointer',background:from===a.id?'var(--red-xlt)':'var(--white)',transition:'.2s'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{fontWeight:600,fontSize:13}}>{a.name}</div>
                    <span className={`badge ${a.clients>=8?'badge-orange':'badge-green'}`}>{a.capacity}</span>
                  </div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{a.clients}/{a.max} clients</div>
                </div>
              ))}
            </div>

            {from&&(
              <>
                <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>Select clients to move:</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {(clients[from]||[]).map(c=>(
                    <label key={c.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8,border:`1.5px solid ${selected.includes(c.id)?'var(--red)':'var(--grey2)'}`,cursor:'pointer',background:selected.includes(c.id)?'var(--red-xlt)':'var(--white)',transition:'.2s'}}>
                      <input type="checkbox" checked={selected.includes(c.id)} onChange={()=>toggle(c.id)}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600}}>{c.name}</div>
                        <div style={{fontSize:11,color:'var(--muted)'}}>{c.company}</div>
                      </div>
                      <span className={`badge ${planColor[c.plan]}`}>{c.plan}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Step 2 - To */}
          <div className="card" style={{padding:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14,display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:24,height:24,borderRadius:'50%',background:'var(--green)',display:'grid',placeItems:'center',color:'#fff',fontSize:12,fontWeight:700}}>2</div>
              Select Destination Accountant
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
              {accountants.filter(a=>a.id!==from).map(a=>(
                <div key={a.id} onClick={()=>setTo(a.id)} style={{padding:'12px 14px',borderRadius:10,border:`2px solid ${to===a.id?'var(--green)':'var(--grey2)'}`,cursor:'pointer',background:to===a.id?'var(--green-lt)':'var(--white)',transition:'.2s'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{fontWeight:600,fontSize:13}}>{a.name}</div>
                    <span className="badge badge-green">{a.capacity} capacity</span>
                  </div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{a.clients}/{a.max} clients · Can take {a.max-a.clients} more</div>
                </div>
              ))}
            </div>

            {selected.length>0&&to&&(
              <div style={{background:'var(--soft)',borderRadius:10,padding:'14px',marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:8}}>Summary:</div>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:4}}>Moving <strong style={{color:'var(--text)'}}>{selected.length} client{selected.length!==1?'s':''}</strong></div>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:4}}>From: <strong style={{color:'var(--text)'}}>{accountants.find(a=>a.id===from)?.name}</strong></div>
                <div style={{fontSize:12,color:'var(--muted)'}}>To: <strong style={{color:'var(--text)'}}>{accountants.find(a=>a.id===to)?.name}</strong></div>
              </div>
            )}

            <div className="fg"><label>Reason for Reassignment</label>
              <select>
                <option>Workload rebalancing</option>
                <option>Accountant specialisation</option>
                <option>Client request</option>
                <option>Accountant leaving</option>
                <option>Other</option>
              </select>
            </div>
            <div className="fg"><label>Notes (optional)</label><textarea style={{minHeight:60,resize:'vertical'}} placeholder="Any notes..."/></div>

            <button
              className="btn btn-primary"
              style={{width:'100%',justifyContent:'center',opacity:selected.length>0&&to?1:.4}}
              disabled={!selected.length||!to}
              onClick={()=>{setDone(true);toast.success(`${selected.length} client${selected.length!==1?'s':''} reassigned!`)}}
            >
              🔄 Confirm Reassignment ({selected.length} client{selected.length!==1?'s':''})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
