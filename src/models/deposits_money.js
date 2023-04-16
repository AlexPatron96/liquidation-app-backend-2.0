const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return deposits_money.init(sequelize, DataTypes);
}

class deposits_money extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      // autoIncrement: true,
      // autoIncrementIdentity: true,
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    // settlement_table: {
    //   type: DataTypes.STRING(15),
    //   allowNull: true,
    //   references: {
    //     model: 'cash_sell',
    //     key: 'settlement_table'
    //   },
    //   unique: "deposits_money_settlement_table_key"
    // },
    id_bank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bank',
        key: 'id'
      }
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    number_deposits: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'deposits_money',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "deposits_money_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      // {
      //   name: "deposits_money_settlement_table_key",
      //   unique: true,
      //   fields: [
      //     { name: "settlement_table" },
      //   ]
      // },
    ]
  });
  }
}
