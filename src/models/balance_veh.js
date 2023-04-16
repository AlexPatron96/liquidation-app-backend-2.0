const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return balance_veh.init(sequelize, DataTypes);
}

class balance_veh extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_veh: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'id'
      },
      unique: "balance_veh_id_veh_key"
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'balance_veh',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "balance_veh_id_veh_key",
        unique: true,
        fields: [
          { name: "id_veh" },
        ]
      },
      {
        name: "balance_veh_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
