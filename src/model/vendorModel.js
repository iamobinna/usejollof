const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var vendorSchema = new Schema({
    email: {type: String, unique: true},
    timings: Schema.Types.Mixed,
});

let vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
