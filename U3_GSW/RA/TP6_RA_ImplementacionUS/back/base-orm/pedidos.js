import { DataTypes } from 'sequelize';

const pedidosAtributos =  { 
    IdPedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TipoCarga :{ 
        type:  DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El tipo de carga es requerida'
            }
        }
    },
    FechaRetiro: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La fecha de retiro es requerida'
            }
        }
    },
    CalleRetiro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La calle de retiro es requerida'
            }
        }
    },
    AlturaRetiro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La altura de la calle de retiro es requerida'
            }
        }
    },
    LocalidadRetiro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La localidad retiro es requerida'
            }
        }
    },
    ProvinciaRetiro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La provincia de retiro es requerida'
            }
        }
    },
    ReferenciaRetiro: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    FechaEntrega: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La fecha de entrega es requerida'
            }
        }
    },

    CalleEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La calle de entrega es requerida'
            }
        }
    },
    AlturaEntrega: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La altura de la calle de entrega es requerida'
            }
        }
    },
    LocalidadEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La localidad entrega es requerida'
            }
        }
    },
    ProvinciaEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'La provincia de entrega es requerida'
            }
        }
    },
    ReferenciaEntrega: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Fotos: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    
}

const pedidosOptions = {
    timestamps: false
}

const pedidoModel = {
    pedidosAtributos, pedidosOptions
}

export default pedidoModel