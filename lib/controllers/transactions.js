const Transaction = require('../models/transaction')

exports.postTransactions = function (req, res, next) {
  const { transactionType, cryptocurrency, price, dollarAmount, cryptoAmount, user } = req.body

  const transaction = new Transaction({
    transactionType, 
    cryptocurrency, 
    price, 
    dollarAmount, 
    cryptoAmount,
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
