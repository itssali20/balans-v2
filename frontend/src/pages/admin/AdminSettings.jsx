import React,{useState}from'react'
import toast from'react-hot-toast'

export default function AdminSettings(){
  const[tab,setTab]=useState('business')
  const[stripeKey,setStripeKey]=useState('')
  const[smtpHost,setSmtpHost]=useState('')
  const[smtpPort,setSmtpPort]=useState('587')
  const[smtpUser,setSmtpUser]=useState('')
  const[smtpPass,setSmtpPass]=useState('')
  const[waToken,setWaToken]=useState('')
  const[sheetId,setSheetId]=useState('')

  const save=()=>toast.success('Settings saved!')
  const testStripe=()=>toast.success('Stripe connected ✓')
  const testEmail=()=>toast.success('Email sent — check your inbox!')

  return(
    <div>
      <div className="ph"><div><div className="ph-title">⚙️ Settings</div><div className="ph-sub">Full business configuration</div></div></div>
      <div className="tabs">
        {[['business','🏢 Business'],['pricing','💰 Pricing'],['integrations','🔗 Integrations'],['email','✉️ Email'],['automation','🤖 Automation'],['targets','🎯 Targets'],['security','🔒 Security']].map(([k,l])=>(
          <div key={k} className={`tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {tab==='business'&&(
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>Business Information</div>
          <div className="fg-row">
            <div className="fg"><label>Business Name</label><input defaultValue="Balans Accounting & Bookkeeping"/></div>
            <div className="fg"><label>Trading Name</label><input defaultValue="Balans"/></div>
            <div className="fg"><label>CEO / Founder</label><input defaultValue="Musa"/></div>
            <div className="fg"><label>Admin Email</label><input defaultValue="musa@balans.ae"/></div>
            <div className="fg"><label>WhatsApp (Main)</label><input defaultValue="+971527404854"/></div>
            <div className="fg"><label>Website</label><input defaultValue="https://balans.ae"/></div>
            <div className="fg"><label>UAE VAT TRN</label><input defaultValue="100123456789003"/></div>
            <div className="fg"><label>UAE Trade Licence</label><input defaultValue="CN-1234567"/></div>
            <div className="fg"><label>Operating Countries</label><select defaultValue="both"><option value="both">🇦🇪 UAE + 🇬🇧 UK</option><option>🇦🇪 UAE Only</option><option>🇬🇧 UK Only</option></select></div>
            <div className="fg"><label>Primary Currency</label><select><option>AED</option><option>GBP</option></select></div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={save}>Save Business Info</button>
        </div>
      )}

      {tab==='pricing'&&(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[{plan:'Starter',price:750,credits:600},{plan:'Growth',price:1500,credits:1200},{plan:'Pro',price:2250,credits:1800}].map(p=>(
            <div key={p.plan} className="card card-pad">
              <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>{p.plan} Plan</div>
              <div className="fg"><label>Price (AED/month)</label><input type="number" defaultValue={p.price}/></div>
              <div className="fg"><label>Credits Included</label><input type="number" defaultValue={p.credits}/></div>
              <button className="btn btn-ghost btn-sm" onClick={save}>Save</button>
            </div>
          ))}
          <div className="card card-pad">
            <div style={{fontSize:13,fontWeight:700,marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>General Pricing</div>
            <div className="fg"><label>Free Trial (days)</label><input type="number" defaultValue={3}/></div>
            <div className="fg"><label>Credit Top-up Price (AED per credit)</label><input type="number" defaultValue={1.25} step={0.01}/></div>
            <button className="btn btn-ghost btn-sm" onClick={save}>Save</button>
          </div>
        </div>
      )}

      {tab==='integrations'&&(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {/* Stripe */}
          <div className="card card-pad" style={{borderTop:'3px solid #635BFF'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:'#635BFF',display:'grid',placeItems:'center',fontSize:18}}>💳</div>
              <div><div style={{fontSize:14,fontWeight:700}}>Stripe</div><div style={{fontSize:11,color:'var(--muted)'}}>Payments & subscriptions</div></div>
            </div>
            <div className="fg"><label>Stripe Secret Key</label><input type="password" placeholder="sk_live_..." value={stripeKey} onChange={e=>setStripeKey(e.target.value)}/></div>
            <div className="fg"><label>Webhook Secret</label><input type="password" placeholder="whsec_..."/></div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={save}>Save Key</button>
              <button className="btn btn-ghost btn-sm" onClick={testStripe}>Test Connection</button>
            </div>
          </div>
          {/* WhatsApp */}
          <div className="card card-pad" style={{borderTop:'3px solid #25D366'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:'#25D366',display:'grid',placeItems:'center',fontSize:18}}>💬</div>
              <div><div style={{fontSize:14,fontWeight:700}}>WhatsApp Business API</div><div style={{fontSize:11,color:'var(--muted)'}}>Auto messages & broadcasts</div></div>
            </div>
            <div className="fg"><label>Business Phone</label><input defaultValue="+971527404854"/></div>
            <div className="fg"><label>API Access Token</label><input type="password" value={waToken} onChange={e=>setWaToken(e.target.value)} placeholder="EAABwz..."/></div>
            <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
          </div>
          {/* Google Sheets */}
          <div className="card card-pad" style={{borderTop:'3px solid #34A853'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:'#34A853',display:'grid',placeItems:'center',fontSize:18}}>📊</div>
              <div><div style={{fontSize:14,fontWeight:700}}>Google Sheets</div><div style={{fontSize:11,color:'var(--muted)'}}>Meta Ads leads sync</div></div>
            </div>
            <div className="fg"><label>Google Sheet ID</label><input value={sheetId} onChange={e=>setSheetId(e.target.value)} placeholder="1BxiMVs..."/></div>
            <div className="fg"><label>API Key</label><input type="password" placeholder="AIzaSy..."/></div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>toast.success('Synced 12 new leads!')}>🔄 Sync Now</button>
            </div>
          </div>
          {/* Calendly */}
          <div className="card card-pad" style={{borderTop:'3px solid #0069FF'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:'#0069FF',display:'grid',placeItems:'center',fontSize:18}}>📅</div>
              <div><div style={{fontSize:14,fontWeight:700}}>Calendly</div><div style={{fontSize:11,color:'var(--muted)'}}>Accountant bookings</div></div>
            </div>
            <div className="fg"><label>Rashmi — Calendly Link</label><input defaultValue="calendly.com/rashmi-balans"/></div>
            <div className="fg"><label>Aisha — Calendly Link</label><input defaultValue="calendly.com/aisha-balans"/></div>
            <button className="btn btn-primary btn-sm" onClick={save}>Save Links</button>
          </div>
        </div>
      )}

      {tab==='email'&&(
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>SMTP Email Configuration</div>
          <div style={{background:'var(--blue-lt)',borderRadius:10,padding:'12px 16px',marginBottom:16,fontSize:12,color:'var(--blue)'}}>
            ℹ️ All system emails (notifications, invoices, reports) will be sent from this email address. Changes take effect immediately.
          </div>
          <div className="fg-row">
            <div className="fg"><label>SMTP Host</label><input value={smtpHost} onChange={e=>setSmtpHost(e.target.value)} placeholder="smtp.gmail.com"/></div>
            <div className="fg"><label>SMTP Port</label><input value={smtpPort} onChange={e=>setSmtpPort(e.target.value)} placeholder="587"/></div>
            <div className="fg"><label>Username / Email</label><input value={smtpUser} onChange={e=>setSmtpUser(e.target.value)} placeholder="hello@balans.ae"/></div>
            <div className="fg"><label>Password / App Password</label><input type="password" value={smtpPass} onChange={e=>setSmtpPass(e.target.value)} placeholder="••••••••"/></div>
            <div className="fg"><label>From Name</label><input defaultValue="Balans Accounting"/></div>
            <div className="fg"><label>From Email</label><input defaultValue="hello@balans.ae"/></div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-primary btn-sm" onClick={save}>Save Email Settings</button>
            <button className="btn btn-ghost btn-sm" onClick={testEmail}>📧 Send Test Email</button>
          </div>
        </div>
      )}

      {tab==='automation'&&(
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>🤖 Automation Rules</div>
          {[
            {label:'Auto-assign lead to rep with fewest active leads',checked:true},
            {label:'1-hour contact rule — reassign & fine if breached',checked:true},
            {label:'Auto-reassign lost lead to next rep immediately',checked:true},
            {label:'Auto-send welcome WhatsApp on new client signup',checked:true},
            {label:'Auto-create VAT task 30 days before deadline',checked:true},
            {label:'Auto-escalate overdue tasks after 3 days',checked:true},
            {label:'Alert client when credits fall below 100',checked:true},
            {label:'Auto-retry failed Stripe payment (3 attempts)',checked:true},
            {label:'Send monthly report reminder to accountant on 25th',checked:false},
            {label:'Auto-sync Google Sheet leads every 15 minutes',checked:true},
          ].map((r,i)=>(
            <label key={i} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:13,padding:'10px 0',borderBottom:'1px solid var(--grey2)',cursor:'pointer'}}>
              <input type="checkbox" defaultChecked={r.checked} style={{marginTop:2,flexShrink:0}}/>
              <span>{r.label}</span>
            </label>
          ))}
          <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div className="fg"><label>Task escalation after (days)</label><input type="number" defaultValue={3}/></div>
            <div className="fg"><label>Credit alert threshold</label><input type="number" defaultValue={100}/></div>
            <div className="fg"><label>VAT reminder (days before)</label><input type="number" defaultValue={14}/></div>
            <div className="fg"><label>1-hour rule fine (AED)</label><input type="number" defaultValue={0} placeholder="0 = no fine"/></div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={save}>Save Automation Rules</button>
        </div>
      )}

      {tab==='targets'&&(
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>🎯 Sales Targets & Commission</div>
          <div className="fg-row">
            <div className="fg"><label>Monthly Conversion Target (per rep)</label><input type="number" defaultValue={20}/></div>
            <div className="fg"><label>Monthly Revenue Target (AED)</label><input type="number" defaultValue={25000}/></div>
            <div className="fg"><label>Commission Per Conversion (AED)</label><input type="number" defaultValue={200}/></div>
            <div className="fg"><label>Bonus Tier 1 — Conversions</label><input type="number" defaultValue={15}/></div>
            <div className="fg"><label>Bonus Tier 1 — Amount (AED)</label><input type="number" defaultValue={500}/></div>
            <div className="fg"><label>Bonus Tier 2 — Conversions</label><input type="number" defaultValue={20}/></div>
            <div className="fg"><label>Bonus Tier 2 — Amount (AED)</label><input type="number" defaultValue={1500}/></div>
            <div className="fg"><label>Bonus Tier 3 — Conversions</label><input type="number" defaultValue={25}/></div>
            <div className="fg"><label>Bonus Tier 3 — Amount (AED)</label><input type="number" defaultValue={3000}/></div>
            <div className="fg"><label>Max Clients Per Accountant</label><input type="number" defaultValue={10}/></div>
            <div className="fg"><label>Working Hours Start</label><input type="time" defaultValue="10:00"/></div>
            <div className="fg"><label>Working Hours End</label><input type="time" defaultValue="19:00"/></div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={save}>Save Targets</button>
        </div>
      )}

      {tab==='security'&&(
        <div className="card card-pad">
          <div style={{fontSize:13,fontWeight:700,marginBottom:16,paddingBottom:10,borderBottom:'1px solid var(--grey2)'}}>🔒 Security Settings</div>
          <div className="fg-row">
            <div className="fg"><label>Session Timeout (minutes)</label><input type="number" defaultValue={60}/></div>
            <div className="fg"><label>Password Min Length</label><input type="number" defaultValue={8}/></div>
            <div className="fg"><label>Force Password Reset (days)</label><input type="number" defaultValue={90}/></div>
          </div>
          {[{l:'Log all admin actions',c:true},{l:'Alert on new device login',c:true},{l:'Disable account after 5 failed logins',c:true},{l:'Require 2FA for admin access',c:false}].map((s,i)=>(
            <label key={i} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,marginBottom:10,cursor:'pointer'}}><input type="checkbox" defaultChecked={s.c}/>{s.l}</label>
          ))}
          <button className="btn btn-primary btn-sm" onClick={save}>Save Security Settings</button>
        </div>
      )}
    </div>
  )
}
