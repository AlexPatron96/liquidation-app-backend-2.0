const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return liquidation_sellers.init(sequelize, DataTypes);
}

class liquidation_sellers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    settlement_code: {
      // autoIncrement: true,
      // autoIncrementIdentity: true,
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sellers',
        key: 'id'
      }
    },
    balance_gen_sell: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    date_liquidation: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total_collection_bills: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_money: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_expense: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_discount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_received: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    isLiquidated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'liquidation_sellers',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "liquidation_sellers_pkey",
        unique: true,
        fields: [
          { name: "settlement_code" },
        ]
      },
    ]
  });
  }
}
