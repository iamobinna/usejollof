const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var deliverBoySchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number},
    picUrl: String,
    gender: String,
    vehicle: String,
    partner: {type: String, required: true}
});

let deliverBoyModel = mongoose.model("deliverBoys", deliverBoySchema);

module.exports = deliverBoyModel;
