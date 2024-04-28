import { DataTypes } from "sequelize";

const transportistasAtributos =  { 
    IdTransportista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Email :{ 
        type:  DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El email es requerida"
            }
        }
    },
    ZonaCobertura: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La zona de cobertura es requerida"
            }
        }
    },
}

const transportistasOptions = {
    timestamps: false
}

const transportistaModel = {
    transportistasAtributos, transportistasOptions
}

export default transportistaModel