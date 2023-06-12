const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	return transaction.init(sequelize, DataTypes);
};

class transaction extends Sequelize.Model {
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
				id_bill: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "bills",
						key: "id",
					},
				},
				num_bill: {
					type: DataTypes.STRING(25),
					allowNull: false,
				},
				balance_date: {
					type: DataTypes.DATEONLY,
					allowNull: true,
				},
				pay: {
					type: DataTypes.DOUBLE,
					allowNull: true,
				},
				id_user: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "users",
						key: "id",
					},
				},
				detail: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				isDelete: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: false,
				},
			},
			{
				sequelize,
				tableName: "transaction",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "transaction_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
