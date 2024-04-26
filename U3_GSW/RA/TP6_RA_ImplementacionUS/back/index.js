const express = require("express");


// crear servidor
const app = express();
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial tangoapp!");
});

const pedidosRouter = require("./routes/pedidosEnvio");
app.use(pedidosRouter);

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});

if (!module.parent) {
  const port = process.env.PORT || 3000; 
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
