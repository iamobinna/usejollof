/*
Payment Request
Wallet Request
Upgrade Request
*/

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var requestSchema = new Schema({
    requestedBy: {type: String, required: true},
    requestedFor: {type: String, required: true},
    name: {type: String, required: true},
    approved: false,
    created: {type: Date, default: new Date()},
    location: {
        latLng: { lat: Number, lng: Number },
        address: String,
    }
});

let requestModel = mongoose.model('requests', requestSchema);
// var Schema = mongoose.Schema;

// var requestSchema = new Schema({
//     requestBy: String,
//     requestFor: String,
//     approved: false,
//     created: {type: Date, default: new Date()},
//     location: {
//         latLng: { lat: Number, lng: Number },
//         address: String,
//     }
// });

// let requestModel = mongoose.model('requests', requestSchema);
// var Schema = mongoose.Schema;

// var requestSchema = new Schema({
//     requestBy: String,
//     requestFor: String,
//     approved: false,
//     created: {type: Date, default: new Date()},
//     location: {
//         latLng: { lat: Number, lng: Number },
//         address: String,
//     }
// });

// let requestModel = mongoose.model('requests', requestSchema);

module.exports = {requestModel};