const dotenv = require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route')
const musicRouter = require('./routes/music.route')


const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api', musicRouter)

module.exports = app