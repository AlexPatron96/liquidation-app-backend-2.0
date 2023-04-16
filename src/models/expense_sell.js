const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return expense_sell.init(sequelize, DataTypes);
}

class expense_sell extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      settlement_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'liquidation_sellers',
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
      tableName: 'expense_sell',
      schema: 'public',
      timestamps: false,
      indexes: [
        // {
        //   name: "expense_sell_pkey",
        //   unique: true,
        //   fields: [
        //     { name: "id" },
        //   ]
        // },
        // {
        //   name: "expense_veh_id_liquidation_seller_key",
        //   unique: true,
        //   fields: [
        //     { name: "id_liquidation_seller" },
        //   ]
        // },
      ]
    });
  }
}


// const Sequelize = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   return expense_sell.init(sequelize, DataTypes);
// }

// class expense_sell extends Sequelize.Model {
//   static init(sequelize, DataTypes) {
//   return super.init({
//     id: {
//       autoIncrement: true,
//       autoIncrementIdentity: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     id_liquidation_seller: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'liquidation_sellers',
//         key: 'id'
//       },
//       unique: "expense_veh_id_liquidation_seller_key"
//     },
//     settlement_table: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     feeding: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     fuel: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     vehicle_expenses: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     boat_expenses: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     motorcycle_expenses: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     total: {
//       type: DataTypes.DOUBLE,
//       allowNull: true
//     },
//     detail: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     tableName: 'expense_sell',
//     schema: 'public',
//     timestamps: false,
//     indexes: [
//       {
//         name: "expense_sell_pkey",
//         unique: true,
//         fields: [
//           { name: "id" },
//         ]
//       },
//       {
//         name: "expense_veh_id_liquidation_seller_key",
//         unique: true,
//         fields: [
//           { name: "id_liquidation_seller" },
//         ]
//       },
//     ]
//   });
//   }
// }
