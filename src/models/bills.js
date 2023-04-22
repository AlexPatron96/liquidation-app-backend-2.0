const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return bills.init(sequelize, DataTypes);
}

class bills extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    num_bill: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "bills_num_bill_key"
    },
    isWhite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    deliver_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    total_bill: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sellers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bills',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bills_num_bill_key",
        unique: true,
        fields: [
          { name: "num_bill" },
        ]
      },
      {
        name: "bills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
