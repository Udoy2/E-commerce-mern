const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createError = require('http-errors');
// const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: "Too many requests from this ip , please try again Later"
})
const app = express()
app.use(rateLimiter)
// app.use(xssClean())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("welcome getta")
})
app.use((req,res,next)=>{
    next(createError(404,'route not found'))
})
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })    
})
module.exports = {app}