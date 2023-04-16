const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return bills_pre.init(sequelize, DataTypes);
}

class bills_pre extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pre_liquidation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pre_liquidations',
        key: 'id'
      }
    },
    id_bill: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bills',
        key: 'id'
      }
    },
    pre_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'bills_pre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bills_pre_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
