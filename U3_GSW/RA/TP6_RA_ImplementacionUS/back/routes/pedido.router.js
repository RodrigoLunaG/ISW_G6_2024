import express from "express"
import publicar_pedido from "../controllers/pedido.controller.js";
const router = express.Router();


router.post('/api/pedido' , publicar_pedido)

export default router