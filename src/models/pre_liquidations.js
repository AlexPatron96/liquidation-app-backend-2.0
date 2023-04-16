const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return pre_liquidations.init(sequelize, DataTypes);
}

class pre_liquidations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userliquidator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pre_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sellers',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'pre_liquidations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pre_liquidations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
