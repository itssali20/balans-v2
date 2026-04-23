import React,{useState}from'react'
import toast from'react-hot-toast'

// ── ANNOUNCEMENTS ──────────────────────────────────────────
export function AdminAnnouncements(){
  const[modal,setModal]=useState(false)
  const history=[
    {title:'🎯 June Targets — Mid-Month Review',target:'All Team',channels:'Email + WhatsApp',date:'Jun 15',recipients:8,opened:7},
    {title:'🚨 Urgent — VAT Portal Maintenance Jun 12',target:'Accountants',channels:'Email + WhatsApp',date:'Jun 11',recipients:2,opened:2},
    {title:'💰 Commission Update — Bonus Tiers Revised',target:'Sales Team',channels:'WhatsApp only',date:'Jun 5',recipients:5,opened:5},
    {title:'🎉 New Client Milestone — 20 Clients!',target:'All Team',channels:'Email + WhatsApp',date:'May 28',recipients:8,opened:8},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">📢 Announcements</div><div className="ph-sub">Broadcast messages to your team via email & WhatsApp</div></div><button className="btn btn-primary btn-sm" onClick={()=>setModal(true)}>+ New Announcement</button></div>

      <div className="card" style={{padding:22,marginBottom:16,border:'2px solid var(--red-lt)'}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>📝 Quick Broadcast</div>
        <div className="fg-row">
          <div className="fg"><label>Send To *</label><select><option>📢 Entire Team (8 members)</option><option>👩‍💼 All Accountants</option><option>📈 All Sales Reps</option><option>👤 Individual Member</option></select></div>
          <div className="fg"><label>Send Via *</label>
            <div style={{display:'flex',gap:14,marginTop:8}}>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}><input type="checkbox" defaultChecked/>📧 Email</label>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}><input type="checkbox" defaultChecked/>💬 WhatsApp</label>
              <label style={{display:'flex',alignItems:'center',gap:6,fontSize:13}}><input type="checkbox"/>🔔 Portal</label>
            </div>
          </div>
        </div>
        <div className="fg"><label>Subject / Title *</label><input placeholder="e.g. June targets update, Urgent: FTA deadline..."/></div>
        <div className="fg"><label>Message *</label><textarea style={{minHeight:100,resize:'vertical'}} placeholder="Write your announcement here..."/></div>
        <div className="fg"><label>Schedule</label><select><option>Send immediately</option><option>Tomorrow morning 9:00 AM</option><option>Custom time...</option></select></div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-primary btn-sm" onClick={()=>toast.success('✅ Announcement sent to all recipients!')}>📢 Send Now</button>
          <button className="btn btn-ghost btn-sm">👁 Preview</button>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><div className="card-title">📋 Announcement History</div><span style={{fontSize:11,color:'var(--muted)'}}>Last 30 days</span></div>
        {history.map((h,i)=>(
          <div key={i} style={{padding:'14px 18px',borderBottom:i<history.length-1?'1px solid var(--grey2)':'none'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:10,marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:700}}>{h.title}</div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexShrink:0}}>
                <span className="badge badge-blue">{h.target}</span>
                <span className="badge badge-green">✓ Sent</span>
              </div>
            </div>
            <div style={{fontSize:11,color:'var(--muted)'}}>Sent {h.date} · {h.channels} · {h.recipients} recipients · {h.opened}/{h.recipients} opened</div>
          </div>
        ))}
      </div>

      {modal&&(
        <div className="mo"><div className="md">
          <button className="md-x" onClick={()=>setModal(false)}>×</button>
          <h3>📢 New Announcement</h3>
          <div className="fg"><label>Send To</label><select><option>📢 Entire Team</option><option>👩‍💼 All Accountants</option><option>📈 All Sales Reps</option></select></div>
          <div className="fg"><label>Subject *</label><input placeholder="Announcement title..."/></div>
          <div className="fg"><label>Message *</label><textarea style={{minHeight:80,resize:'vertical'}} placeholder="Write your announcement..."/></div>
          <div className="md-acts">
            <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{setModal(false);toast.success('Sent!')}}>Send Now</button>
          </div>
        </div></div>
      )}
    </div>
  )
}

// ── EMAIL CENTRE ──────────────────────────────────────────
export function AdminEmailCentre(){
  const[tab,setTab]=useState('compose')
  const campaigns=[
    {subject:'🎉 Introducing Pro Plan — Get More Credits',target:'All Clients',status:'sent',sent:'Jun 10',total:24,opened:19,clicked:8},
    {subject:'📅 VAT Season Reminder — File Before Deadline',target:'UAE Clients',status:'sent',sent:'Jun 5',total:18,opened:14,clicked:6},
    {subject:'💰 Upgrade to Growth — Limited Offer',target:'Starter Clients',status:'scheduled',sent:'Jun 20',total:10,opened:0,clicked:0},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">✉️ Email Centre</div><div className="ph-sub">Send campaigns to clients — full open & click tracking</div></div></div>
      <div className="tabs">
        {[['compose','✍ Compose'],['campaigns','📊 Campaigns'],['templates','📋 Templates']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {tab==='compose'&&(
        <div className="card" style={{padding:24}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:16}}>New Email Campaign</div>
          <div className="fg-row">
            <div className="fg"><label>Send To *</label><select><option>All Clients (24)</option><option>Starter Plan (10)</option><option>Growth Plan (8)</option><option>Pro Plan (6)</option><option>🇦🇪 UAE Clients</option><option>🇬🇧 UK Clients</option><option>Individual Client...</option></select></div>
            <div className="fg"><label>Schedule</label><select><option>Send immediately</option><option>Schedule for later</option></select></div>
          </div>
          <div className="fg"><label>Subject Line *</label><input placeholder="Your monthly report is ready — Balans"/></div>
          <div className="fg"><label>From Name</label><input defaultValue="Musa — Balans Accounting"/></div>
          <div className="fg"><label>Email Body *</label><textarea style={{minHeight:200,resize:'vertical'}} defaultValue={`Hi {{name}},

I hope your business is going well!

I wanted to reach out personally to let you know...

Best regards,
Musa
Balans Accounting & Bookkeeping
+971 52 740 4854`}/></div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:14}}>💡 Use {'{{name}}'} to personalise with client name</div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Campaign sent to 24 clients!')}>✉️ Send Campaign</button>
            <button className="btn btn-ghost btn-sm">💾 Save Draft</button>
            <button className="btn btn-ghost btn-sm">👁 Preview</button>
          </div>
        </div>
      )}

      {tab==='campaigns'&&(
        <div className="card">
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Subject</th><th>Target</th><th>Date</th><th>Sent</th><th>Opened</th><th>Open Rate</th><th>Clicked</th><th>Status</th></tr></thead>
              <tbody>
                {campaigns.map((c,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{c.subject}</td>
                    <td style={{fontSize:12}}>{c.target}</td>
                    <td style={{fontSize:12,color:'var(--muted)'}}>{c.sent}</td>
                    <td style={{fontSize:12}}>{c.total}</td>
                    <td style={{fontSize:12}}>{c.opened}</td>
                    <td style={{fontWeight:700,color:c.total>0?(c.opened/c.total)>0.6?'var(--green)':'var(--orange)':'var(--muted)'}}>{c.total>0?`${Math.round((c.opened/c.total)*100)}%`:'—'}</td>
                    <td style={{fontSize:12}}>{c.clicked}</td>
                    <td><span className={`badge ${c.status==='sent'?'badge-green':'badge-orange'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='templates'&&(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {['Welcome Email','Monthly Report Ready','Invoice Sent','Low Credits Warning','VAT Deadline Reminder','Upgrade Offer'].map((t,i)=>(
            <div key={i} className="card card-pad" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600,fontSize:13}}>{t}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>System template</div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-ghost btn-sm">✏ Edit</button>
                <button className="btn btn-primary btn-sm">Use →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── INTEGRATIONS ──────────────────────────────────────────
export function AdminIntegrations(){
  const integrations=[
    {name:'Stripe',desc:'Payments & subscriptions',icon:'💳',color:'#635BFF',status:'connected',detail:'Live mode · 24 active subscriptions · Last sync 5 min ago'},
    {name:'WhatsApp Business API',desc:'Automated messages & broadcasts',icon:'💬',color:'#25D366',status:'connected',detail:'Active · +971527404854 · 312 messages sent this month'},
    {name:'Calendly',desc:'Accountant meeting bookings',icon:'📅',color:'#0069FF',status:'connected',detail:'2 accountants linked · 14 meetings booked this month'},
    {name:'Google Sheets',desc:'Meta Ads leads auto-sync',icon:'📊',color:'#34A853',status:'connected',detail:'Auto-sync every 15 min · Last synced 8 min ago · 47 leads imported'},
    {name:'Zoho Books',desc:'Accounting & bookkeeping sync',icon:'📒',color:'#E42527',status:'disconnected',detail:'Not connected — connect to auto-sync client transactions'},
    {name:'QuickBooks Online',desc:'UK clients accounting',icon:'📗',color:'#2CA01C',status:'disconnected',detail:'Not connected — for UK client accounting data'},
    {name:'Xero',desc:'UK accounting platform',icon:'📘',color:'#13B5EA',status:'disconnected',detail:'Not connected — manage UK client books from Balans'},
  ]
  return(
    <div>
      <div className="ph"><div><div className="ph-title">🔗 Integrations</div><div className="ph-sub">Connect Balans to your business tools</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {integrations.map((int,i)=>(
          <div key={i} className="card" style={{padding:20,borderTop:`3px solid ${int.color}`}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:44,height:44,borderRadius:10,background:int.color,display:'grid',placeItems:'center',fontSize:20,flexShrink:0}}>{int.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700}}>{int.name}</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>{int.desc}</div>
              </div>
              <span className={`badge ${int.status==='connected'?'badge-green':'badge-grey'}`}>{int.status==='connected'?'✓ Connected':'Not Connected'}</span>
            </div>
            <div style={{background:int.status==='connected'?'var(--green-lt)':'var(--soft)',borderRadius:8,padding:'10px 12px',marginBottom:12,fontSize:11,color:int.status==='connected'?'var(--green)':'var(--muted)'}}>
              {int.status==='connected'?'✅ ':''}{int.detail}
            </div>
            <div style={{display:'flex',gap:8}}>
              {int.status==='connected'
                ?<><button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Re-syncing...')}>🔄 Re-sync</button><button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Settings saved!')}>⚙️ Configure</button></>
                :<button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>toast.success(`${int.name} connected!`)}>Connect {int.name}</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── LIVE ACTIVITY ──────────────────────────────────────────
export function AdminActivity(){
  const team=[
    {name:'Rashmi Sharma',role:'Accountant',login:'8:45 AM',logout:'—',today:'4h 22m',week:'22h 10m',month:'86h 30m',pages:14,last:'Reviewing VAT — Ahmed',status:'online'},
    {name:'Sara Al Nabi',role:'Sales',login:'9:10 AM',logout:'—',today:'3h 45m',week:'19h 30m',month:'76h 15m',pages:22,last:'Lead chat follow-ups',status:'online'},
    {name:'Omar Hassan',role:'Sales',login:'10:40 AM',logout:'—',today:'2h 15m',week:'16h 45m',month:'68h 00m',pages:9,last:'Pipeline view',status:'online'},
    {name:'Khalil Rashid',role:'Sales',login:'9:55 AM',logout:'—',today:'1h 58m',week:'18h 20m',month:'71h 40m',pages:7,last:'Dashboard — 12 min idle',status:'away'},
    {name:'Nour Al Amin',role:'Sales',login:'8:30 AM',logout:'11:15 AM',today:'2h 45m',week:'14h 10m',month:'55h 20m',pages:11,last:'Lead table',status:'offline'},
    {name:'Reem Saleh',role:'Sales',login:'—',logout:'—',today:'0h 00m',week:'12h 30m',month:'48h 10m',pages:0,last:'—',status:'not_in'},
    {name:'Aisha Malik',role:'Accountant',login:'9:00 AM',logout:'1:30 PM',today:'4h 30m',week:'21h 00m',month:'82h 15m',pages:18,last:'Reports page',status:'offline'},
  ]
  const dotColor={online:'var(--green)',away:'var(--orange)',offline:'var(--muted)',not_in:'var(--grey2)'}

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🟢 Live Activity</div><div className="ph-sub">Real-time team tracking — who is online, for how long</div></div>
        <div style={{display:'flex',gap:8}}>
          <div className="tb-chip chip-green">● 3 Online Now</div>
          <button className="btn btn-ghost btn-sm">⬇ Export Log</button>
        </div>
      </div>

      <div className="sg sg-4" style={{marginBottom:16}}>
        {team.filter(t=>t.status==='online').slice(0,4).map((m,i)=>(
          <div key={i} className="card" style={{padding:16,border:'2px solid var(--green)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'var(--green)',flexShrink:0}}/>
              <div style={{fontSize:13,fontWeight:700}}>{m.name}</div>
            </div>
            <div style={{fontSize:10,color:'var(--muted)',marginBottom:6}}>{m.role}</div>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,fontWeight:900,color:'var(--green)'}}>{m.today}</div>
            <div style={{fontSize:10,color:'var(--muted)'}}>Today · Login {m.login}</div>
            <div style={{marginTop:8,fontSize:11,color:'var(--blue)',background:'var(--blue-lt)',padding:'4px 8px',borderRadius:5}}>{m.last}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><div className="card-title">Full Activity Log — Today</div><div style={{fontSize:11,color:'var(--muted)'}}>Auto-refreshes every 60 seconds</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Team Member</th><th>Role</th><th>Login</th><th>Logout</th><th>Today</th><th>This Week</th><th>This Month</th><th>Pages</th><th>Last Action</th><th>Status</th></tr></thead>
            <tbody>
              {team.map((m,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{m.name}</td>
                  <td><span className={`badge ${m.role==='Accountant'?'badge-blue':'badge-gold'}`}>{m.role}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{m.login}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{m.logout}</td>
                  <td style={{fontWeight:700,color:m.status==='online'?'var(--green)':m.status==='away'?'var(--orange)':'var(--muted)'}}>{m.today}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{m.week}</td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{m.month}</td>
                  <td style={{fontSize:12}}>{m.pages>0?m.pages:'—'}</td>
                  <td style={{fontSize:11,color:'var(--muted)'}}>{m.last}</td>
                  <td><div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:8,height:8,borderRadius:'50%',background:dotColor[m.status]}}/><span style={{fontSize:11}}>{m.status.replace('_',' ')}</span></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── NOTIFICATIONS ──────────────────────────────────────────
export function AdminNotifications(){
  const notifs=[
    {icon:'💰',bg:'var(--orange-lt)',title:'3 commission approvals pending',msg:'Omar, Sara, Khalil submitted new conversions.',time:'1 hr ago',unread:true,type:'finance'},
    {icon:'⚠️',bg:'var(--red-lt)',title:'Nadia Khoury — 45 credits left',msg:'Client not yet notified. Consider flagging.',time:'2 hrs ago',unread:true,type:'client'},
    {icon:'💾',bg:'var(--blue-lt)',title:'Auto-backup completed',msg:'Jun 15 at 3:00 AM — 47.2 MB backed up.',time:'3:00 AM',unread:true,type:'system'},
    {icon:'🆕',bg:'var(--green-lt)',title:'New client converted',msg:'Khalid Al Rashid · Growth · AED 1,500/mo.',time:'Yesterday 11:00 PM',unread:true,type:'sales'},
    {icon:'📉',bg:'var(--red-lt)',title:'Reem Saleh at 35% of monthly target',msg:'16 days left — action recommended.',time:'Yesterday 9:00 AM',unread:true,type:'sales'},
    {icon:'💰',bg:'var(--gold-lt)',title:'MRR hit AED 17,250 — new record',msg:'+16% from May. 3 new Pro clients.',time:'Jun 12',unread:false,type:'finance'},
    {icon:'✅',bg:'var(--green-lt)',title:'VAT Return filed — Sara Mohammed',msg:'Q1 2025 filed successfully.',time:'Jun 4',unread:false,type:'client'},
  ]
  const[tab,setTab]=useState('all')
  const filtered=notifs.filter(n=>tab==='all'||n.type===tab)

  return(
    <div>
      <div className="ph">
        <div><div className="ph-title">🔔 Notifications</div><div className="ph-sub">{notifs.filter(n=>n.unread).length} unread</div></div>
        <button className="btn btn-ghost btn-sm" onClick={()=>toast.success('All marked as read')}>✓ Mark All Read</button>
      </div>
      <div className="tabs">
        {[['all','All (7)'],['finance','💰 Finance'],['client','👥 Client'],['sales','🎯 Sales'],['system','⚙️ System']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>
      <div className="card">
        {filtered.map((n,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 18px',borderBottom:i<filtered.length-1?'1px solid var(--grey2)':'none',background:n.unread?'var(--red-xlt)':'var(--white)',transition:'.2s'}}>
            <div style={{width:36,height:36,borderRadius:10,background:n.bg,display:'grid',placeItems:'center',fontSize:16,flexShrink:0}}>{n.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:n.unread?700:500}}>{n.title}</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{n.msg}</div>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{n.time}</div>
            </div>
            {n.unread&&<div style={{width:8,height:8,borderRadius:'50%',background:'var(--red)',flexShrink:0,marginTop:6}}/>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── BACKUP ──────────────────────────────────────────
export function AdminBackup(){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">💾 Data Backup</div><div className="ph-sub">Full backup of all client and business data</div></div><button className="btn btn-primary btn-sm" onClick={()=>toast.success('Backup started — you will be notified when complete')}>💾 Backup Now</button></div>
      <div style={{background:'var(--green-lt)',border:'1px solid #86EFAC',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:12,color:'#166534',fontWeight:500}}>
        ✅ Last backup: Today Jun 15 at 3:00 AM — All data backed up successfully. Next scheduled: Tomorrow 3:00 AM.
      </div>
      <div className="card" style={{marginBottom:14}}>
        <div className="card-head"><div className="card-title">Backup History</div></div>
        {[
          {name:'Full System Backup — Jun 15 2025',size:'47.2 MB',time:'3:00 AM',status:'complete'},
          {name:'Full System Backup — Jun 14 2025',size:'46.8 MB',time:'3:00 AM',status:'complete'},
          {name:'Full System Backup — Jun 13 2025',size:'46.1 MB',time:'3:00 AM',status:'complete'},
          {name:'Monthly Archive — May 2025',size:'142 MB',time:'Jun 1 12:00 AM',status:'archive'},
          {name:'Monthly Archive — Apr 2025',size:'118 MB',time:'May 1 12:00 AM',status:'archive'},
        ].map((b,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:i<4?'1px solid var(--grey2)':'none'}}>
            <div style={{fontSize:20}}>{b.status==='archive'?'📦':'✅'}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{b.name}</div>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{b.size} · {b.time}</div>
            </div>
            <span className={`badge ${b.status==='complete'?'badge-green':'badge-gold'}`}>{b.status}</span>
            <button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Download started!')}>⬇ Download</button>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:20}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Backup Settings</div>
        <div className="fg"><label>Schedule</label><select defaultValue="daily"><option>Daily at 3:00 AM (recommended)</option><option>Twice daily</option><option>Weekly</option></select></div>
        <div className="fg"><label>Retention</label><select><option>Keep last 30 days + monthly archives</option><option>Keep last 7 days only</option><option>Keep all</option></select></div>
        <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Backup settings saved!')}>Save Settings</button>
      </div>
    </div>
  )
}

// ── ONBOARDING ──────────────────────────────────────────
export function AdminOnboarding(){
  const inProgress=[
    {name:'Nadia Al Fahim',role:'Accountant',started:'Jun 10',step:3,total:6},
    {name:'Ibrahim Al Farsi',role:'Sales',started:'Jun 13',step:2,total:6},
  ]
  const accSteps=['Personal Info & Contract','ACCA Qualification Verified','Portal Login Created','First Client Assigned','Calendly Link Setup','Intro Call with Musa']
  const salesSteps=['Personal Info & Contract','Portal Login Created','Target Set by Admin','WhatsApp Script Training','First Leads Assigned','Intro Call with Musa']

  return(
    <div>
      <div className="ph"><div><div className="ph-title">🚀 Staff Onboarding</div><div className="ph-sub">Onboard new accountants and sales staff</div></div><button className="btn btn-primary btn-sm" onClick={()=>alert('Start onboarding')}>+ Onboard Staff Member</button></div>

      <div className="card" style={{marginBottom:16}}>
        <div className="card-head"><div className="card-title">🔄 Currently In Progress ({inProgress.length})</div></div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Name</th><th>Role</th><th>Started</th><th>Progress</th><th>Current Step</th><th>Action</th></tr></thead>
            <tbody>
              {inProgress.map((p,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{p.name}</td>
                  <td><span className={`badge ${p.role==='Accountant'?'badge-blue':'badge-gold'}`}>{p.role}</span></td>
                  <td style={{fontSize:12,color:'var(--muted)'}}>{p.started}</td>
                  <td>
                    <div style={{display:'flex',gap:3,alignItems:'center'}}>
                      {Array.from({length:p.total}).map((_,j)=>(
                        <div key={j} style={{width:14,height:6,borderRadius:2,background:j<p.step?'var(--green)':j===p.step?'var(--orange)':'var(--grey2)'}}/>
                      ))}
                      <span style={{fontSize:11,color:'var(--muted)',marginLeft:4}}>{p.step}/{p.total}</span>
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{p.role==='Accountant'?accSteps[p.step]:salesSteps[p.step]}</td>
                  <td><div style={{display:'flex',gap:4}}><button className="btn btn-ghost btn-sm btn-icon">👁</button><button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>alert('Step marked complete!')}>✓ Next Step</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {[{title:'👩‍💼 Onboard Accountant',steps:accSteps,color:'var(--red)',btn:'btn-primary'},{title:'📈 Onboard Sales Rep',steps:salesSteps,color:'var(--gold)',btn:'btn-gold'}].map((t,i)=>(
          <div key={i} className="card" style={{padding:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>{t.title}</div>
            {t.steps.map((s,j)=>(
              <div key={j} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:j<t.steps.length-1?'1px solid var(--grey2)':'none'}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:t.color,display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:11,flexShrink:0}}>{j+1}</div>
                <div style={{fontSize:12,fontWeight:500,lineHeight:1.5}}>{s}</div>
              </div>
            ))}
            <button className={`btn ${t.btn} btn-sm`} style={{width:'100%',justifyContent:'center',marginTop:14}} onClick={()=>alert('Starting onboarding flow...')}>Start Onboarding →</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ADMIN PROFILE ──────────────────────────────────────────
export function AdminProfile(){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">👑 My Profile</div><div className="ph-sub">CEO & Founder — Balans</div></div></div>
      <div style={{background:'linear-gradient(135deg,#0F0F0F,#1A0005)',borderRadius:16,padding:'24px 28px',marginBottom:20,display:'flex',alignItems:'center',gap:20}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),var(--gold))',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:28,flexShrink:0}}>M</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:26,fontWeight:700,color:'#fff'}}>Musa</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:3}}>CEO & Founder · Balans Accounting & Bookkeeping</div>
          <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
            {['👑 CEO & Founder','🇦🇪 UAE Based','💰 AED 17,250 MRR','👥 24 Active Clients','🏢 8 Team Members'].map((b,i)=>(
              <span key={i} style={{fontSize:11,background:'rgba(255,255,255,.08)',color:'rgba(255,255,255,.5)',padding:'3px 10px',borderRadius:50,fontWeight:600}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card" style={{padding:22,gridColumn:'1/-1'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Personal Information</div>
          <div className="fg-row">
            <div className="fg"><label>Full Name</label><input defaultValue="Musa"/></div>
            <div className="fg"><label>Admin Email</label><input defaultValue="musa@balans.ae"/></div>
            <div className="fg"><label>WhatsApp</label><input defaultValue="+971 52 740 4854"/></div>
            <div className="fg"><label>Role</label><input defaultValue="CEO & Founder" readOnly style={{background:'var(--soft)'}}/></div>
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
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Business Overview — June 2025</div>
          <div className="sg sg-2">
            {[{v:'AED 17,250',l:'Monthly Revenue',c:'var(--gold)'},{v:'24',l:'Active Clients',c:'var(--green)'},{v:'8',l:'Team Members',c:'var(--blue)'},{v:'+16%',l:'MoM Growth',c:'var(--purple)'}].map((s,i)=>(
              <div key={i} style={{background:'var(--soft)',borderRadius:10,padding:14,textAlign:'center'}}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:22,fontWeight:900,color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── LEAD RULES ──────────────────────────────────────────
export function AdminLeadRules(){
  return(
    <div>
      <div className="ph"><div><div className="ph-title">⚙️ Lead Assignment Rules</div><div className="ph-sub">Configure auto-assignment and the 1-hour contact rule</div></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="card" style={{padding:22}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>🔄 Assignment Method</div>
          <div className="fg"><label>Assignment Method</label><select defaultValue="round_robin"><option value="round_robin">Round-Robin (fewest active leads)</option><option value="manual">Manual Assignment</option></select></div>
          <div className="fg"><label>Sunday (Day Off)</label><select><option>Queue leads — assign Monday 10 AM</option><option>Assign to on-duty rep</option><option>Assign normally</option></select></div>
          <div className="fg"><label>After-Hours Leads</label><select><option>Queue until next business day</option><option>Assign immediately + notify</option></select></div>
          <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Saved!')}>Save Rules</button>
        </div>
        <div className="card" style={{padding:22}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>⏰ 1-Hour Contact Rule</div>
          <div className="fg"><label>Contact Window</label><input type="number" defaultValue={60} /><span style={{fontSize:11,color:'var(--muted)',marginTop:4,display:'block'}}>minutes from lead arrival</span></div>
          <div className="fg"><label>Warning Alert At</label><input type="number" defaultValue={30}/><span style={{fontSize:11,color:'var(--muted)',marginTop:4,display:'block'}}>minutes (yellow alert to rep)</span></div>
          <div className="fg"><label>Action on Breach</label><select><option>Reassign to next rep + log fine</option><option>Reassign only (no fine)</option><option>Alert admin only</option></select></div>
          <div className="fg"><label>Default Fine Amount (AED)</label><input type="number" defaultValue={0} placeholder="0 = no fine"/></div>
          <button className="btn btn-primary btn-sm" onClick={()=>toast.success('Saved!')}>Save Rules</button>
        </div>
        <div className="card" style={{padding:22,gridColumn:'1/-1'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>💰 Fine Settings Per Rep</div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Sales Rep</th><th>Fine Per Breach (AED)</th><th>Deducted From</th><th>Total Fines (Jun)</th><th>Action</th></tr></thead>
              <tbody>
                {[{name:'Sara Al Nabi',fine:0,from:'Commission',total:0},{name:'Omar Hassan',fine:200,from:'Commission',total:200},{name:'Khalil Rashid',fine:0,from:'Commission',total:0},{name:'Nour Al Amin',fine:200,from:'Commission',total:200},{name:'Reem Saleh',fine:0,from:'Commission',total:0}].map((r,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{r.name}</td>
                    <td><input type="number" defaultValue={r.fine} style={{width:80,padding:'6px 10px',border:'1.5px solid var(--grey2)',borderRadius:8,fontSize:12}}/></td>
                    <td><select style={{padding:'6px 10px',border:'1.5px solid var(--grey2)',borderRadius:8,fontSize:12}}><option>Commission</option><option>Salary</option><option>No deduction</option></select></td>
                    <td style={{fontWeight:700,color:r.total>0?'var(--red)':'var(--muted)'}}>AED {r.total}</td>
                    <td><button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Saved!')}>Save</button></td>
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
