const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return vehicles.init(sequelize, DataTypes);
};

class vehicles extends Sequelize.Model {
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
				enrollment: {
					type: DataTypes.STRING(15),
					allowNull: true,
				},
				driver: {
					type: DataTypes.STRING(30),
					allowNull: true,
				},
				cod_mv: {
					type: DataTypes.STRING(30),
					allowNull: true,
				},
				dni: {
					type: DataTypes.STRING(13),
					allowNull: true,
					unique: "vehicles_dni_key",
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
				tableName: "vehicles",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "vehicles_dni_key",
						unique: true,
						fields: [{ name: "dni" }],
					},
					{
						name: "vehicles_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
