import { Sequelize } from 'sequelize';
import pedidoModel from './pedidos.js';
import transportistaModel from './transportistas.js';

const BD = new Sequelize({
    dialect : 'sqlite',
    storage : './base-orm/Tangoapp.db'
})

BD.define(
    'Pedidos',
    pedidoModel.pedidosAtributos,
    pedidoModel.pedidosOptions
)

BD.define(
    'Transportistas',
    transportistaModel.transportistasAtributos,
    transportistaModel.transportistasOptions,
)

const conectar = async () => {
    try { 
        await BD.sync();
    }catch(error){
        console.log('ha ocurrido un error : ', error)
    }
}

conectar()

export default BD;