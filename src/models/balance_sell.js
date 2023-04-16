const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return balance_sell.init(sequelize, DataTypes);
}

class balance_sell extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sellers',
        key: 'id'
      },
      unique: "balance_sell_id_seller_key"
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'balance_sell',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "balance_sell_id_seller_key",
        unique: true,
        fields: [
          { name: "id_seller" },
        ]
      },
      {
        name: "balance_sell_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
