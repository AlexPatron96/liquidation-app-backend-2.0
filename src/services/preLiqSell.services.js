const models = require("../models/index");


class liquiSeller {

    static async findAll() {
        try {
            const result = await models.pre_liquidations.findAll({
                order: [
                    ['id', 'DESC'],
                    ['pre_Date', 'DESC']
                ],
                include: [
                    {
                        model: models.sellers,
                        as: "id_seller_seller"
                    },
                    {
                        model: models.bills_pre,
                        as: "bills_pres",
                        include: [
                            {
                                model: models.bills,
                                as: "id_bill_bill",
                                include: [
                                    {
                                        model: models.clients,
                                        as: "client"
                                    }
                                ]
                            }
                        ]

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
            const result = await models.pre_liquidations.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async billPreLiquidationCreate(data) {
        try {
            const result = await models.bills_pre.bulkCreate(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
    // static async invoiceLiquidatedAll() {
    //     try {
    //         const result = await models.bills_pre_liquidations.findAll();
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // };
    // static async invoiceLiquidatedDeleteID(id) {
    //     try {
    //         const result = await models.bills_pre_liquidations.destroy({where: { id_liquidation: id}});
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    static async findId(id) {
        try {
            const result = await models.pre_liquidations.findByPk(id, {

            });
            return result;
        } catch (error) {
            throw error;
        }
    };


    static async delete(id) {
        try {
            const result = await models.pre_liquidations.destroy({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async update(id, data) {
        try {
            const result = await models.pre_liquidations.update(data, { where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = liquiSeller;