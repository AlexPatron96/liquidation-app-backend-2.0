const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return clients.init(sequelize, DataTypes);
}

class clients extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    code_external: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING(13),
      allowNull: true,
      unique: "clients_dni_key"
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sellers',
        key: 'id'
      }
    },
    id_route_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'route_day',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clients',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clients_dni_key",
        unique: true,
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "clients_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
