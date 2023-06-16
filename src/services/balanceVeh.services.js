const models = require("../models/index");

class balanceVehService {
	static async findAll() {
		try {
			const result = await models.balance_veh.findAll({
				attributes: {
					exclude: ["id_veh"],
				},
				include: {
					model: models.vehicles,
					as: "vehicle",
					attributes: {
						exclude: [
							"id_route",
							"data_liquidation",
							"liquidation_isactive",
						],
					},
					include: {
						model: models.route,
						as: "route",
					},
				},
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async create(data) {
		try {
			const result = await models.balance_veh.create(data);
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async findId(id) {
		try {
			const result = await models.balance_veh.findByPk(id, {
				attributes: {
					exclude: ["id_veh"],
				},
				include: {
					model: models.vehicles,
					as: "vehicle",
					attributes: {
						exclude: [
							"id_route",
							"data_liquidation",
							"liquidation_isactive",
						],
					},
					include: {
						model: models.route,
						as: "route",
					},
				},
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(id) {
		try {
			const result = await models.balance_veh.destroy({ where: { id } });
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async update(id, data) {
		try {
			const result = await models.balance_veh.update(data, {
				where: { id },
			});
			// console.log(result);
			if (result[0] !== 0) {
				// console.log("es cero");
				return { ok: true, result };
			} else {
				return { ok: false, message: "No se pudo actualizar el item" };
			}
		} catch (error) {
			throw error;
		}
	}
}

module.exports = balanceVehService;
