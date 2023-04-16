const models = require("../models/index");

class cuadreVehBalance {

    static async findAll() {
        try {
            const result = await models.cuadre_balance_veh.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.cuadre_balance_veh.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.cuadre_balance_veh.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.cuadre_balance_veh.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.cuadre_balance_veh.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = cuadreVehBalance;