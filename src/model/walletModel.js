const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var walletSchema = new Schema({
    accepted: {type: Boolean, default: false},
    answered: {type: Boolean, default: false},
    userID: {type: String, unique: true},
    accountType: String,
    amount: {type: Number, default: 0},
    creditAmount: {type: Number, default: 0},
    creditLimit: {type: Number, default: 0},
    dateCreated: {type: Date, default: new Date()}
});

let walletModel = mongoose.model('wallets', walletSchema);

module.exports = walletModel;