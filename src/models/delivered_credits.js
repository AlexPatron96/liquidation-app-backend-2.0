const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return delivered_credits.init(sequelize, DataTypes);
}

class delivered_credits extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    settlement_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'liquidation_veh',
        key: 'settlement_code'
      },
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sellers',
        key: 'id'
      }
    },
    sales: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'delivered_credits',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "delivered_credits_pkey",
        unique: true,
        fields: [
          { name: "settlement_code" },
        ]
      },
    ]
  });
  }
}
