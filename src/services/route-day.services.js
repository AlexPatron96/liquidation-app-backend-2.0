const models = require("../models/index");

class RouteDayServices {

    static async findAll() {
        try {
            const result = await models.route_day.findAll({
                order: [
                    ['id_route', 'DESC'],['day_id', 'ASC']
                ],
                include: [
                    {
                        model: models.day,
                        as: "day"
                    },
                    {
                        model: models.route,
                        as: "id_route_route",
                    }
                ]
            }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.route_day.findByPk(id, {
                include: [
                    {
                        model: models.day,
                        as: "day"
                    },
                    {
                        model: models.route,
                        as: "route"
                    }
                ]
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.route_day.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.route_day.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    // static async idAll(id) {
    //     try {
    //         const result = await models.liquidation_veh.findAndCountAll(id);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // };




    static async update(id, data) {
        try {
            const result = await models.route_day.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = RouteDayServices;