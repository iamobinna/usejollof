const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
    number: {type: String, unique: true},
    type: String,
    driver: String,
    partner: String
});

let vehicleModel = mongoose.model("vehicles", vehicleSchema);

module.exports = vehicleModel;
