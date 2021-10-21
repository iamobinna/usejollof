const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var locationSchema = new Schema({
    latLng: { lat: Number, lng: Number },
    address: String,
    email: String,
    name: String,
    type: String
});

let locationModel = mongoose.model("locations", locationSchema);

module.exports = locationModel;
