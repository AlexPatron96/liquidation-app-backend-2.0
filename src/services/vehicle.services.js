const models = require("../models/index");


class vehService {

    static async findAll() {
        try {
            const result = await models.vehicles.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                attributes: {
                    exclude: ["id_route"]
                },
                include: [
                    {
                        model: models.balance_veh,
                        as: 'balance_veh',
                        include: [
                            {
                                model: models.cuadre_balance_veh,
                                as: "cuadre_balance_vehs",
                                order: [
                                    ["createdAt", "DESC"] // ordenar por fecha de forma descendente
                                ],
                                limit: 45,
                            }
                        ],
                        
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

    static async create(vehicle) {
        try {
            const result = await models.vehicles.create(vehicle);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async createByClouster(data) {
        try {
            const result = await models.vehicles.bulkCreate(data, { ignoreDuplicates: true });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.vehicles.findByPk(id, {
                attributes: {
                    exclude: ["id_route"]
                },
                include: [{
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
                },
                {
                    model: models.balance_veh,
                    as: 'balance_veh'
                }
                ]
            });
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.vehicles.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.vehicles.update(data, { where: { id } });
            // console.log(result);
            if (result[0] !== 0) {
                // console.log("es cero");
                return { ok: true, result };
            } else {
                return { ok: false, message: "No se pudo actualizar el item" }
            }
        } catch (error) {
            throw error;
        }
    };
};

module.exports = vehService;