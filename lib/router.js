const Authentication = require('./controllers/authentication')
const Transactions = require('./controllers/transactions')
const ListTransactions = require('./controllers/listTransactions')
const DeleteTransaction = require('./controllers/deleteTransaction')
const passportService = require('./services/passport')
const passport = require('passport')


// creating middleware for passport which is between request and route handler
const requireAuth = passport.authenticate('jwt', {session: false}) // uses jwt strategy and when user is authenticated)
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function (app) {
  app.get('/authorize', requireAuth, function (req, res) {
    res.send({signedIn: true})
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup) // route handler for signup route
  app.post('/postTransactions', Transactions.postTransactions ,function (req, res) {
    res.send({transaction: true})
  })
  app.get('/listtransactions', requireAuth, ListTransactions.listTransactions, function(req, res) {
    res.send({fetch: true})
  })
  app.delete('/deleteTransaction', requireAuth, DeleteTransaction.deleteTransactions, function(req, res) {
    res.send({deleted: true})
  })
  app.get('*', (req, res) => {
    res.status(404).send("Sorry, that web page doesn't exist 🤷🏻‍")
 })
  
}
