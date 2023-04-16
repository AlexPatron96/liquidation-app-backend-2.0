const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return discounts_veh.init(sequelize, DataTypes);
}

class discounts_veh extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    settlement_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'liquidation_veh',
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
    tableName: 'discounts_veh',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "discounts_veh_pkey",
        unique: true,
        fields: [
          { name: "settlement_code" },
        ]
      },
    ]
  });
  }
}
