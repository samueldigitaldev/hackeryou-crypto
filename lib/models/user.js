const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define Model - this is a class
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true}, // this makes sure it is String and unique - if not unique it throws error, lowercase turns it lower
  password: String
})

// Before saving a model - run this function (hook)
userSchema.pre('save', function (next) {
  const user = this

  // generate a salt - takes 10 milliseconds to generate and then pass a callback to run after
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }
    // salt was created above and we now want to hash (encrypt) our password using the salt
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

// Create Mode Class
const ModelClass = mongoose.model('user', userSchema) // loads schema into mongoose and tells it there is a schema about a user

// Export the Model
module.exports = ModelClass
