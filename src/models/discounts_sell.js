const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return discounts_sell.init(sequelize, DataTypes);
}

class discounts_sell extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      settlement_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'liquidation_sellers',
          key: 'settlement_code'
        },
      },
      total_discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      retention: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_other: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'discounts_sell',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "discounts_sell_pkey",
          unique: true,
          fields: [
            { name: "settlement_code" },
          ]
        },
      ]
    });
  }
}
