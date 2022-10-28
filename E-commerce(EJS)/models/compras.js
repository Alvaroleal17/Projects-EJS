const mongoose = require("mongoose");
const Schema = mongoose.Schema

const car = new Schema ({
  id_producto: String, //corresponde con el ID del producto (colección Productos)
  nombre_producto: String,
  precio_unitario: Number,
  cantidad: Number,
  total: Number,
  fecha: String,
},
{ versionKey: false}
);
module.exports = mongoose.model("Compras", car);