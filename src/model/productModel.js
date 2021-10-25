const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: Number,
    time: Number,
    pictures: [String],
    category: String
});

let productModel = mongoose.model("product", productSchema);

module.exports = productModel;
