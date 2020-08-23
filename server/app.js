const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//routers
const loginRoute = require('./routes/userAuthRoute')
const catagoryRoute = require('./routes/catagoryRoute')
const productRoute = require('./routes/productRoute')

//middlewares
app.enable('trust proxy')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.options('*',cors())
app.use(morgan('dev'))
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString()
    next()
})

//routes use
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/user',loginRoute)
app.use('/api/category',catagoryRoute)
app.use('/api/product',productRoute)


// page not found setup
app.use((req,res)=>{
    res.status(404).json({
        msg:"page not found"
    })
})

module.exports = app