const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var walletSchema = new Schema({
    accountEmail: String,
    type: String,
    amount: Number,
    creditAmount: Number,
    creditLimit: Number
});

let walletModel = mongoose.model('wallets', walletSchema);

module.exports = walletModel;