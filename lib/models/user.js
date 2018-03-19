const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
})

userSchema.pre('save', function (next) {
  const user = this

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, function (err, hash) { // and run another callback and it results in a hash which is our password
      if (err) { return next(err) }

      // overwrite plain text password with encryped password
      user.password = hash
      next()
    })
  })
})

// This is logic to sign in
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) { // this.password is our hashed and salted password
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

const userClass = mongoose.model("User", userSchema) // loads schema into mongoose and tells it there is a schema about a user

module.exports = userClass
