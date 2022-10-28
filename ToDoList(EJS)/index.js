var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar archivos estaticos
app.use(express.static(__dirname + "/Public"));

//Mongoose

mongoose
  .connect(
    "mongodb+srv://alvaro_0817:A65708589l@cluster0.cbh2tqk.mongodb.net/motorPlantillas?retryWrites=true&w=majority"
  )
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });

//Configurar Motor de Plantillas
var path = __dirname + "/views";
app.set("views", path);
app.set('view engine', 'ejs');

//Modelos
var Tarea = require("./models/tareas");

//Rutas

app.get("/inicio", function(req,res) {
  var titulo_pagina = "Nueva Tarea";
  var mostrar = "show_form";
  res.render('index', {
    tit: titulo_pagina,
    show: mostrar,
  });
});

app.get("/listado", async function (req, res) {
    var titulo_pagina = "Listado de Tareas";
    var mostrar = "show_table"
    var tareas = await Tarea.find();
    res.render("index", {
      tit: titulo_pagina,
      docs: tareas,
      show: mostrar,
    });
});

app.post("/nuevaTarea", async function (req, res){
    var datos = req.body;
    var t = new Tarea(datos);
    await t.save();
    res.redirect("/listado")
});

//Delete
app.get("/eliminar/:id", async function (req, res) {
    var parametro = req.params.id;
    console.log("Documento eliminado: " + parametro);
    await Tarea.findByIdAndRemove(parametro);
    res.redirect("/listado")
  });

//Modificar
app.get("/modificar/:id", async function (req, res) {
  var parametro = req.params.id;
  var t = await Tarea.findById(parametro);
  t.estado = !t.estado;
  await t.save();
  res.redirect("/listado");
});

app.post("/modificar/:id", async function (req, res) {
  var datos = req.body;
  var t = await Task.findByIdAndUpdate({ _id: datos._id }, datos);
  res.redirect("/listado");
});

//Detalle de Tarea
app.get("/ver/:id", async function (req, res) {
  var parametro = req.params.id;
  var t = await Tarea.findById(parametro);
  res.render("index", {
    tit: "Detalle de Tarea",
    show: "show_detail",
    task: t,
  });
});

//Listen
app.listen(4000, function () {
    console.log("Servidor iniciado");
  });
  