import BD from '../base-orm/db.js'
import { ValidationError } from 'sequelize'

async function  publicarPedido(req,res){
    const pedido = req.body
    console.log(pedido)
    try{
        const data = await BD.models.Pedidos.create(pedido)
        res.status(200).send(data)
    }catch(err){
        if(err instanceof ValidationError){
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ': ' + x.message + '\n');
            res.status(400).json({message : messages});
        }else{
            throw err
        }
    }
}

export default publicarPedido;

