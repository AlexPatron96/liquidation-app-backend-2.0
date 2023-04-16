const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return liquidation_veh.init(sequelize, DataTypes);
}

class liquidation_veh extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      settlement_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      id_vehicle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'id'
        }
      },
      balance_gen_veh: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      settlement_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      box_small: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      total_delivery_bills: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_collection_bills: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_sent: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_money: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_expense: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_product: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_credit: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      total_received: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING(2000),
        allowNull: true
      },
      isLiquidated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      }
    }, {
      sequelize,
      tableName: 'liquidation_veh',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: "liquidation_veh_pkey",
          unique: true,
          fields: [
            { name: "settlement_code" },
          ]
        },
      ]
    });
  }
}
