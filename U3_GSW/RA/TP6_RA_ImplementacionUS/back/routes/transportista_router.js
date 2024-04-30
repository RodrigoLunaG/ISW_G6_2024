import express from "express";
import enviarCorreosATransportistas from "../controllers/transportista_controller.js";

const router = express.Router();

router.post('/api/transportistas/enviar-correos', enviarCorreosATransportistas)

export default router
