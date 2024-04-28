import { Sequelize } from "sequelize";
import pedidoModel from "./pedidos.js";
import transportistaModel from "./transportistas.js";

const BD = new Sequelize({
    dialect : 'sqlite',
    storage : './Pedidos.db'
})

BD.define(
    'Pedidos',
    pedidoModel.PedidosAtributos,
    pedidoModel.PedidosOptions
)

BD.define(
    'Transportistas',
    transportistaModel.Atributos,
    transportistaModel.Options,
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