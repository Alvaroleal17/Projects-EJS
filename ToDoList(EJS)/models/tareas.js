var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tarea = new Schema({
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