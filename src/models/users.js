const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	return users.init(sequelize, DataTypes);
};

class users extends Sequelize.Model {
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
				fullname: {
					type: DataTypes.STRING(30),
					allowNull: false,
				},
				username: {
					type: DataTypes.STRING(15),
					allowNull: true,
				},
				dni: {
					type: DataTypes.STRING(13),
					allowNull: true,
					unique: "users_dni_key",
				},
				mail: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: "users_mail_key",
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						validatePassword(value) {
							if (
								this._changingPassword &&
								!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,16}$/.test(
									value
								)
							) {
								throw new Error(
									"La contraseña no cumple con los requisitos Minimos"
								);
							}
						},
					},
					/*La contraseña debe tener al entre 8 y 16 
        caracteres, al menos un dígito, al menos una 
        minúscula y al menos una mayúscula.
        NO puede tener otros símbolos.
        Ejemplo: Alex1996       */
				},
				id_roll: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "roll",
						key: "id",
					},
				},
			},
			{
				hooks: {
					beforeCreate: (user, options) => {
						if (user.changed("password")) {
							user._changingPassword = true;
							user.password = bcrypt.hashSync(
								user.password,
								10
							);
							delete user._changingPassword;
						}
					},
					// beforeCreate: (user, options) => {
					// 	const { password } = user;
					// 	const hash = bcrypt.hashSync(password, 10);
					// 	user.password = hash;
					// },
				},
				sequelize,
				tableName: "users",
				schema: "public",
				timestamps: false,
				indexes: [
					{
						name: "users_dni_key",
						unique: true,
						fields: [{ name: "dni" }],
					},
					{
						name: "users_mail_key",
						unique: true,
						fields: [{ name: "mail" }],
					},
					{
						name: "users_pkey",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		);
	}
}
