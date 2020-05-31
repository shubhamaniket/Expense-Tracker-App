const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text : {
        type : String,
        required : [true,'Please enter description of Transaction'],
        trim : true
    },
    amount : {
        type : Number,
        required : [true,'Please enter amount in positive or negative']
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Transaction',TransactionSchema);