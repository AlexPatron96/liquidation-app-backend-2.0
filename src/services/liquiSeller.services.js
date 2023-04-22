const models = require("../models/index");


class liquiSeller {

    static async findAll() {
        try {
            const result = await models.liquidation_sellers.findAll({
                attributes: {
                    exclude: ["id_user", "id_seller"]
                },
                limit: 500,
                include: [
                    {
                        model: models.users,
                        as: "user",
                        attributes: {
                            exclude: ["mail", "password"]
                        }
                    }, {
                        model: models.sellers,
                        as: "seller",
                        attributes: {
                            exclude: ["id_route"]
                        },
                        include: [
                            {
                                model: models.route,
                                as: "route"
                            }
                        ]
                    },
                    {
                        model: models.bills_liquidation_sellers,
                        as: "bills_liquidation_sellers",
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
                    },
                    {
                        model: models.discounts_sell,
                        as: "discounts_sell"
                    },
                    {
                        model: models.expense_sell,
                        as: "expense_sell"
                    },
                    {
                        model: models.cash_sell,
                        as: "cash_sell",
                        include: [
                            {
                                model: models.check_cash_sell,
                                as: "check_cash_sell",
                                include: [
                                    {
                                        model: models.check_money,
                                        as: "check_sell",
                                        include: [
                                            {
                                                model: models.clients,
                                                as: "id_client_client",
                                            },
                                            {
                                                model: models.bank,
                                                as: "id_bank_bank",
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],

            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.liquidation_sellers.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async invoiceLiquidated(data) {
        try {
            const result = await models.bills_liquidation_sellers.bulkCreate(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async invoiceLiquidatedAll() {
        try {
            const result = await models.bills_liquidation_sellers.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async invoiceLiquidatedDeleteID(id) {
        try {
            const result = await models.bills_liquidation_sellers.destroy({ where: { id_liquidation: id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.liquidation_sellers.findByPk(id, {
                attributes: {
                    exclude: ["id_user", "id_seller"]
                },
                include: [
                    {
                        model: models.users,
                        as: "user",
                        attributes: {
                            exclude: ["mail", "password"]
                        }
                    }, {
                        model: models.sellers,
                        as: "seller",
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
                        model: models.discounts_sell,
                        as: "discounts_sell"
                    }, {
                        model: models.expense_sell,
                        as: "expense_sell"
                    }, {
                        model: models.cash_sell,
                        as: "cash_sell"
                    }
                ],
            });
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.liquidation_sellers.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.liquidation_sellers.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = liquiSeller;