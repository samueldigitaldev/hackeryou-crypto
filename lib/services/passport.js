const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local Strategy - local is using username and password
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify email and password, call done with the user

  User.findOne({email: email}, function (err, user) { // finds existing user with the email
    if (err) { return done(err) }
    if (!user) { return done(null, false) } // user thinks they have an account but don't

    user.comparePassword(password, function (err, isMatch) { // this calls the function in user.js
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})

// Set up options for JWT strategies
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // this is telling it to look at the header (authorization) for JWT
  secretOrKey: config.secret // need to have secret to decode
}

// Create JWT Strategies
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
// See if user ID in payload exists in DB
// If it does - call done with that user, otherwise call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

// Tell Passport to use Strategy
passport.use(jwtLogin)
passport.use(localLogin)
