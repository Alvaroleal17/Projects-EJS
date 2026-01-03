const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar archivos estaticos
app.use(express.static(__dirname + "/Public"));

//Mongoose
mongoose
  .connect(process.env.STRING_CONEXION)
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });

//Configurar Motor de Plantillas
const path = __dirname + "/views";
app.set("views", path);
app.set("view engine", "ejs");

//Modelos
const Tarea = require("./models/tareas");

app.get("/", function (req, res) {
  res.redirect("/inicio");
});

//Rutas
app.get("/inicio", function (req, res) {
  let titulo_pagina = "Nueva Tarea";
  let mostrar = "show_form";
  res.render("index", {
    tit: titulo_pagina,
    show: mostrar,
  });
});

app.get("/listado", async function (req, res) {
  let titulo_pagina = "Listado de Tareas";
  let mostrar = "show_table";
  let tareas = await Tarea.find();
  res.render("index", {
    tit: titulo_pagina,
    docs: tareas,
    show: mostrar,
  });
});

app.post("/nuevaTarea", async function (req, res) {
  let datos = req.body;
  let t = new Tarea(datos);
  await t.save();
  res.redirect("/listado");
});

//Delete
app.get("/eliminar/:id", async function (req, res) {
  let parametro = req.params.id;
  console.log("Task deleted: " + parametro);
  await Tarea.findByIdAndDelete(parametro);
  res.redirect("/listado");
});

//Modificar
app.get("/modificar/:id", async function (req, res) {
  let parametro = req.params.id;
  let t = await Tarea.findById(parametro);
  t.estado = !t.estado;
  await t.save();
  res.redirect("/listado");
});

app.post("/modificar", async function (req, res) {
  let datos = req.body;
  await Tarea.findByIdAndUpdate(datos._id, datos);
  res.redirect("/listado");
});

//Detalle de Tarea
app.get("/ver/:id", async function (req, res) {
  let parametro = req.params.id;
  let t = await Tarea.findById(parametro);
  res.render("index", {
    tit: "Detalle de Tarea",
    show: "show_detail",
    task: t,
  });
});

//Listen
app.listen(3000, function () {
  console.log("Servidor iniciado");
});
