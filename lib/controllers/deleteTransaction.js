const Transactions = require('../models/transaction')
const User = require('../models/user')
const config = require('../config')
const jwt = require('jsonwebtoken');

exports.deleteTransactions = function(req, res, next) {
    const id = req.body._id;
    Transactions.findByIdAndRemove(id)
        .then(doc => {
        res.status(202).json({
            message: "removed",
            payload: doc
        });
        })
        .catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}
        