const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return check_money.init(sequelize, DataTypes);
}

class check_money extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        primaryKey: true,
      },
      settlement_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      id_bank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'bank',
          key: 'id'
        }
      },
      type: {
        type: DataTypes.ENUM('deposito', 'cheque', 'transferencia'),
        allowNull: false,
        defaultValue: 'deposito'
      },
      id_client: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      references: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_check: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      isEndorsed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      toName: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'check_money',
      schema: 'public',
      timestamps: true,
      indexes: [
        // {
        //   name: "check_money",
        //   unique: true,
        //   fields: [ 
        //     { name: "id" },
        //   ]
        // },
      ]
    });
  }
}
