import React from'react'
import{useNavigate}from'react-router-dom'
import{BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,LineChart,Line}from'recharts'

const mrrData=[{m:'Jan',mrr:8250},{m:'Feb',mrr:10500},{m:'Mar',mrr:11250},{m:'Apr',mrr:13500},{m:'May',mrr:15000},{m:'Jun',mrr:17250}]
const leadData=[{d:'Mon',leads:8},{d:'Tue',leads:12},{d:'Wed',leads:6},{d:'Thu',leads:15},{d:'Fri',leads:10},{d:'Sat',leads:7}]

export default function AdminDashboard(){
  const nav=useNavigate()
  return(
    <div>
      {/* Stats */}
      <div className="sg sg-5" style={{marginBottom:16}}>
        {[
          {icon:'💰',bg:'var(--gold-lt)',val:'17,250',lbl:'MRR (AED)',trend:'+AED 2,250',tc:'t-up'},
          {icon:'👥',bg:'var(--blue-lt)',val:'24',lbl:'Active Clients',trend:'+3 this month',tc:'t-up'},
          {icon:'📥',bg:'var(--green-lt)',val:'47',lbl:'Leads Today',trend:'12 converted',tc:'t-up'},
          {icon:'🎯',bg:'var(--purple-lt)',val:'59%',lbl:'Conversion Rate',trend:'↑ 4% vs last month',tc:'t-up'},
          {icon:'🔔',bg:'var(--orange-lt)',val:'8',lbl:'Pending Alerts',trend:'Action needed',tc:'t-warn'},
        ].map((s,i)=>(
          <div key={i} className="sc">
            <div className="sc-ic" style={{background:s.bg}}>{s.icon}</div>
            <div className="sc-val">{s.val}</div>
            <div className="sc-lbl">{s.lbl}</div>
            <div className={`sc-trend ${s.tc}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16,marginBottom:16}}>
        {/* MRR Chart */}
        <div className="card">
          <div className="card-head"><div className="card-title">📈 MRR Growth 2025</div><span className="badge badge-green">+109% YTD</span></div>
          <div style={{padding:'16px 18px'}}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={mrrData}>
                <XAxis dataKey="m" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`}/>
                <Tooltip formatter={v=>[`AED ${v.toLocaleString()}`,'']} contentStyle={{fontSize:12,borderRadius:8}}/>
                <Line type="monotone" dataKey="mrr" stroke="var(--red)" strokeWidth={2.5} dot={{fill:'var(--red)',r:4}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="card-head"><div className="card-title">⚠️ Urgent Alerts</div><span className="badge badge-red">8 active</span></div>
          <div style={{padding:'0 4px'}}>
            {[
              {icon:'⏰',color:'var(--red-lt)',msg:'Omar — lead not contacted 45 min',tag:'Lead Rule',tc:'badge-red',path:'/admin/leads'},
              {icon:'💳',color:'var(--red-lt)',msg:'Rajan Joshi payment failed',tag:'Finance',tc:'badge-red',path:'/admin/transactions'},
              {icon:'📅',color:'var(--orange-lt)',msg:'Ahmed Al Rashid VAT due 8 days',tag:'Compliance',tc:'badge-orange',path:'/admin/vat-deadlines'},
              {icon:'🪙',color:'var(--orange-lt)',msg:'Nadia Khoury — 45 credits left',tag:'Credits',tc:'badge-orange',path:'/admin/clients'},
              {icon:'✅',color:'var(--red-lt)',msg:'VAT Filing task overdue 5 days',tag:'Task',tc:'badge-red',path:'/admin/all-tasks'},
            ].map((a,i)=>(
              <div key={i} onClick={()=>nav(a.path)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderBottom:'1px solid var(--grey2)',cursor:'pointer',background:'var(--white)',transition:'.2s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--red-xlt)'}
                onMouseLeave={e=>e.currentTarget.style.background='var(--white)'}>
                <div style={{width:30,height:30,borderRadius:8,background:a.color,display:'grid',placeItems:'center',fontSize:14,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.msg}</div></div>
                <span className={`badge ${a.tc}`}>{a.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 320px',gap:16}}>
        {/* Leads chart */}
        <div className="card">
          <div className="card-head"><div className="card-title">📥 Leads This Week</div><span className="card-link" onClick={()=>nav('/admin/leads')}>View all →</span></div>
          <div style={{padding:'16px 18px'}}>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={leadData} barSize={24}>
                <XAxis dataKey="d" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
                <Bar dataKey="leads" fill="var(--red)" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:12}}>
              {[{v:'58',l:'Total',c:'var(--text)'},{v:'34',l:'Converted',c:'var(--green)'},{v:'59%',l:'Conv. Rate',c:'var(--gold)'}].map((s,i)=>(
                <div key={i} style={{textAlign:'center',padding:'8px',background:'var(--soft)',borderRadius:8}}>
                  <div style={{fontSize:18,fontWeight:700,color:s.c,fontFamily:'Cormorant Garamond,serif'}}>{s.v}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales leaderboard */}
        <div className="card">
          <div className="card-head"><div className="card-title">🏆 Sales Leaderboard — June</div><span className="card-link" onClick={()=>nav('/admin/targets')}>Details →</span></div>
          <div style={{padding:'0 4px'}}>
            {[
              {rank:'🥇',name:'Sara Al Nabi',conv:15,target:20,pct:75,color:'var(--gold)'},
              {rank:'🥈',name:'Khalil Rashid',conv:13,target:20,pct:65,color:'var(--blue)'},
              {rank:'🥉',name:'Omar Hassan',conv:12,target:20,pct:60,color:'var(--green)'},
              {rank:'4',name:'Nour Al Amin',conv:9,target:20,pct:45,color:'var(--orange)'},
              {rank:'5',name:'Reem Saleh',conv:7,target:20,pct:35,color:'var(--red)'},
            ].map((r,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderBottom:i<4?'1px solid var(--grey2)':'none'}}>
                <div style={{fontSize:16,width:24,textAlign:'center'}}>{r.rank}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{r.name}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div className="pb-track" style={{flex:1}}><div className="pb-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
                    <span style={{fontSize:11,fontWeight:700,color:r.color,whiteSpace:'nowrap'}}>{r.conv}/20</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live team + quick actions */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div className="card-head"><div className="card-title">🟢 Live Team</div><span className="card-link" onClick={()=>nav('/admin/activity')}>Full log →</span></div>
            <div style={{padding:'0 4px'}}>
              {[
                {name:'Rashmi Sharma',role:'Accountant',status:'online',time:'4h 22m'},
                {name:'Sara Al Nabi',role:'Sales',status:'online',time:'3h 45m'},
                {name:'Omar Hassan',role:'Sales',status:'online',time:'2h 15m'},
                {name:'Khalil Rashid',role:'Sales',status:'away',time:'Away 12m'},
                {name:'Nour Al Amin',role:'Sales',status:'offline',time:'Offline'},
              ].map((m,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 14px',borderBottom:i<4?'1px solid var(--grey2)':'none'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',flexShrink:0,background:m.status==='online'?'var(--green)':m.status==='away'?'var(--orange)':'var(--grey2)'}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</div>
                    <div style={{fontSize:10,color:'var(--muted)'}}>{m.role} · {m.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-pad">
            <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>Quick Actions</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[
                {label:'+ Add Client',path:'/admin/clients',cls:'btn-primary'},
                {label:'Assign Task',path:'/admin/all-tasks',cls:'btn-gold'},
                {label:'Run Payroll',path:'/admin/payroll',cls:'btn-ghost'},
                {label:'Send Email',path:'/admin/email-centre',cls:'btn-ghost'},
              ].map((a,i)=>(
                <button key={i} className={`btn btn-sm ${a.cls}`} style={{justifyContent:'center'}} onClick={()=>nav(a.path)}>{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
