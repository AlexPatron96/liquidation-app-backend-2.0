const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return bills_liquidation_sellers.init(sequelize, DataTypes);
}

class bills_liquidation_sellers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_bills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bills',
        key: 'id'
      }
    },
    id_liquidation: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'liquidation_sellers',
        key: 'settlement_code'
      }
    }
  }, {
    sequelize,
    tableName: 'bills_liquidation_sellers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bills_liquidation_sellers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
