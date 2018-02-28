const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

// create function that takes user id and encodes it
function tokenForUser (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret) // first argument is what to encode (user ID), second is using our secret string
}

exports.signin = function (req, res, next) {
  // User already has had email and passwords authenticated - Just need to give them a token
  res.send({token: tokenForUser(req.user)})
}

// this controller is where we have our logic and then we're going to respond to it
exports.signup = function (req, res, next) {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password // use Bcrypt library for encrypting passwords before they are saved (check user.js)

  // check if email or password exist as they must be true
  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'})
  }

  // See if a user with given email exists - go through existing db records and see if user exists

  User.findOne({email: email}, function (err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'}) // 422 is unprocessable entity
    }

    // If email does not exist - create and save user record
    const user = new User({
      email: email,
      password: password
    })

    user.save(function (err) {
      if (err) { return next(err) }
    })

    // Respond to request indicating user was created

    res.json({token: tokenForUser(user)})
  })
}
