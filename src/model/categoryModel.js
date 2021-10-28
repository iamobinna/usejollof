const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categories: [String]
});

let categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
