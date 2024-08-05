const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createError = require('http-errors');
// const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const { userRouter } = require('./routers/userRouter');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controller/responseController');
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
app.use('/api/users',userRouter)
app.use('/api/seed',seedRouter)
app.use((req,res,next)=>{
    next(createError(404,'route not found'))
})
app.use((err,req,res,next)=>{
    return errorResponse(res,{
        statusCode: err.status,
        message: err.message
    })    
})
module.exports = {app}