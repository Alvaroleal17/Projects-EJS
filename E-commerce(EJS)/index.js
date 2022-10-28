const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar archivos estaticos
app.use(express.static(__dirname + "/public"));



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
app.set('view engine', 'ejs');

//Modelos
const Prod = require("./models/productos");
const Comp = require("./models/compras")

async function total_carrito() {
  let t = await Comp.find();
  return t.length;
}


//Rutas
app.get("/", async function (req,res){
  let p = await Prod.find();
  res.render('index',{
    productos: p,
    show_mensaje: false,
    contador: total_carrito(),
  });

});

app.get("/producto/:productoID", async function (req, res) {
  let id = req.params.productoID;
  let producto_seleccionado = await Prod.findById(id);
  res.render("detalle", {
    producto: producto_seleccionado,
    contador: total_carrito(),

   
  });
});


app.post("/comprar", async function (req, res) {
  let { id_producto, cantidad, precio_unitario, nombre_producto } = req.body;

  let c = {
    id_producto: id_producto,
    nombre_producto: nombre_producto,
    precio_unitario: parseInt(precio_unitario),
    cantidad: parseInt(cantidad),
    total: parseInt(precio_unitario) * parseInt(cantidad),
    fecha: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""), //fecha actual en formato yyyy-mm-dd hh:ii:ss
  };

  let cesta = new Comp(c);
  await cesta.save();

  //Buscamos todos los productos y los enviamos al inicio
  let p = await Prod.find();
  res.render("index", {
    productos: p,
    show_mensaje: true,
    contador: total_carrito(),
  });
});

app.get("/cesta", async function (req, res) {
  let c = await Comp.find();

  let url = "https://wa.me/5211234567890?text=Este%20es%20mi%20pedido%20.....";

  res.render("compra", {
    pedido: c,
    url_wa: url,
    contador: total_carrito(),
  });
});

app.get("/eliminar/:id_producto", async function (req, res) {
  let id = req.params.id_producto;
  await Comp.findByIdAndRemove(id);
  res.redirect("/cesta");
});

app.get("/categoria/:cat", async function (req, res) {
  let cate = req.params.cat;
  let prods = await Prod.find({ category: cate });

  res.render("index", {
    productos: prods,
    show_mensaje: false,
    contador: total_carrito(),
  });
});

//Listen
app.listen("3000", function (){
    console.log("Servidor iniciado");
});
