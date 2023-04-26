const models = require("../models/index");


class liquidationVeh {

    static async findAll() {
        try {
            const result = await models.liquidation_veh.findAll({
                attributes: {
                    exclude: ["id_user", "id_vehicle"]
                },
                include: [
                    {
                        model: models.users,
                        as: "user",
                        attributes: {
                            exclude: ["mail", "password"]
                        }
                    }, {
                        model: models.vehicles,
                        as: "vehicle",
                        attributes: {
                            exclude: ["id_route"]
                        },
                        include: [
                            {
                                model: models.route,
                                as: "route"
                            }
                        ]
                    }, {
                        model: models.discounts_veh,
                        as: "discounts_veh",
                    }, {
                        model: models.expense_veh,
                        as: "expense_veh"
                    }, {
                        model: models.cash_veh,
                        as: "cash_veh",
                        include: [
                            {
                                model: models.check_cash_veh,
                                as: "check_cash_veh",
                                include: [
                                    {
                                        model: models.check_money,
                                        as: "check_veh",
                                    }
                                ]
                            },
                        ]
                    }, {
                        model: models.products_returned,
                        as: "products_returned",
                        include: [
                            {
                                model: models.bill_product_return,
                                as: "bill_product_return",
                                include: [
                                    {
                                        model: models.bills,
                                        as: "id_bills_bill",
                                    }
                                ]
                            }
                        ]
                    }, {
                        model: models.bills_liquidation_veh,
                        as: "bills_liquidation_vehs",
                        include: [
                            {
                                model: models.bills,
                                as: "id_bills_bill",
                                include: [
                                    {
                                        model: models.clients,
                                        as: "client"
                                    },
                                    {
                                        model: models.transaction,
                                        as: "transactions"
                                    },
                                ]
                            }
                        ]
                    }, {
                        model: models.delivered_credits,
                        as: "delivered_credits",
                        attributes: {
                            exclude: ["id_seller"]
                        },
                        include: {
                            model: models.sellers,
                            as: "seller",
                        }
                    }
                    // , {
                    //     model: models.products_returned,
                    //     as: "products_returned",
                    // }
                    // , {
                    //     model: models.cash_veh,
                    //     as: "cash_veh",
                    // }
                ],
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.liquidation_veh.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async invoiceLiquidated(data) {
        try {
            const result = await models.bills_liquidation_veh.bulkCreate(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async invoiceLiquidatedAll() {
        try {
            const result = await models.bills_liquidation_veh.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async invoiceLiquidatedDeleteID(id) {
        try {
            const result = await models.bills_liquidation_veh.destroy({ where: { id_liquidation: id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.liquidation_veh.findByPk(id, {
                attributes: {
                    exclude: ["id_user", "id_vehicle"]
                },
                include: [
                    {
                        model: models.discounts_veh,
                        as: "discounts_veh",
                    },
                    {
                        model: models.users,
                        as: "user",
                        attributes: {
                            exclude: ["mail", "password"]
                        }
                    }, {
                        model: models.vehicles,
                        as: "vehicle",
                        attributes: {
                            exclude: ["id_route"]
                        },
                        include: [
                            {
                                model: models.route,
                                as: "route"
                            }
                        ]
                    }, {
                        model: models.expense_veh,
                        as: "expense_veh"
                    }, {
                        model: models.delivered_credits,
                        as: "delivered_credits",
                        attributes: {
                            exclude: ["id_seller"]
                        },
                        include: {
                            model: models.sellers,
                            as: "seller",
                        }
                    }, {
                        model: models.products_returned,
                        as: "products_returned",
                    }
                ],
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async idAll(id) {
        try {
            const result = await models.liquidation_veh.findAndCountAll(id);
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.liquidation_veh.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.liquidation_veh.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = liquidationVeh;