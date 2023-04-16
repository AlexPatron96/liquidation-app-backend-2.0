const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return day.init(sequelize, DataTypes);
}

class day extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    day: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'day',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "day_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
