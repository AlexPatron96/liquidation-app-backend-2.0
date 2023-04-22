const models = require("../models/index");


class productRet {

    static async findAll() {
        try {
            const result = await models.products_returned.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.products_returned.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
    static async createBillProducRt(data) {
        try {
            const result = await models.bill_product_return.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.products_returned.findByPk(id);
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.products_returned.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.products_returned.update(data, { where: { id } });
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

module.exports = productRet;