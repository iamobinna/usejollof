const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    vendor: {type: String, required: true},
    user: {type: String, required: true},
    status: {type: String, default: 'pending'},
    cost: {type: Number, required: true},
    products: {foodId: Schema.Types.Mixed, qty: Number},
    userLocation: {
        latLng: { lat: Number, lng: Number },
        address: String,
    },
    vendorLocation: {
        latLng: { lat: Number, lng: Number },
        address: String,
    },
    orderCreated: {type: Date, default: new Date()},
    assignedTo: String,
    approved: {type: Boolean, default: false},
    delivering: {type: Boolean, default: false}
});

let orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
