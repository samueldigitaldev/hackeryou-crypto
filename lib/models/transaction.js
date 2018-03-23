const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("./user")

const transactionSchema = new Schema({
    transactionType: Boolean,
    cryptocurrency: Number, //QUESTION
    price: Number,
    dollarAmount: Number,
    cryptoAmount: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

// Create Mode Class
const transactionClass = mongoose.model('Transaction', transactionSchema) 

// Export the Model
module.exports = transactionClass
