const DataTypes = require("sequelize").DataTypes;

const _permissions = require("./permissions");
const _roll = require("./roll");
const _balance_sell = require("./balance_sell");
const _balance_veh = require("./balance_veh");
const _bank = require("./bank");
const _bills = require("./bills");
const _bills_liquidation_sellers = require("./bills_liquidation_sellers");
const _bills_liquidation_veh = require("./bills_liquidation_veh");
const _bills_pre = require("./bills_pre");
const _cash_sell = require("./cash_sell");
const _cash_veh = require("./cash_veh");
const _check_money = require("./check_money");
const _clients = require("./clients");
const _cuadre_balance_seller = require("./cuadre_balance_seller");
const _cuadre_balance_veh = require("./cuadre_balance_veh");
const _day = require("./day");
const _delivered_credits = require("./delivered_credits");
const _check_cash_veh = require("./check_cash_veh");
const _check_cash_sell = require("./check_cash_sell");
// const _deposits_money = require("./deposits_money");
const _discounts_sell = require("./discounts_sell");
const _discounts_veh = require("./discounts_veh");
const _expense_sell = require("./expense_sell");
const _expense_veh = require("./expense_veh");
const _liquidation_sellers = require("./liquidation_sellers");
const _liquidation_veh = require("./liquidation_veh");
const _pre_liquidations = require("./pre_liquidations");
const _products_returned = require("./products_returned");
const _bill_product_return = require("./bill_product_return");
const _route = require("./route");
const _route_day = require("./route_day");
const _sellers = require("./sellers");
const _status = require("./status");
const _transaction = require("./transaction");
const _users = require("./users");
const _vehicles = require("./vehicles");

function initModels(sequelize) {
	const permissions = _permissions(sequelize, DataTypes);
	const roll = _roll(sequelize, DataTypes);

	const route = _route(sequelize, DataTypes);
	const day = _day(sequelize, DataTypes);
	const route_day = _route_day(sequelize, DataTypes);
	const sellers = _sellers(sequelize, DataTypes);
	const clients = _clients(sequelize, DataTypes);
	const vehicles = _vehicles(sequelize, DataTypes);
	const status = _status(sequelize, DataTypes);
	const bills = _bills(sequelize, DataTypes);
	const users = _users(sequelize, DataTypes);
	const transaction = _transaction(sequelize, DataTypes);
	const liquidation_veh = _liquidation_veh(sequelize, DataTypes);
	const liquidation_sellers = _liquidation_sellers(sequelize, DataTypes);
	const bank = _bank(sequelize, DataTypes);
	const cash_sell = _cash_sell(sequelize, DataTypes);
	const cash_veh = _cash_veh(sequelize, DataTypes);
	const balance_veh = _balance_veh(sequelize, DataTypes);
	const balance_sell = _balance_sell(sequelize, DataTypes);
	const products_returned = _products_returned(sequelize, DataTypes);
	const pre_liquidations = _pre_liquidations(sequelize, DataTypes);
	const bills_liquidation_veh = _bills_liquidation_veh(sequelize, DataTypes);
	const expense_veh = _expense_veh(sequelize, DataTypes);
	const expense_sell = _expense_sell(sequelize, DataTypes);
	const discounts_veh = _discounts_veh(sequelize, DataTypes);
	const discounts_sell = _discounts_sell(sequelize, DataTypes);
	// const deposits_money = _deposits_money(sequelize, DataTypes);
	const delivered_credits = _delivered_credits(sequelize, DataTypes);
	const cuadre_balance_veh = _cuadre_balance_veh(sequelize, DataTypes);
	const cuadre_balance_seller = _cuadre_balance_seller(sequelize, DataTypes);
	const check_money = _check_money(sequelize, DataTypes);
	const check_cash_veh = _check_cash_veh(sequelize, DataTypes);
	const check_cash_sell = _check_cash_sell(sequelize, DataTypes);
	const bills_pre = _bills_pre(sequelize, DataTypes);
	const bills_liquidation_sellers = _bills_liquidation_sellers(
		sequelize,
		DataTypes
	);
	const bill_product_return = _bill_product_return(sequelize, DataTypes);

	roll.belongsTo(permissions, {
		as: "permissions",
		foreignKey: "id_permissions",
	});
	permissions.hasOne(roll, { as: "rolls", foreignKey: "id_permissions" });

	users.belongsTo(roll, {
		as: "roll",
		foreignKey: "id_roll",
	});
	roll.hasOne(users, {
		as: "users",
		foreignKey: "id_roll",
	});

	cuadre_balance_seller.belongsTo(balance_sell, {
		as: "id_balance_balance_sell",
		foreignKey: "id_balance",
	});
	balance_sell.hasMany(cuadre_balance_seller, {
		as: "cuadre_balance_sellers",
		foreignKey: "id_balance",
	});

	cuadre_balance_veh.belongsTo(balance_veh, {
		as: "id_balance_balance_veh",
		foreignKey: "id_balance",
	});
	balance_veh.hasMany(cuadre_balance_veh, {
		as: "cuadre_balance_vehs",
		foreignKey: "id_balance",
	});

	check_money.belongsTo(bank, { as: "id_bank_bank", foreignKey: "id_bank" });
	bank.hasMany(check_money, { as: "check_moneys", foreignKey: "id_bank" });

	bills_liquidation_sellers.belongsTo(bills, {
		as: "id_bills_bill",
		foreignKey: "id_bills",
	});
	bills.hasMany(bills_liquidation_sellers, {
		as: "bills_liquidation_sellers",
		foreignKey: "id_bills",
	});

	bills_liquidation_veh.belongsTo(bills, {
		as: "id_bills_bill",
		foreignKey: "id_bills",
	});
	bills.hasMany(bills_liquidation_veh, {
		as: "bills_liquidation_vehs",
		foreignKey: "id_bills",
	});

	bills_pre.belongsTo(bills, { as: "id_bill_bill", foreignKey: "id_bill" });
	bills.hasMany(bills_pre, { as: "bills_pres", foreignKey: "id_bill" });

	transaction.belongsTo(bills, { as: "num_bill_bill", foreignKey: "id_bill" });
	bills.hasMany(transaction, { as: "transactions", foreignKey: "id_bill" });

	check_cash_sell.belongsTo(check_money, {
		as: "check_sell",
		foreignKey: "id_check",
	});
	check_money.hasMany(check_cash_sell, {
		as: "check_cash_sell",
		foreignKey: "id_check",
	});

	check_cash_veh.belongsTo(check_money, {
		as: "check_veh",
		foreignKey: "id_check",
	});
	check_money.hasMany(check_cash_veh, {
		as: "check_cash_veh",
		foreignKey: "id_check",
	});

	check_cash_veh.belongsTo(cash_veh, {
		as: "cash_veh",
		foreignKey: "settlement_code",
	});
	cash_veh.hasMany(check_cash_veh, {
		as: "check_cash_veh",
		foreignKey: "settlement_code",
	});

	check_cash_sell.belongsTo(cash_sell, {
		as: "cash_sell",
		foreignKey: "settlement_code",
	});
	cash_sell.hasMany(check_cash_sell, {
		as: "check_cash_sell",
		foreignKey: "settlement_code",
	});

	check_money.belongsTo(clients, {
		as: "id_client_client",
		foreignKey: "id_client",
	});
	clients.hasMany(check_money, { as: "check_moneys", foreignKey: "id_client" });

	bills.belongsTo(clients, { as: "client", foreignKey: "id_client" });
	clients.hasMany(bills, { as: "bills", foreignKey: "id_client" });

	route_day.belongsTo(day, { as: "day", foreignKey: "day_id" });
	day.hasMany(route_day, { as: "route_days", foreignKey: "day_id" });

	//Verificar---------------
	bills_liquidation_sellers.belongsTo(liquidation_sellers, {
		as: "id_liquidation_liquidation_seller",
		foreignKey: "id_liquidation",
	});
	liquidation_sellers.hasMany(bills_liquidation_sellers, {
		as: "bills_liquidation_sellers",
		foreignKey: "id_liquidation",
	});

	cash_sell.belongsTo(liquidation_sellers, {
		as: "liquidation_seller",
		foreignKey: "settlement_code",
	});
	liquidation_sellers.hasMany(cash_sell, {
		as: "cash_sell",
		foreignKey: "settlement_code",
	});

	discounts_sell.belongsTo(liquidation_sellers, {
		as: "liquidation_seller",
		foreignKey: "settlement_code",
	});
	liquidation_sellers.hasMany(discounts_sell, {
		as: "discounts_sell",
		foreignKey: "settlement_code",
	});

	expense_sell.belongsTo(liquidation_sellers, {
		as: "liquidation_seller",
		foreignKey: "settlement_code",
	});
	liquidation_sellers.hasMany(expense_sell, {
		as: "expense_sell",
		foreignKey: "settlement_code",
	});
	//-------------------------

	//Verificar---------------
	bills_liquidation_veh.belongsTo(liquidation_veh, {
		as: "id_liquidation_liquidation_veh",
		foreignKey: "id_liquidation",
	});
	liquidation_veh.hasMany(bills_liquidation_veh, {
		as: "bills_liquidation_vehs",
		foreignKey: "id_liquidation",
	});

	cash_veh.belongsTo(liquidation_veh, {
		as: "liquidation_veh",
		foreignKey: "settlement_code",
	});
	liquidation_veh.hasOne(cash_veh, {
		as: "cash_veh",
		foreignKey: "settlement_code",
	});

	delivered_credits.belongsTo(liquidation_veh, {
		as: "liquidation_veh",
		foreignKey: "settlement_code",
	});
	liquidation_veh.hasMany(delivered_credits, {
		as: "delivered_credits",
		foreignKey: "settlement_code",
	});

	discounts_veh.belongsTo(liquidation_veh, {
		as: "liquidation_veh",
		foreignKey: "settlement_code",
	});
	liquidation_veh.hasOne(discounts_veh, {
		as: "discounts_veh",
		foreignKey: "settlement_code",
	});

	expense_veh.belongsTo(liquidation_veh, {
		as: "liquidation_veh",
		foreignKey: "settlement_code",
	});
	liquidation_veh.hasOne(expense_veh, {
		as: "expense_veh",
		foreignKey: "settlement_code",
	});

	products_returned.belongsTo(liquidation_veh, {
		as: "liquidation_veh",
		foreignKey: "settlement_code",
	});
	liquidation_veh.hasOne(products_returned, {
		as: "products_returned",
		foreignKey: "settlement_code",
	});

	bill_product_return.belongsTo(bills, {
		as: "id_bills_bill",
		foreignKey: "id_bills",
	});
	bills.hasMany(bill_product_return, {
		as: "bill_product_return",
		foreignKey: "id_bills",
	});

	bill_product_return.belongsTo(products_returned, {
		as: "id_products_returned",
		foreignKey: "settlement_code",
	});
	products_returned.hasMany(bill_product_return, {
		as: "bill_product_return",
		foreignKey: "settlement_code",
	});

	//************************************ */

	bills_pre.belongsTo(pre_liquidations, {
		as: "id_pre_liquidation_pre_liquidation",
		foreignKey: "id_pre_liquidation",
	});
	pre_liquidations.hasMany(bills_pre, {
		as: "bills_pres",
		foreignKey: "id_pre_liquidation",
	});

	route_day.belongsTo(route, { as: "id_route_route", foreignKey: "id_route" });
	route.hasMany(route_day, { as: "route_days", foreignKey: "id_route" });

	clients.belongsTo(route_day, { as: "route_day", foreignKey: "id_route_day" });
	route_day.hasMany(clients, { as: "clients", foreignKey: "id_route_day" });

	sellers.belongsTo(route, { as: "route", foreignKey: "id_route" });
	route.hasOne(sellers, { as: "seller", foreignKey: "id_route" });

	vehicles.belongsTo(route, { as: "route", foreignKey: "id_route" });
	route.hasMany(vehicles, { as: "vehicle", foreignKey: "id_route" });

	balance_sell.belongsTo(sellers, { as: "seller", foreignKey: "id_seller" });
	sellers.hasOne(balance_sell, { as: "balance_sell", foreignKey: "id_seller" });

	bills.belongsTo(sellers, { as: "seller", foreignKey: "id_seller" });
	sellers.hasMany(bills, { as: "bills", foreignKey: "id_seller" });

	clients.belongsTo(sellers, { as: "seller", foreignKey: "id_seller" });
	sellers.hasMany(clients, { as: "clients", foreignKey: "id_seller" });

	delivered_credits.belongsTo(sellers, { as: "seller", foreignKey: "id_seller" });
	sellers.hasMany(delivered_credits, {
		as: "delivered_credits",
		foreignKey: "id_seller",
	});

	liquidation_sellers.belongsTo(sellers, {
		as: "seller",
		foreignKey: "id_seller",
	});
	sellers.hasMany(liquidation_sellers, {
		as: "liquidation_sellers",
		foreignKey: "id_seller",
	});

	pre_liquidations.belongsTo(sellers, {
		as: "id_seller_seller",
		foreignKey: "id_seller",
	});
	sellers.hasMany(pre_liquidations, {
		as: "pre_liquidations",
		foreignKey: "id_seller",
	});

	bills.belongsTo(status, { as: "id_status_status", foreignKey: "id_status" });
	status.hasMany(bills, { as: "bills", foreignKey: "id_status" });

	liquidation_sellers.belongsTo(users, { as: "user", foreignKey: "id_user" });
	users.hasMany(liquidation_sellers, {
		as: "liquidation_sellers",
		foreignKey: "id_user",
	});

	liquidation_veh.belongsTo(users, { as: "user", foreignKey: "id_user" });
	users.hasMany(liquidation_veh, {
		as: "liquidation_vehs",
		foreignKey: "id_user",
	});

	transaction.belongsTo(users, { as: "id_user_user", foreignKey: "id_user" });
	users.hasMany(transaction, { as: "transactions", foreignKey: "id_user" });

	balance_veh.belongsTo(vehicles, { as: "vehicle", foreignKey: "id_veh" });
	vehicles.hasOne(balance_veh, { as: "balance_veh", foreignKey: "id_veh" });

	liquidation_veh.belongsTo(vehicles, {
		as: "vehicle",
		foreignKey: "id_vehicle",
	});
	vehicles.hasMany(liquidation_veh, {
		as: "liquidation_vehs",
		foreignKey: "id_vehicle",
	});

	return {
		permissions,
		roll,
		balance_sell,
		balance_veh,
		bank,
		bills,
		bills_liquidation_sellers,
		bills_liquidation_veh,
		bills_pre,
		cash_sell,
		cash_veh,
		check_money,
		clients,
		cuadre_balance_seller,
		cuadre_balance_veh,
		day,
		delivered_credits,
		check_cash_veh,
		check_cash_sell,
		// deposits_money,
		discounts_sell,
		discounts_veh,
		expense_sell,
		expense_veh,
		liquidation_sellers,
		liquidation_veh,
		pre_liquidations,
		products_returned,
		bill_product_return,
		route,
		route_day,
		sellers,
		status,
		transaction,
		users,
		vehicles,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
