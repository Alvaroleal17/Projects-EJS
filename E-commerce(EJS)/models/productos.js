var mongoose = require("mongoose");
var Schema = mongoose.Schema

var producto = new Schema ({
    article: String,
    description: String,
    carousel: Array,
    price: Number,
    category: String,
    stock: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("Productos", producto);