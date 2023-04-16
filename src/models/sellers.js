const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sellers.init(sequelize, DataTypes);
}

class sellers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    id_route: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'route',
        key: 'id'
      },
      // unique: "sellers_id_route_key"
    }
  }, {
    sequelize,
    tableName: 'sellers',
    schema: 'public',
    timestamps: false,
    indexes: [
      // {
      //   name: "sellers_id_route_key",
      //   unique: true,
      //   fields: [
      //     { name: "id_route" },
      //   ]
      // },
      {
        name: "sellers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
