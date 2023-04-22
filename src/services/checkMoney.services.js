const models = require("../models/index");

class checkMoney {

    static async findAll() {
        try {
            const result = await models.check_money.findAll(
                // {
                //     include: [
                //         {
                //             model: models.day,
                //             as: "day"
                //         },
                //         {
                //             model: models.route,
                //             as: "route"
                //         }
                //     ]
                // }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.check_money.findByPk(id, {
                // include: [
                //     {
                //         model: models.day,
                //         as: "day"
                //     },
                //     {
                //         model: models.route,
                //         as: "route"
                //     }
                // ]
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.check_money.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async createCheckCashVeh(data) {
        try {
            const result = await models.check_cash_veh.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async createCheckCashSell(data) {
        try {
            const result = await models.check_cash_sell.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async createCheckCashSell(data) {
        try {
            const result = await models.check_cash_sell.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.check_money.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.check_money.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async lastRegister() {
        try {
            const result = await models.check_money.findAll(
                {
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    limit: 1
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = checkMoney;