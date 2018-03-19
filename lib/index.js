const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// DB Setup
mongoose.connect('mongodb://localhost:crypto/crypto')

// App Setup - getting express working
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app) // call router with our app

// Server Setup - getting express to talk to outside world
const port = process.env.PORT || 3090
const server = http.createServer(app)
// the above line create an http server that can receive requests and forward to our express application
server.listen(port)
console.log('Server Listening On: ', port)
