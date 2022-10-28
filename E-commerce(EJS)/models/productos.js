const mongoose = require("mongoose");
const Schema = mongoose.Schema

const producto = new Schema ({
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