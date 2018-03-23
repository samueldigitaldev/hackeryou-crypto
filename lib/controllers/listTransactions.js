const Transactions = require('../models/transaction')
const User = require('../models/user')
const config = require('../config')
const jwt = require('jsonwebtoken');


exports.listTransactions = function(req, res, next) {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    res.status(401).json({
      message: "unauthorized"
    });
  }
  jwt.verify(authHeader, config.secret, (err, decoded) => {
    if (decoded){
      const {sub} = decoded
      Transactions
      .find({
          "user": sub
      }) 
      .populate("user")
      .then(docs => {
        res.status(200).json({
          message: "success",
          payload: docs
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
      }

      else{
        res.status(401).send({
          message: "forbidden"
        });

      }
    })
  }
