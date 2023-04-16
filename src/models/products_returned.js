const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return products_returned.init(sequelize, DataTypes);
}

class products_returned extends Sequelize.Model {
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
    disrepair: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rejected: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products_returned',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_returned_pkey",
        unique: true,
        fields: [
          { name: "settlement_code" },
        ]
      },
    ]
  });
  }
}
