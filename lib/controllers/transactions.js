const Transaction = require('../models/transaction')

exports.postTransactions = function (req, res, next) {
  const { transactionType, cryptoCurrency, price, dollarAmount, cryptoAmount, user } = req.body

  const transaction = new Transaction({
    transactionType, 
    dollarAmount, 
    cryptoCurrency, 
    price, 
    user
  })
  transaction
  .save()
  .then(doc => {
    res.status(201).json({
      message: 'success',
      payload: doc
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })

}
