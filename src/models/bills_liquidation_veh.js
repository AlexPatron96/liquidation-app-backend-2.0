const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return bills_liquidation_veh.init(sequelize, DataTypes);
}

class bills_liquidation_veh extends Sequelize.Model {
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
      allowNull: true,
      references: {
        model: 'bills',
        key: 'id'
      }
    },
    id_liquidation: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'liquidation_veh',
        key: 'settlement_code'
      }
    }
  }, {
    sequelize,
    tableName: 'bills_liquidation_veh',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bills_liquidation_veh_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
