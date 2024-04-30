import { DataTypes } from 'sequelize';

const transportistasAtributos =  { 
    IdTransportista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Email :{ 
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El email es requerida'
            }
        }
    },
    // la bd no soporta listas de string, asi que es un string largo separado por comas que hay que serializar o deserializar
    ZonaCobertura: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La zona de cobertura es requerida'
            }
        }
    }
}

const transportistasOptions = {
    timestamps: false
}

const transportistaModel = {
    transportistasAtributos, transportistasOptions
}

// script de sql para meter datos a la bd
//INSERT INTO Transportistas (Email, ZonaCobertura) VALUES
//    ('enzocampana2@gmail.com', 'Cordoba,Neuquen,Santa Cruz'),
//    ('linacaorsi@gmail.com', 'Santa Cruz,Mendoza'),
//    ('gerocrescente7@gmail.com', 'Marcos Juarez,Cordoba'),

export default transportistaModel