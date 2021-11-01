const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var locationSchema = new Schema({
    location:{
        latLng: { lat: Number, lng: Number },
        address: String,
    },
    email: String,
});

let locationModel = mongoose.model("locations", locationSchema);

module.exports = locationModel;
