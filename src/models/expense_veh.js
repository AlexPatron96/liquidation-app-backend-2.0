const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return expense_veh.init(sequelize, DataTypes);
}

class expense_veh extends Sequelize.Model {
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
    perdiem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feeding: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    fuel: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    vehicle_expenses: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    boat_expenses: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    motorcycle_expenses: {
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
    tableName: 'expense_veh',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "expense_veh_pkey",
        unique: true,
        fields: [
          { name: "settlement_code" },
        ]
      },
    ]
  });
  }
}
