const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return roll.init(sequelize, DataTypes);
};

class roll extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					autoIncrementIdentity: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				rol_user: {
					type: DataTypes.STRING(15),
					allowNull: false,
				},
				isActive: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				id_permissions: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "permissions",
						key: "id",
					},
				},
			},
			{
				sequelize,
				tableName: "roll",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "roll_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
