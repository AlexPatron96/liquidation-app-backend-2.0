const models = require("../models/index");


class balanceSellService {

    static async findAll() {
        try {
            const result = await models.balance_sell.findAll({
                attributes: {
                    exclude: ["id_seller"]
                },
                include: {
                    model: models.sellers,
                    as: "seller",
                    attributes: {
                        exclude: ["id_route"]
                    },
                    include: {
                        model: models.route,
                        as: "route",
                    }
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.balance_sell.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.balance_sell.findByPk(id, {
                attributes: {
                    exclude: ["id_seller"]
                },
                include: {
                    model: models.sellers,
                    as: "seller",
                    attributes: {
                        exclude: ["id_route"]
                    },
                    include: {
                        model: models.route,
                        as: "route",
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
            const result = await models.balance_sell.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.balance_sell.update(data, { where: { id } });
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

module.exports = balanceSellService;