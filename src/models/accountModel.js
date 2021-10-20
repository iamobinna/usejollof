const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var accountSchema = new Schema({
    email: { type: String, unique: true },
    name: String,
    password: String,
    picUrl: String,
    setting: {
        email: { type: Boolean, default: true },
        mobile: { type: Boolean, default: false },
    },
    type: String,
    favorite: [String],
    wishlist: [String]
});

let accountModel = mongoose.model('accounts', accountSchema);

module.exports = accountModel;