const models = require("../models/index");
const checkMoney = require("./checkMoney.services");


class cashSell {

    static async findAll() {
        try {
            const result = await models.cash_sell.findAll({
                include: [
                    {
                        model: models.check_money,
                        as: 'check_moneys'
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
            const result = await models.cash_sell.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.cash_sell.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.cash_sell.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.cash_sell.update(data, { where: { id } });
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

module.exports = cashSell;