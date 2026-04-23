require('dotenv').config()
const express=require('express')
const cors=require('cors')
const helmet=require('helmet')
const rateLimit=require('express-rate-limit')

const app=express()
const PORT=process.env.PORT||5000

app.use(helmet())
app.use(cors({origin:process.env.FRONTEND_URL||'http://localhost:3000',credentials:true}))
app.use(express.json())
app.use(rateLimit({windowMs:15*60*1000,max:200}))

// Routes
app.use('/api/clients',require('./routes/clients'))
app.use('/api/leads',require('./routes/leads'))
app.use('/api/settings',require('./routes/settings'))
app.use('/api/stripe',require('./routes/stripe'))

const{tasks,docs,reports,notifs,comm,payroll}=require('./routes/allRoutes')
app.use('/api/tasks',tasks)
app.use('/api/documents',docs)
app.use('/api/reports',reports)
app.use('/api/notifications',notifs)
app.use('/api/commissions',comm)
app.use('/api/payroll',payroll)

// Webhooks (raw body needed)
app.use('/webhooks/stripe',express.raw({type:'application/json'}),require('./routes/webhooks'))

app.get('/health',(req,res)=>res.json({status:'ok',ts:new Date().toISOString()}))

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(err.status||500).json({error:err.message||'Server error'})
})

app.listen(PORT,()=>{
  console.log(`Balans API running on port ${PORT}`)
  // Start automation cron jobs
  require('./services/automation')
  console.log('Automation jobs started')
})

module.exports=app
