const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cash_sell.init(sequelize, DataTypes);
}

class cash_sell extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      settlement_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'liquidation_sellers',
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
      tableName: 'cash_sell',
      schema: 'public',
      timestamps: false,
    });
  }
}

// id: {
  //   autoIncrement: true,
  //   autoIncrementIdentity: true,
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: true
  // },
  // id_liquidation_sell: {
//   type: DataTypes.INTEGER,
//   allowNull: true,
//   references: {
  //     model: 'liquidation_sellers',
  // indexes: [
  //   {
  //     name: "cash_sell_pkey",
  //     unique: true,
  //     fields: [
  //       { name: "id" },
  //     ]
  //   },
  // ]
  //     key: 'id'
  //   },
  //   // unique: "cash_veh_id_liquidation_sell_key"
// },
  // {
    //   name: "cash_sell_id_liquidation_sell_key",
  //   unique: true,
  //   fields: [
  //     { name: "id_liquidation_sell" },
  //   ]
  // },