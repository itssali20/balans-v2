import React,{useState,useEffect}from'react'
import'./Website.css'

export default function Website(){
  const[scrolled,setScrolled]=useState(false)
  const[menuOpen,setMenuOpen]=useState(false)
  const[tab,setTab]=useState('uae')
  const[openFaq,setOpenFaq]=useState(null)

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40)
    window.addEventListener('scroll',fn)
    return()=>window.removeEventListener('scroll',fn)
  },[])

  const plans={
    uae:[
      {name:'Starter',price:'AED 750',credits:600,popular:false,color:'var(--blue)',features:['600 Credits/month','VAT Filing','Monthly Bookkeeping','Monthly P&L Report','Dedicated Accountant','WhatsApp Support','Client Portal Access']},
      {name:'Growth',price:'AED 1,500',credits:1200,popular:true,color:'var(--red)',features:['1,200 Credits/month','Everything in Starter','VAT Registration','Quarterly Reviews','Priority Support','Document Management','Tax Planning Advice']},
      {name:'Pro',price:'AED 2,250',credits:1800,popular:false,color:'var(--gold)',features:['1,800 Credits/month','Everything in Growth','Corporate Tax Return','Payroll Processing','CFO Advisory Calls','Same-Day Response','Unlimited Documents']},
    ],
    uk:[
      {name:'Starter',price:'£199',credits:600,popular:false,color:'var(--blue)',features:['600 Credits/month','Self Assessment','Monthly Bookkeeping','Monthly P&L Report','Dedicated Accountant','Email Support','Client Portal Access']},
      {name:'Growth',price:'£399',credits:1200,popular:true,color:'var(--red)',features:['1,200 Credits/month','Everything in Starter','VAT Returns','Company Accounts','Priority Support','Document Management','Tax Planning']},
      {name:'Pro',price:'£599',credits:1800,popular:false,color:'var(--gold)',features:['1,800 Credits/month','Everything in Growth','Corporation Tax','Payroll Processing','CFO Advisory Calls','Same-Day Response','Unlimited Documents']},
    ]
  }

  const faqs=[
    {q:'What is a credit?',a:'Credits are our billing unit. Each accounting task uses a set number of credits — a VAT filing uses more than a simple report. Your monthly plan comes with a set credit balance that resets each month.'},
    {q:'Do I need to sign a long contract?',a:'No. All plans are month-to-month. Cancel anytime with no penalties or hidden fees. We earn your business every month.'},
    {q:'Can I upgrade or downgrade my plan?',a:'Yes, you can change your plan at any time from your client portal. Changes take effect from the next billing cycle.'},
    {q:'Do you work with UAE and UK businesses?',a:'Yes. We have dedicated ACCA-qualified accountants specialising in UAE (FTA, VAT, CT) and UK (HMRC, Companies House) compliance.'},
    {q:'How quickly will I hear from my accountant?',a:'During business hours (10AM–7PM UAE time) we guarantee a response within 2 hours. Pro plan clients get same-day turnaround on all requests.'},
    {q:'Is my financial data secure?',a:'Absolutely. All data is encrypted at rest and in transit using AES-256 bank-level encryption. Systems are backed up daily and your data is never shared or sold.'},
  ]

  return(
    <div className="ws">
      {/* NAV */}
      <nav className={`ws-nav${scrolled?' scrolled':''}`}>
        <div className="ws-nav-inner">
          <div className="ws-logo">
            <div className="ws-logo-mark">B</div>
            <div className="ws-logo-txt">Balans<span>Accounting & Bookkeeping</span></div>
          </div>
          <div className={`ws-links${menuOpen?' open':''}`}>
            <a href="#services" onClick={()=>setMenuOpen(false)}>Services</a>
            <a href="#pricing" onClick={()=>setMenuOpen(false)}>Pricing</a>
            <a href="#how" onClick={()=>setMenuOpen(false)}>How It Works</a>
            <a href="#faq" onClick={()=>setMenuOpen(false)}>FAQ</a>
            <a href="/client/login" className="btn btn-outline btn-sm">Client Login</a>
            <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Get Started</a>
          </div>
          <button className="ws-hbg" onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button>
        </div>
      </nav>

      {/* HERO */}
      <section className="ws-hero">
        <div className="ws-hero-bg"><div className="orb1"/><div className="orb2"/><div className="grid-lines"/></div>
        <div className="ws-hero-inner">
          <div className="ws-badge">🇦🇪 UAE · 🇬🇧 UK · Virtual Accounting</div>
          <h1>Your Business.<br/><span className="gold-text">Fully Accounted For.</span></h1>
          <p>Expert ACCA-qualified accountants managing your books, VAT, corporate tax and payroll — entirely online. No office visits. No surprises.</p>
          <div className="ws-hero-btns">
            <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">Start Free Trial →</a>
            <a href="/client/login" className="btn btn-lg" style={{color:'#fff',border:'1px solid rgba(255,255,255,.3)',background:'transparent'}}>Client Login</a>
          </div>
          <div className="ws-trust">
            {[['3 Days','Free Trial'],['ACCA','Qualified'],['UAE & UK','Compliant'],['No Contract','Cancel Anytime']].map(([v,l],i)=>(
              <React.Fragment key={i}>
                {i>0&&<div className="trust-div"/>}
                <div className="trust-item"><span className="trust-val">{v}</span><span className="trust-lbl">{l}</span></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="ws-section" id="services">
        <div className="ws-container">
          <div className="ws-head">
            <div className="ws-sec-badge">What We Do</div>
            <h2>Everything your business needs — handled</h2>
            <p>From daily bookkeeping to annual returns, our ACCA-qualified accountants manage it all remotely.</p>
          </div>
          <div className="ws-services">
            {[
              {icon:'🧾',title:'VAT Filing & Registration',desc:'Full UAE FTA VAT compliance. Registration, quarterly returns, reclaim management. UK VAT returns for HMRC.',tag:'UAE & UK'},
              {icon:'📚',title:'Bookkeeping',desc:'Monthly reconciliation, transaction categorisation, and clean books — every single month. Zero stress.',tag:'Core Service'},
              {icon:'📊',title:'Financial Reports',desc:'Monthly P&L, balance sheet, cash flow statements. Know your numbers before they surprise you.',tag:'Monthly'},
              {icon:'🏛',title:'Corporate Tax',desc:'UAE CT returns (9% on profits above AED 375K). UK corporation tax, small business relief, tax planning.',tag:'UAE & UK'},
              {icon:'💼',title:'Payroll Processing',desc:'UAE WPS-compliant payroll. UK PAYE, National Insurance, pension auto-enrolment. All handled monthly.',tag:'Monthly'},
              {icon:'📋',title:'Compliance & Advisory',desc:'FTA audit support, Companies House filings, annual accounts, and proactive tax saving advice.',tag:'Ongoing'},
            ].map((s,i)=>(
              <div key={i} className="ws-service-card">
                <div className="ws-service-icon">{s.icon}</div>
                <div className="ws-service-tag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ws-section ws-dark" id="how">
        <div className="ws-container">
          <div className="ws-head" style={{color:'#fff'}}>
            <div className="ws-sec-badge" style={{background:'rgba(201,146,26,.2)',color:'var(--gold)'}}>Simple Process</div>
            <h2 style={{color:'#fff'}}>Up and running in 24 hours</h2>
            <p style={{color:'rgba(255,255,255,.5)'}}>No paperwork. No office visits. Sign up and your accountant is on it.</p>
          </div>
          <div className="ws-steps">
            {[
              {n:'01',title:'Sign Up & Choose Plan',desc:'Pick your plan, start your free 3-day trial. No credit card required.'},
              {n:'02',title:'Upload Your Documents',desc:'Share your existing records via your secure client portal. Takes 10 minutes.'},
              {n:'03',title:'Meet Your Accountant',desc:'Your dedicated ACCA accountant reviews everything and books your onboarding call.'},
              {n:'04',title:'Sit Back & Grow',desc:'Your books are handled. Monthly reports land in your portal. You focus on the business.'},
            ].map((s,i)=>(
              <div key={i} className="ws-step">
                <div className="ws-step-num">{s.n}</div>
                <div className="ws-step-line"/>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="ws-section" id="pricing">
        <div className="ws-container">
          <div className="ws-head">
            <div className="ws-sec-badge">Transparent Pricing</div>
            <h2>Simple plans. No hidden fees.</h2>
            <p>Start with a 3-day free trial. No credit card required.</p>
          </div>
          <div className="ws-plan-tabs">
            <button className={`ws-ptab${tab==='uae'?' active':''}`} onClick={()=>setTab('uae')}>🇦🇪 UAE (AED)</button>
            <button className={`ws-ptab${tab==='uk'?' active':''}`} onClick={()=>setTab('uk')}>🇬🇧 UK (GBP)</button>
          </div>
          <div className="ws-plans">
            {plans[tab].map((p,i)=>(
              <div key={i} className={`ws-plan${p.popular?' ws-plan-pop':''}`}>
                {p.popular&&<div className="ws-plan-badge">Most Popular</div>}
                <div className="ws-plan-head">
                  <h3>{p.name}</h3>
                  <div className="ws-plan-price">{p.price}<span>/month</span></div>
                  <div className="ws-plan-credits">{p.credits.toLocaleString()} credits included</div>
                </div>
                <ul className="ws-plan-feats">
                  {p.features.map((f,j)=><li key={j}><span>✓</span>{f}</li>)}
                </ul>
                <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className={`btn btn-lg${p.popular?' btn-primary':' btn-outline'}`} style={{width:'100%',justifyContent:'center',display:'flex'}}>
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>
          <div className="ws-pricing-note">All plans include a 3-day free trial · No credit card required · Cancel anytime</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ws-section" style={{background:'var(--off)'}}>
        <div className="ws-container">
          <div className="ws-head">
            <div className="ws-sec-badge">Client Stories</div>
            <h2>Trusted by businesses across UAE & UK</h2>
          </div>
          <div className="ws-testimonials">
            {[
              {name:'Mohammed Hassan',company:'Gulf Import FZE',country:'🇦🇪',plan:'Pro',quote:"Balans handles all our VAT, corporate tax and payroll. I haven't touched a spreadsheet in 6 months. Incredible service."},
              {name:'Sara Mohammed',company:"Sara's Kitchen",country:'🇦🇪',plan:'Growth',quote:'VAT used to stress me out every quarter. Now I just upload my invoices and get a report back. Life-changing.'},
              {name:'James Anderson',company:'Anderson Tech Ltd',country:'🇬🇧',plan:'Growth',quote:'Found Balans when I expanded to UAE. They handle both my UK and UAE books seamlessly. Highly recommend.'},
            ].map((t,i)=>(
              <div key={i} className="ws-testimonial">
                <div className="ws-stars">★★★★★</div>
                <p>"{t.quote}"</p>
                <div className="ws-tauth">
                  <div className="ws-tav">{t.name[0]}</div>
                  <div><div className="ws-tname">{t.country} {t.name}</div><div className="ws-tmeta">{t.company} · {t.plan} Plan</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ws-section" id="faq">
        <div className="ws-container" style={{maxWidth:760}}>
          <div className="ws-head">
            <div className="ws-sec-badge">FAQ</div>
            <h2>Common questions answered</h2>
          </div>
          <div className="ws-faq">
            {faqs.map((f,i)=>(
              <div key={i} className={`ws-faq-item${openFaq===i?' open':''}`}>
                <button className="ws-faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  {f.q}<span>{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i&&<div className="ws-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ws-cta">
        <div className="ws-cta-bg"><div className="cta-orb"/></div>
        <div className="ws-container">
          <div className="ws-cta-inner">
            <div className="ws-sec-badge" style={{background:'rgba(201,146,26,.2)',color:'var(--gold)'}}>Get Started Today</div>
            <h2>Ready to take control of your finances?</h2>
            <p>Join hundreds of UAE and UK businesses with Balans as their virtual accounting team.</p>
            <div className="ws-cta-btns">
              <a href="https://wa.me/971527404854" target="_blank" rel="noreferrer" className="btn btn-gold btn-lg">💬 WhatsApp Us Now</a>
              <a href="/client/login" className="btn btn-lg" style={{color:'#fff',border:'1px solid rgba(255,255,255,.3)',background:'transparent'}}>Client Login →</a>
            </div>
            <div className="ws-cta-note">3-day free trial · No credit card · Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-footer">
        <div className="ws-container">
          <div className="ws-footer-grid">
            <div className="ws-footer-brand">
              <div className="ws-logo" style={{marginBottom:12}}>
                <div className="ws-logo-mark">B</div>
                <div className="ws-logo-txt" style={{color:'#fff'}}>Balans<span style={{color:'rgba(255,255,255,.4)'}}>Accounting & Bookkeeping</span></div>
              </div>
              <p>Virtual accounting for UAE and UK businesses. ACCA-qualified. Always available.</p>
              <div className="ws-footer-contact">
                <a href="https://wa.me/971527404854">💬 +971 52 740 4854</a>
                <a href="mailto:hello@balans.ae">📧 hello@balans.ae</a>
              </div>
            </div>
            <div className="ws-footer-col"><div className="ws-footer-h">Services</div><a href="#services">VAT Filing</a><a href="#services">Bookkeeping</a><a href="#services">Corporate Tax</a><a href="#services">Payroll</a><a href="#services">Financial Reports</a></div>
            <div className="ws-footer-col"><div className="ws-footer-h">Company</div><a href="#how">How It Works</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="https://wa.me/971527404854">Contact Us</a></div>
            <div className="ws-footer-col"><div className="ws-footer-h">Portals</div><a href="/client/login">Client Portal</a><a href="/accountant/login">Accountant Login</a><a href="/sales/login">Sales Login</a><a href="/admin/login">Admin Login</a></div>
          </div>
          <div className="ws-footer-bottom">
            <span>© 2025 Balans Accounting & Bookkeeping. All rights reserved.</span>
            <div style={{display:'flex',gap:16}}><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
