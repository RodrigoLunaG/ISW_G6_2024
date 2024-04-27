import { Sequelize } from "sequelize";
import pedidoModel from "./pedidos.js";

const BD = new Sequelize({
    dialect : 'sqlite',
    storage : './Pedidos.db'
})

BD.define(
    'Pedidos',
    pedidoModel.PedidosAtributos,
    pedidoModel.PedidosOptions
)

const conectar = async () => {
    try { 
        await BD.sync();
    }catch(error){
        console.log("ha ocurrido un error : ", error)
    }
}

conectar()

export default BD;