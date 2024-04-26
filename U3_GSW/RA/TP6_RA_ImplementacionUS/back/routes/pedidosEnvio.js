const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.post("/nuevoPedidoEnvio/", async (req, res) => {
    
    try {
      let data = await db.pedidos.create({
        tipoCarga: req.body.tipoCarga,
        domicilioRetiro: req.body.domicilioRetiro,
        fechaRetiro: req.body.fechaRetiro,
        domicilioEntrega: req.body.domicilioEntrega,
        fechaEntrega: req.body.fechaEntrega,
        observacion: req.body.observacion,
        fotos: req.body.fotos,
      });
      res.status(200).json(data.dataValues); // ¡Devolver el registro agregado!
    } catch (err) {
      if (err instanceof ValidationError) {
        // Si son errores de validación, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // Si son errores desconocidos, dejamos que los maneje el middleware de errores
        throw err;
      }
    }
});

module.exports = router;
