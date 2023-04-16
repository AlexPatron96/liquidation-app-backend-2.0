const models = require("../models/index");


class bankService {

    static async findAll() {
        try {
            const result = await models.bank.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.bank.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.bank.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.bank.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.bank.update(data, { where: { id } });
            console.log(result);
            if (result[0] !== 0) {
                console.log("es cero");
                return { ok: true, result };
            } else {
                return { ok: false, message: "No se pudo actualizar el item" }
            }
        } catch (error) {
            throw error;
        }
    };
};

module.exports = bankService;