import React from'react'
import PortalLayout from'../../components/common/PortalLayout'

const nav=[
  {section:'Overview',items:[
    {path:'/admin/dashboard',icon:'⊞',label:'Dashboard'},
    {path:'/admin/activity',icon:'🟢',label:'Live Activity',badge:5},
  ]},
  {section:'Leads',items:[
    {path:'/admin/leads',icon:'📥',label:'All Leads',badge:'New'},
    {path:'/admin/lead-rules',icon:'⚙️',label:'Assignment Rules'},
  ]},
  {section:'Clients',items:[
    {path:'/admin/clients',icon:'👥',label:'All Clients'},
    {path:'/admin/kyc',icon:'🪪',label:'KYC Approvals',badge:4},
    {path:'/admin/reassign',icon:'🔄',label:'Reassign Clients'},
  ]},
  {section:'Compliance',items:[
    {path:'/admin/vat-deadlines',icon:'📅',label:'VAT Deadlines',badge:'3!'},
    {path:'/admin/corp-tax',icon:'🏛',label:'Corporate Tax'},
  ]},
  {section:'Work',items:[
    {path:'/admin/all-tasks',icon:'✅',label:'All Tasks',badge:12},
    {path:'/admin/all-documents',icon:'📁',label:'All Documents'},
    {path:'/admin/all-reports',icon:'📊',label:'All Reports'},
    {path:'/admin/transactions',icon:'💳',label:'Transactions'},
  ]},
  {section:'Team',items:[
    {path:'/admin/workload',icon:'⚖️',label:'Team Workload'},
    {path:'/admin/accountants',icon:'👩‍💼',label:'Accountants'},
    {path:'/admin/sales-team',icon:'📈',label:'Sales Team'},
    {path:'/admin/targets',icon:'🎯',label:'Sales Targets'},
    {path:'/admin/logins',icon:'🔐',label:'Team Logins'},
    {path:'/admin/permissions',icon:'🛡',label:'Permissions'},
  ]},
  {section:'Finance',items:[
    {path:'/admin/revenue',icon:'💰',label:'Revenue & MRR'},
    {path:'/admin/commissions',icon:'🏆',label:'Commissions',badge:3},
    {path:'/admin/payroll',icon:'💵',label:'Payroll'},
    {path:'/admin/expenses',icon:'🧾',label:'Expenses'},
    {path:'/admin/pl',icon:'📉',label:'P&L Report'},
  ]},
  {section:'Communication',items:[
    {path:'/admin/announcements',icon:'📢',label:'Announcements'},
    {path:'/admin/email-centre',icon:'✉️',label:'Email Centre'},
    {path:'/admin/integrations',icon:'🔗',label:'Integrations'},
  ]},
  {section:'System',items:[
    {path:'/admin/onboarding',icon:'🚀',label:'Staff Onboarding'},
    {path:'/admin/backup',icon:'💾',label:'Data Backup'},
    {path:'/admin/notifications',icon:'🔔',label:'Notifications',badge:5},
    {path:'/admin/settings',icon:'⚙️',label:'Settings'},
    {path:'/admin/profile',icon:'👑',label:'My Profile'},
  ]},
]

export default function AdminLayout(){
  return(
    <PortalLayout
      navItems={nav}
      role="admin"
      topbarExtras={<>
        <div className="tb-chip chip-green">● 5 Online</div>
        <div className="tb-chip chip-red">💰 3 Pending</div>
        <div className="tb-chip chip-gold">AED 17,250 MRR</div>
      </>}
    />
  )
}
