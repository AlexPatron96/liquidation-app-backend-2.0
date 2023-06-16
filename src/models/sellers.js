const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return sellers.init(sequelize, DataTypes);
};

class sellers extends Sequelize.Model {
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
				code: {
					type: DataTypes.STRING(15),
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				isActive: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				id_route: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "route",
						key: "id",
					},
				},
				max_fact: {
					type: DataTypes.DOUBLE,
					allowNull: true,
				},
				liquidation_isactive: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
				data_liquidation: {
					type: DataTypes.TEXT,
					allowNull: true,
					// type: DataTypes.ARRAY(DataTypes.JSONB),
					// allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "sellers",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "sellers_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
