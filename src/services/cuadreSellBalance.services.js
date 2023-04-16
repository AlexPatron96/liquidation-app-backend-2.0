const models = require("../models/index");

class cuadreSellBalance {

    static async findAll() {
        try {
            const result = await models.cuadre_balance_seller.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.cuadre_balance_seller.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.cuadre_balance_seller.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.cuadre_balance_seller.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.cuadre_balance_seller.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = cuadreSellBalance;