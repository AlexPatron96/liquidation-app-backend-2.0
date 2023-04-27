const models = require("../models/index");
const transaction = require("../models/transaction");


class billService {

    static async findAll() {
        try {
            const result = await models.bills.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                limit: 5000,
                attributes: {
                    exclude: ["id_client", "id_seller"]
                },
                include: [
                    {
                        model: models.clients,
                        as: "client",
                        attributes: {
                            exclude: ["id_seller", "id_route_day"]
                        },
                        include: [
                            {
                                model: models.route_day,
                                as: "route_day",
                                attributes: {
                                    exclude: ["id_route","id"]
                                },
                                include: [
                                    {
                                        model: models.day,
                                        as: "day",
                                    },
                                    {
                                        model: models.route,
                                        as: "id_route_route",
                                        attributes: {
                                            exclude: ["detail","id","name"]
                                        },
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        order: [
                            ['id', 'DESC'], ['balance_date', 'DESC']
                        ],
                        model: models.transaction,
                        as: "transactions",
                        include: [
                            {
                                model: models.users,
                                as: "id_user_user",
                            }
                        ]
                    },
                    {
                        model: models.sellers,
                        as: "seller",
                    },
                ],
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(bill) {
        try {
            // console.log(bill);
            const result = await models.bills.create(bill);
            return result;

        } catch (error) {
            throw error;
        }
    };


    static async findId(id) {
        try {
            const result = await models.bills.findByPk(id, {
                order: [
                    ['id', 'DESC'],
                ],
                limit: 1500,
                attributes: {
                    exclude: ["id_client", "id_seller"]
                },
                include: [
                    {
                        model: models.clients,
                        as: "client",
                        attributes: {
                            exclude: ["id_seller", "id_route_day"]
                        },
                        include: [
                            {
                                model: models.route_day,
                                as: "route_day",
                                attributes: {
                                    exclude: ["id_route","day_id","id"]
                                },
                                include: [
                                    {
                                        model: models.day,
                                        as: "day",
                                    },
                                    {
                                        model: models.route,
                                        as: "id_route_route",
                                    }
                                ]
                            },
                        ],
                    },
                    {
                        order: [
                            ['id', 'DESC'], ['balance_date', 'DESC']
                        ],
                        model: models.transaction,
                        as: "transactions",
                        include: [
                            {
                                model: models.users,
                                as: "id_user_user",
                            }
                        ]
                    },
                    {
                        model: models.sellers,
                        as: "seller",
                    },
                ],
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async searchRoute(dia) {
        try {
            const result = await models.bills.findAll({
                include: {
                    model: models.clients,
                    as: "client",

                    where: {
                        id_route: dia,
                    }
                }

            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.bills.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.bills.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = billService;