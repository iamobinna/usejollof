const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var vendorSchema = new Schema({
    email: {type: String, unique: true},
    timings: Schema.Types.Mixed,
    name: String,
    description: String,
    location: {
        latLng: { lat: Number, lng: Number },
        address: String,
    },
    picUrl: String
});

let vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
