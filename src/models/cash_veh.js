const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cash_veh.init(sequelize, DataTypes);
}

class cash_veh extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      settlement_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'liquidation_veh',
          key: 'settlement_code'
        },
      },
      coin: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      money: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      deposits_money: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      check_money: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'cash_veh',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "cash_veh_pkey",
          unique: true,
          fields: [
            { name: "settlement_code" },
          ]
        },
      ]
    });
  }
}
