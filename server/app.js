const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

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

app.get('/',(req,res)=>{
    res.send('hello')
})
//page not found setup
app.use((req,res)=>{
    res.status(400).json({
        msg:"page not found"
    })
})

module.exports = app