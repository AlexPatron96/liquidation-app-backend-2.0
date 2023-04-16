const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return status.init(sequelize, DataTypes);
}

class status extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "status_name_key"
    }
  }, {
    sequelize,
    tableName: 'status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "status_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
