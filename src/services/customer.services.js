const models = require("../models/index");

class customerService {
	static async findAll() {
		try {
			const result = await models.clients.findAll({
				order: [["id", "DESC"]],
				attributes: {
					exclude: ["id_route_day", "id_seller"],
				},
				include: [
					{
						model: models.route_day,
						as: "route_day",
						attributes: {
							exclude: ["day_id", "id"],
						},
						include: [
							{
								model: models.day,
								as: "day",
								attributes: {
									exclude: ["id"],
								},
							},
							{
								model: models.route,
								as: "id_route_route",
								attributes: {
									exclude: ["detail"],
								},
							},
						],
					},
					{
						model: models.sellers,
						as: "seller",
						attributes: {
							exclude: [
								"data_liquidation",
								"max_fact",
								"liquidation_isactive",
								"isActive",
							],
						},
					},
				],
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async create(data) {
		try {
			const result = await models.clients.create(data);
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async createByClouster(data) {
		try {
			const result = await models.clients.bulkCreate(data, {
				ignoreDuplicates: true,
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async findId(id) {
		try {
			const result = await models.clients.findByPk(id, {
				attributes: {
					exclude: ["id_route_day", "id_seller"],
				},
				include: [
					{
						model: models.route_day,
						as: "route_day",
						attributes: {
							exclude: ["day_id"],
						},
						include: [
							{
								model: models.day,
								as: "day",
							},
						],
					},
					{
						model: models.sellers,
						as: "seller",
						attributes: {
							exclude: [
								"data_liquidation",
								"max_fact",
								"liquidation_isactive",
							],
						},
						include: [
							{
								model: models.route,
								as: "route",
							},
						],
					},
				],
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(id) {
		try {
			const result = await models.clients.destroy({ where: { id } });
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async update(id, data) {
		try {
			const result = await models.clients.update(data, { where: { id } });
			return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = customerService;
