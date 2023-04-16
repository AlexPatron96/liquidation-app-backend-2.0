const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return bank.init(sequelize, DataTypes);
}

class bank extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_bank: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bank_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
