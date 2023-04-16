const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cuadre_balance_seller.init(sequelize, DataTypes);
}

class cuadre_balance_seller extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'balance_sell',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cuadre_balance_seller',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cuadre_balance_seller_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
