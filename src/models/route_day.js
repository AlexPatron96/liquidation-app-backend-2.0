const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return route_day.init(sequelize, DataTypes);
}

class route_day extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_route: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'route',
        key: 'id'
      }
    },
    day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'day',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'route_day',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "route_day_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
