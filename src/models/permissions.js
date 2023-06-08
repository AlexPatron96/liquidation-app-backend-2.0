const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return permissions.init(sequelize, DataTypes);
};

class permissions extends Sequelize.Model {
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
				name_permissions: {
					type: DataTypes.STRING(15),
					allowNull: false,
				},
				create_newroll: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				create_newpermissions: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				create_user: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				create_seller: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				create_vehicle: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				edited_seller_maxtotal: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
			},
			{
				sequelize,
				tableName: "permissions",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "permissions_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
