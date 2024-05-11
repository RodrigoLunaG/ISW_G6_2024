import express from 'express'
import publicarPedido from '../controllers/pedido_controller.js';
const router = express.Router();

router.post('/api/pedido' , publicarPedido)

export default router