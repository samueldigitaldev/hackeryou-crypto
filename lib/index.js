const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config');
const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI;

// DB Setup
mongoose.connect(MONGODB_URI);

// App Setup - getting express working
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
app.use('/', express.static(path.join(__dirname, '../build')))
router(app) // call router with our app

// Server Setup - getting express to talk to outside world
const port = process.env.PORT || config.PORT;
const server = http.createServer(app)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

// the above line create an http server that can receive requests and forward to our express application
server.listen(port)
console.log('Server Listening On: ', port)
