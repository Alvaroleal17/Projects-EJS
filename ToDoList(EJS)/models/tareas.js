const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tarea = new Schema({
    titulo: String,
    detalle: String,
    fecha: String,
    estado: {
        type: Boolean,
        default: false,
    }
},
{ versionKey: false}
);
module.exports = mongoose.model("Tareas", tarea);