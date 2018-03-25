const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("./user")

const transactionSchema = new Schema({
    transactionType: Boolean,
    dollarAmount: Number,
    cryptoCurrency: Number, //QUESTION
    price: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

// Create Mode Class
const transactionClass = mongoose.model('Transaction', transactionSchema) 

// Export the Model
module.exports = transactionClass
