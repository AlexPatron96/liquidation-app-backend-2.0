const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return check_cash_sell.init(sequelize, DataTypes);
}

class check_cash_sell extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                autoIncrement: true,
                autoIncrementIdentity: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_check: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'check_money',
                    key: 'id'
                }
            },
            settlement_code: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'cash_sell',
                    key: 'settlement_code'
                }
            }
        }, {
            sequelize,
            tableName: 'check_cash_sell',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "check_cash_sell_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
