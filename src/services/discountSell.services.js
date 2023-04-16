const models = require("../models/index");

class discountSell {

    static async findAll() {
        try {
            const result = await models.discounts_sell.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.discounts_sell.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.discounts_sell.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.discounts_sell.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.discounts_sell.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = discountSell;