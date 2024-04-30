import BD from '../base-orm/db.js';
import { Op } from 'sequelize';
import { enviarCorreo} from '../services/email_service.js'

async function enviarCorreosATransportistas(req, res) {
    try {
        const pedido = JSON.stringify(req.body);
        const objeto = JSON.parse(pedido)
        const localidadRetiro = objeto.LocalidadRetiro
        console.log(localidadRetiro)

        if (!localidadRetiro) {
            return res.status(400).json({ error: 'La localidad de retiro es requerida.' });
        }

        const transportistas = await BD.models.Transportistas.findAll({
            where: {
                ZonaCobertura: {
                    [Op.like]: `%${localidadRetiro}%` 
                }
            }
        });

        for (const transportista of transportistas) {
            const mensaje = '¡Hola! Se ha publicado un nuevo pedido en nuestra plataforma. ¿Estás disponible para llevarlo?';
            await enviarCorreo(transportista.Email, 'Nuevo pedido disponible en tu zona de Cobertura', mensaje);
        }

        res.status(200);
    } catch (error) {
        console.error('Error al enviar correos electrónicos a transportistas:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al enviar correos electrónicos.' });
    }
}


export default enviarCorreosATransportistas;