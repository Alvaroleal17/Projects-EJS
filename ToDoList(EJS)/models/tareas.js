let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tarea = new Schema({
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