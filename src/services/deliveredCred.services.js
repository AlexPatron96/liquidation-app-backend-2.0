const models = require("../models/index");

class deliveredCred {

    static async findAll() {
        try {
            const result = await models.delivered_credits.findAll(
                
            );
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async findId(id) {
        try {
            const result = await models.delivered_credits.findByPk(id, {
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(data) {
        try {
            const result = await models.delivered_credits.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async delete(id) {
        try {
            const result = await models.delivered_credits.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.delivered_credits.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = deliveredCred;