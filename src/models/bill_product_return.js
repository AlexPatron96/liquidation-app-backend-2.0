const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return bill_product_return.init(sequelize, DataTypes);
}

class bill_product_return extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                autoIncrementIdentity: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_bills: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'bills',
                    key: 'id'
                }
            },
            settlement_code: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'products_returned',
                    key: 'settlement_code'
                }
            }
        }, {
            sequelize,
            tableName: 'bill_product_return',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "bill_product_return_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
