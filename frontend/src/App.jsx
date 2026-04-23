import React from'react'
import{BrowserRouter,Routes,Route,Navigate,useNavigate}from'react-router-dom'
import{Toaster}from'react-hot-toast'
import{AuthProvider,useAuth}from'./context/AuthContext'
import'./styles/globals.css'

// Website
import Website from'./pages/website/Website'

// Client Portal
import{ClientLayout,ClientLogin,ClientDashboard,ClientDocuments,ClientReports,ClientCredits,ClientKYC,ClientPayments,ClientChat,ClientProfile}from'./pages/client/ClientPortal'

// Admin
import AdminLayout from'./pages/admin/AdminLayout'
import AdminDashboard from'./pages/admin/AdminDashboard'
import AdminLeads from'./pages/admin/AdminLeads'
import AdminSettings from'./pages/admin/AdminSettings'
import{AdminRevenue,AdminCommissions,AdminPayroll,AdminExpenses,AdminPL}from'./pages/admin/AdminFinance'
import{AdminClients,AdminKYC,AdminVATDeadlines,AdminCorpTax}from'./pages/admin/AdminClients'
import{AdminAllTasks,AdminAllDocuments,AdminAllReports,AdminTransactions}from'./pages/admin/AdminWork'
import{AdminWorkload,AdminAccountants,AdminSalesTeam,AdminLogins,AdminPermissions}from'./pages/admin/AdminTeam'
import{AdminAnnouncements,AdminEmailCentre,AdminIntegrations,AdminActivity,AdminNotifications,AdminBackup,AdminOnboarding,AdminProfile,AdminLeadRules}from'./pages/admin/AdminComms'
import{AdminSalesTargets,AdminReassign}from'./pages/admin/AdminTargets'

// Sales
import{SalesLayout,SalesDashboard,SalesPipeline,SalesScripts,SalesCommission}from'./pages/sales/SalesPortal'
import{SalesMyLeads,SalesFollowUps,SalesObjections,SalesTargets,SalesNotifications,SalesProfile}from'./pages/sales/SalesPages'

// Accountant
import{AccountantLayout,AccountantDashboard,AccountantClients,AccountantVAT,AccountantChat}from'./pages/accountant/AccountantPortal'
import{AccountantTasks,AccountantDocuments,AccountantReports,AccountantCorpTax,AccountantBookkeeping,AccountantMeetings,AccountantNotifications,AccountantProfile}from'./pages/accountant/AccountantPages'

const Guard=({role,children})=>{
  const{user,profile,loading}=useAuth()
  if(loading)return<div style={{display:'grid',placeItems:'center',height:'100vh',fontFamily:'DM Sans,sans-serif',color:'#888',fontSize:14}}>Loading Balans...</div>
  if(!user)return<Navigate to={`/${role}/login`} replace/>
  // Allow access if profile role matches OR if profile is still loading
  if(profile && profile.role!==role)return<Navigate to={`/${role}/login`} replace/>
  return children
}
const ClientGuard=({children})=>{
  const{user,loading}=useAuth()
  if(loading)return<div style={{display:'grid',placeItems:'center',height:'100vh',fontFamily:'DM Sans,sans-serif',color:'#888',fontSize:14}}>Loading...</div>
  if(!user)return<Navigate to="/client/login" replace/>
  return children
}

const DevLogin=({role})=>{
  const{signIn}=useAuth()
  const nav=useNavigate()
  const[email,setEmail]=React.useState('')
  const[pw,setPw]=React.useState('')
  const submit=async(e)=>{e.preventDefault();const{error}=await signIn(email,pw);if(!error)nav(`/${role}/dashboard`)}
  const labels={admin:'Admin Centre',sales:'Sales Portal',accountant:'Accountant Portal'}
  return(
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#F9F9FB'}}>
      <div style={{background:'#fff',borderRadius:16,padding:32,width:360,boxShadow:'0 8px 32px rgba(0,0,0,.12)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
          <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,#8B0013,#C0001A)',display:'grid',placeItems:'center',fontFamily:'Cormorant Garamond,serif',fontWeight:900,fontSize:16,color:'#fff'}}>B</div>
          <div><div style={{fontFamily:'Cormorant Garamond,serif',fontSize:15,fontWeight:700}}>Balans</div><div style={{fontSize:10,color:'#888'}}>{labels[role]}</div></div>
        </div>
        <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:22,fontWeight:700,marginBottom:4}}>Sign In</div>
        <div style={{fontSize:12,color:'#888',marginBottom:20}}>Enter your credentials to continue</div>
        <form onSubmit={submit}>
          <div className="fg"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={`${role}@balans.ae`} required/></div>
          <div className="fg"><label>Password</label><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" required/></div>
          <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:12,marginTop:4,fontSize:14}}>Sign In →</button>
        </form>
      </div>
    </div>
  )
}

const AppRoutes=()=>(
  <Routes>
    {/* Public Website */}
    <Route path="/" element={<Website/>}/>

    {/* Client Portal */}
    <Route path="/client/login" element={<ClientLogin/>}/>
    <Route path="/client" element={<ClientGuard><ClientLayout/></ClientGuard>}>
      <Route index element={<Navigate to="/client/dashboard" replace/>}/>
      <Route path="dashboard" element={<ClientDashboard/>}/>
      <Route path="documents" element={<ClientDocuments/>}/>
      <Route path="reports" element={<ClientReports/>}/>
      <Route path="credits" element={<ClientCredits/>}/>
      <Route path="payments" element={<ClientPayments/>}/>
      <Route path="kyc" element={<ClientKYC/>}/>
      <Route path="chat" element={<ClientChat/>}/>
      <Route path="profile" element={<ClientProfile/>}/>
    </Route>

    {/* Admin Portal */}
    <Route path="/admin/login" element={<DevLogin role="admin"/>}/>
    <Route path="/admin" element={<Guard role="admin"><AdminLayout/></Guard>}>
      <Route index element={<Navigate to="/admin/dashboard" replace/>}/>
      <Route path="dashboard" element={<AdminDashboard/>}/>
      <Route path="activity" element={<AdminActivity/>}/>
      <Route path="leads" element={<AdminLeads/>}/>
      <Route path="lead-rules" element={<AdminLeadRules/>}/>
      <Route path="clients" element={<AdminClients/>}/>
      <Route path="kyc" element={<AdminKYC/>}/>
      <Route path="reassign" element={<AdminReassign/>}/>
      <Route path="vat-deadlines" element={<AdminVATDeadlines/>}/>
      <Route path="corp-tax" element={<AdminCorpTax/>}/>
      <Route path="all-tasks" element={<AdminAllTasks/>}/>
      <Route path="all-documents" element={<AdminAllDocuments/>}/>
      <Route path="all-reports" element={<AdminAllReports/>}/>
      <Route path="transactions" element={<AdminTransactions/>}/>
      <Route path="workload" element={<AdminWorkload/>}/>
      <Route path="accountants" element={<AdminAccountants/>}/>
      <Route path="sales-team" element={<AdminSalesTeam/>}/>
      <Route path="targets" element={<AdminSalesTargets/>}/>
      <Route path="logins" element={<AdminLogins/>}/>
      <Route path="permissions" element={<AdminPermissions/>}/>
      <Route path="revenue" element={<AdminRevenue/>}/>
      <Route path="commissions" element={<AdminCommissions/>}/>
      <Route path="payroll" element={<AdminPayroll/>}/>
      <Route path="expenses" element={<AdminExpenses/>}/>
      <Route path="pl" element={<AdminPL/>}/>
      <Route path="announcements" element={<AdminAnnouncements/>}/>
      <Route path="email-centre" element={<AdminEmailCentre/>}/>
      <Route path="integrations" element={<AdminIntegrations/>}/>
      <Route path="onboarding" element={<AdminOnboarding/>}/>
      <Route path="backup" element={<AdminBackup/>}/>
      <Route path="notifications" element={<AdminNotifications/>}/>
      <Route path="settings" element={<AdminSettings/>}/>
      <Route path="profile" element={<AdminProfile/>}/>
    </Route>

    {/* Sales Portal */}
    <Route path="/sales/login" element={<DevLogin role="sales"/>}/>
    <Route path="/sales" element={<Guard role="sales"><SalesLayout/></Guard>}>
      <Route index element={<Navigate to="/sales/dashboard" replace/>}/>
      <Route path="dashboard" element={<SalesDashboard/>}/>
      <Route path="leads" element={<SalesMyLeads/>}/>
      <Route path="pipeline" element={<SalesPipeline/>}/>
      <Route path="follow-ups" element={<SalesFollowUps/>}/>
      <Route path="scripts" element={<SalesScripts/>}/>
      <Route path="objections" element={<SalesObjections/>}/>
      <Route path="commission" element={<SalesCommission/>}/>
      <Route path="targets" element={<SalesTargets/>}/>
      <Route path="notifications" element={<SalesNotifications/>}/>
      <Route path="profile" element={<SalesProfile/>}/>
    </Route>

    {/* Accountant Portal */}
    <Route path="/accountant/login" element={<DevLogin role="accountant"/>}/>
    <Route path="/accountant" element={<Guard role="accountant"><AccountantLayout/></Guard>}>
      <Route index element={<Navigate to="/accountant/dashboard" replace/>}/>
      <Route path="dashboard" element={<AccountantDashboard/>}/>
      <Route path="clients" element={<AccountantClients/>}/>
      <Route path="tasks" element={<AccountantTasks/>}/>
      <Route path="documents" element={<AccountantDocuments/>}/>
      <Route path="reports" element={<AccountantReports/>}/>
      <Route path="vat" element={<AccountantVAT/>}/>
      <Route path="corp-tax" element={<AccountantCorpTax/>}/>
      <Route path="bookkeeping" element={<AccountantBookkeeping/>}/>
      <Route path="chat" element={<AccountantChat/>}/>
      <Route path="meetings" element={<AccountantMeetings/>}/>
      <Route path="notifications" element={<AccountantNotifications/>}/>
      <Route path="profile" element={<AccountantProfile/>}/>
    </Route>

    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
)

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Toaster position="top-right" toastOptions={{style:{fontFamily:'DM Sans,sans-serif',fontSize:13},success:{iconTheme:{primary:'#16A34A',secondary:'#fff'}},error:{iconTheme:{primary:'#C0001A',secondary:'#fff'}}}}/>
      </BrowserRouter>
    </AuthProvider>
  )
}
