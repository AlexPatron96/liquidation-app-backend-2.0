const models = require("../models/index");

class sellerService {

    static async findAll() {
        try {
            const result = await models.sellers.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                attributes: {
                    exclude: ["id_route"]
                },
                include: [
                    {
                        model: models.balance_sell,
                        as: "balance_sell"
                    },
                    {
                        model: models.route,
                        as: "route",
                        include: [
                            {
                                model: models.route_day,
                                as: "route_days",
                                attributes: {
                                    exclude: ["id_route", "day_id"]
                                },
                                include: [
                                    {
                                        model: models.day,
                                        as: "day"
                                    }
                                ]
                            }
                        ]
                    }]
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.sellers.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async createByClouster(data) {
        try {
            const result = await models.sellers.bulkCreate(data, { ignoreDuplicates: true });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.sellers.findByPk(id, {
                attributes: {
                    exclude: ["id_route"]
                },
                include: {
                    model: models.route,
                    as: "route",
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            // const client = await models.clients.update({ id_sellers: null }, { where: { id } })
            const result = await models.sellers.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.sellers.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = sellerService;