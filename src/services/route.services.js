const models = require("../models/index");


class RouteService {

    static async findAll() {
        try {
            const result = await models.route.findAll({
                order: [
                    ['id', 'DESC'],
                ],
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
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            // console.log(id);
            const result = await models.route.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(newRoute) {
        try {
            const result = await models.route.create(newRoute);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.route.update(data, {
                where: { id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {

            const result = await models.route.destroy({
                where: { id },
            });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = RouteService;