const authRoutes = require("./auth.routes");
const routeRoutes = require("./route.routes");
const routeDay = require("./route-day.routes");
const vehRoutes = require("./Vehicles/vehicle.routes");
const sellerRoutes = require("./Sellers/seller.routes");
const customerRoutes = require("./Customer/customer.routes");
const billRoutes = require("./bill.routes");
const transactionRoutes = require("./transaction.routes");
const liqVehRoutes = require("./LiquidationVeh/liquiVeh.routes");
const balaceVeh = require("./Vehicles/balanceVeh.routes");
const balanceSell = require("./Sellers/balanceSell.routes");
const cuadreVehBalance = require("./Vehicles/cuadreVehBalance.routes");
const cuadreSllBalance = require("./Sellers/cuadreSellBalance.routes");
const liquiSeller = require("./LiquidationSell/liquiSeller.routes");
const liquiVeh = require("./LiquidationVeh/liquiVeh.routes");
const bankRoutes = require("./bankRoutes.routes");
const discountSell = require("./LiquidationSell/discountSell.routes");
const discountVeh = require("./LiquidationVeh/discountVeh.routes");
const expenseVeh = require("./LiquidationVeh/expenseVeh.routes");
const expenseSell = require("./LiquidationSell/expenseSell.routes");
const deliveredCred = require("./LiquidationVeh/deliveredCred.routes");
const productRet = require("./LiquidationVeh/productRet.routes");
const cashVeh = require("./LiquidationVeh/cashVeh.routes");
const cashSell = require("./LiquidationSell/cashSell.routes");
const checkMoney = require("./checkMoney.routes");
const preLiquidSell = require("./LiquidationSell/preLiqSell.routes");
const rollUser = require("./roll.routes");
const permissionsRoll = require("./permissions.routes");

const authMiddleware = require("../middlewares/auth.middlewares");

const routerApi = (app) => {
	/********************************* GROUP ONE *******************************/

	//Rutas de Autorizacion
	app.use("/api/v1/auth", authRoutes);
	//Esta ruta de auth contiene la sub rutas
	// - /api/v1/auth/register ---> para registro de usuarios
	// - /api/v1/auth/register/users ---> ver la lista de usuarios
	// - /api/v1/auth/login    ---> Logearse un usuario
	// - /api/v1/auth/user/:id/del   ---> Eliminar un usuario

	app.use("/api/v1/roll", authMiddleware, rollUser);
	// - /api/v1/roll/new  ---> Permite crear una nueva ruta
	// - /api/v1/roll/all  ---> Retorna todas las Rutas de entrega
	// - /api/v1/roll/:id/del  ---> Elimina ruta por id
	// - /api/v1/roll/:id/update  ---> EditaRuta ruta por id

	app.use("/api/v1/permissions", authMiddleware, permissionsRoll);
	// - /api/v1/permissions/new  ---> Permite crear una nueva ruta
	// - /api/v1/permissions/all  ---> Retorna todas las Rutas de entrega
	// - /api/v1/permissions/:id/del  ---> Elimina ruta por id
	// - /api/v1/permissions/:id/update  ---> EditaRuta ruta por id

	//Rutas de ruta de entrega
	app.use("/api/v1/route", authMiddleware, routeRoutes);
	// - /api/v1/route/new  ---> Permite crear una nueva ruta
	// - /api/v1/route/all  ---> Retorna todas las Rutas de entrega
	// - /api/v1/route/:id/del  ---> Elimina ruta por id
	// - /api/v1/route/:id/update  ---> EditaRuta ruta por id

	app.use("/api/v1/route-day", authMiddleware, routeDay);
	// - /api/v1/route-day/new  ---> Permite crear una nueva ruta
	// - /api/v1/route-day/all  ---> Retorna todas las Rutas de entrega
	// - /api/v1/route-day/:id/del  ---> Elimina ruta por id
	// - /api/v1/route-day/:id/update  ---> EditaRuta ruta por id

	//Rutas de vehiculos
	app.use("/api/v1/vehicles", authMiddleware, vehRoutes);
	// - /api/v1/vehicles/new  ---> Permite crear una nuevo vehiculo
	// - /api/v1/vehicles/:id  ---> Retorna veh por su  id
	// - /api/v1/vehicles/all  ---> Retorna todos los vehiculos
	// - /api/v1/vehicles/:id/del  ---> Elimina vehiculo por id
	// - /api/v1/vehicles/:id/update  ---> edita un vehiculo por id

	//Rutas de Vendedores
	app.use("/api/v1/seller", authMiddleware, sellerRoutes);
	// - /api/v1/seller/new  ---> Permite crear una nuevo Vendedor
	// - /api/v1/seller/:id  ---> Retorna un vendedor por su id
	// - /api/v1/seller/all  ---> Retorna todos los Vendedores
	// - /api/v1/seller/:id/del  ---> Elimina Un vendedor por id
	// - /api/v1/seller/:id/update  ---> edita un vendedor por id

	/********************************* GROUP TWO *******************************/

	//Rutas de Clientes
	app.use("/api/v1/customer", authMiddleware, customerRoutes);
	// - /api/v1/customer/new  ---> Permite crear una nuevo Clientes
	// - /api/v1/customers/:id  ---> Retorna un Clientes por su id
	// - /api/v1/customers/all  ---> Retorna todos los Clientes
	// - /api/v1/customers/:id/del  ---> Elimina Un Clientes por id
	// - /api/v1/customers/:id/update  ---> edita un Clientes por id

	//Rutas de Balance de vendedores
	app.use("/api/v1/balance-sell", authMiddleware, balanceSell);
	// - /api/v1/balance-sell/new  ---> Permite crear
	// - /api/v1/balance-sell/:id  ---> Retorna un item por su id
	// - /api/v1/balance-sell/all  ---> Retorna todos los item
	// - /api/v1/balance-sell/:id/del  ---> Elimina Un item por id
	// - /api/v1/balance-sell/:id/update  ---> edita un item por id

	//Rutas de Balance de vehiculo
	app.use("/api/v1/balance-veh", authMiddleware, balaceVeh);
	// - /api/v1/balance-veh/new  ---> Permite crear
	// - /api/v1/balance-veh/:id  ---> Retorna un item por su id
	// - /api/v1/balance-veh/all  ---> Retorna todos los item
	// - /api/v1/balance-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/balance-veh/:id/update  ---> edita un item por id

	//STATUS ES INSERTADO POR CONSOLA PSQL

	//Rutas de liquidacion seller
	app.use("/api/v1/liquidation-sell", authMiddleware, liquiSeller);
	// - /api/v1/liquidation-sell/new  ---> Permite crear
	// - /api/v1/liquidation-sell/:id  ---> Retorna un item por su id
	// - /api/v1/liquidation-sell/all  ---> Retorna todos los item
	// - /api/v1/liquidation-sell/:id/del  ---> Elimina Un item por id
	// - /api/v1/liquidation-sell/:id/update  ---> edita un item por id

	// //Rutas de  factutas liquidadas de vendedor o seller
	// app.use("/api/v1/liquidation-sell", liquiSeller);
	// // - /api/v1/liquidation-sell/new  ---> Permite crear
	// // - /api/v1/liquidation-sell/:id  ---> Retorna un item por su id
	// // - /api/v1/liquidation-sell/all  ---> Retorna todos los item
	// // - /api/v1/liquidation-sell/:id/del  ---> Elimina Un item por id
	// // - /api/v1/liquidation-sell/:id/update  ---> edita un item por id

	//Rutas de liquidacion Vehiculo
	app.use("/api/v1/liquidation-veh", authMiddleware, liquiVeh);
	// - /api/v1/liquidation-veh/new  ---> Permite crear
	// - /api/v1/liquidation-veh/:id  ---> Retorna un item por su id
	// - /api/v1/liquidation-veh/all  ---> Retorna todos los item
	// - /api/v1/liquidation-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/liquidation-veh/:id/update  ---> edita un item por id

	/********************************* GROUP THREE *******************************/

	//Rutas de Bancos
	app.use("/api/v1/bank", authMiddleware, bankRoutes);
	// - /api/v1/bank/new  ---> Permite crear
	// - /api/v1/bank/:id  ---> Retorna un item por su id
	// - /api/v1/bank/all  ---> Retorna todos los item
	// - /api/v1/bank/:id/del  ---> Elimina Un item por id
	// - /api/v1/bank/:id/update  ---> edita un item por id

	//Rutas de Cuadre de Balance Veh
	app.use("/api/v1/cuadre-veh", authMiddleware, cuadreVehBalance);
	// - /api/v1/cuadre-veh/new  ---> Permite crear
	// - /api/v1/cuadre-veh/:id  ---> Retorna un item por su id                             //Pendiente de corregir
	// - /api/v1/cuadre-veh/all  ---> Retorna todos los item
	// - /api/v1/cuadre-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/cuadre-veh/:id/update  ---> edita un item por id

	//Rutas de Cuadre de Balance sell
	app.use("/api/v1/cuadre-sell", authMiddleware, cuadreSllBalance);
	// - /api/v1/cuadre-sell/new  ---> Permite crear
	// - /api/v1/cuadre-sell/:id  ---> Retorna un item por su id                             //Pendiente de corregir
	// - /api/v1/cuadre-sell/all  ---> Retorna todos los item
	// - /api/v1/cuadre-sell/:id/del  ---> Elimina Un item por id
	// - /api/v1/cuadre-sell/:id/update  ---> edita un item por id

	//Rutas de Facturas
	app.use("/api/v1/invoice", authMiddleware, billRoutes);
	// - /api/v1/invoice/new  ---> Permite crear una nuevo Clientes
	// - /api/v1/invoice/:id  ---> Retorna un Clientes por su id
	// - /api/v1/invoice/all  ---> Retorna todos los Clientes
	// - /api/v1/invoice/:id/del  ---> Elimina Un Clientes por id
	// - /api/v1/invoice/:id/update  ---> edita un Clientes por id

	//Rutas de transaccion
	app.use("/api/v1/payments", authMiddleware, transactionRoutes);
	// - /api/v1/payments/new  ---> Permite crear una nuevo Pago
	// - /api/v1/payments/:id  ---> Retorna un pago por su id
	// - /api/v1/payments/all  ---> Retorna todos los pago
	// - /api/v1/payments/:id/all  ---> Retorna todos los pago x id de cliente
	// - /api/v1/payments/:id/del  ---> Elimina Un pago por id
	// - /api/v1/payments/:id/update  ---> edita un pago por id

	//Rutas de Discounts Seller
	app.use("/api/v1/discount-sell", authMiddleware, discountSell);
	// - /api/v1/discount-sell/new  ---> Permite crear
	// - /api/v1/discount-sell/:id  ---> Retorna un item por su id
	// - /api/v1/discount-sell/all  ---> Retorna todos los item
	// - /api/v1/discount-sell/:id/del  ---> Elimina Un item por id
	// - /api/v1/discount-sell/:id/update  ---> edita un item por id

	//Rutas de Discounts Vehiculo
	app.use("/api/v1/discount-veh", authMiddleware, discountVeh);
	// - /api/v1/discount-veh/new  ---> Permite crear
	// - /api/v1/discount-veh/:id  ---> Retorna un item por su id
	// - /api/v1/discount-veh/all  ---> Retorna todos los item
	// - /api/v1/discount-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/discount-veh/:id/update  ---> edita un item por id

	//Rutas de Gastos Vehiculo
	app.use("/api/v1/expense-veh", authMiddleware, expenseVeh);
	// - /api/v1/expense-veh/new  ---> Permite crear
	// - /api/v1/expense-veh/:id  ---> Retorna un item por su id
	// - /api/v1/expense-veh/all  ---> Retorna todos los item
	// - /api/v1/expense-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/expense-veh/:id/update  ---> edita un item por id

	//Rutas de gastos Seller
	app.use("/api/v1/expense-sell", authMiddleware, expenseSell);
	// - /api/v1/expense-sell/new  ---> Permite crear
	// - /api/v1/expense-sell/:id  ---> Retorna un item por su id
	// - /api/v1/expense-sell/all  ---> Retorna todos los item
	// - /api/v1/expense-sell/:id/del  ---> Elimina Un item por id
	// - /api/v1/expense-sell/:id/update  ---> edita un item por id

	//Rutas de Delivered credits
	app.use("/api/v1/delivered-cred", authMiddleware, deliveredCred);
	// - /api/v1/delivered-cred/new  ---> Permite crear
	// - /api/v1/delivered-cred/:id  ---> Retorna un item por su id
	// - /api/v1/delivered-cred/all  ---> Retorna todos los item
	// - /api/v1/delivered-cred/:id/del  ---> Elimina Un item por id
	// - /api/v1/delivered-cred/:id/update  ---> edita un item por id

	//Rutas de Product Returned
	app.use("/api/v1/product-returned", authMiddleware, productRet);
	// - /api/v1/product-returned/new  ---> Permite crear
	// - /api/v1/product-returned/:id  ---> Retorna un item por su id
	// - /api/v1/product-returned/all  ---> Retorna todos los item
	// - /api/v1/product-returned/:id/del  ---> Elimina Un item por id
	// - /api/v1/product-returned/:id/update  ---> edita un item por id

	//Rutas de Cash Veh
	app.use("/api/v1/cash-veh", authMiddleware, cashVeh);
	// - /api/v1/cash-veh/new  ---> Permite crear
	// - /api/v1/cash-veh/:id  ---> Retorna un item por su id
	// - /api/v1/cash-veh/all  ---> Retorna todos los item
	// - /api/v1/cash-veh/:id/del  ---> Elimina Un item por id
	// - /api/v1/cash-veh/:id/update  ---> edita un item por id

	//Rutas de Cash Seller
	app.use("/api/v1/cash-seller", authMiddleware, cashSell);
	// - /api/v1/cash-seller/new  ---> Permite crear
	// - /api/v1/cash-seller/:id  ---> Retorna un item por su id
	// - /api/v1/cash-seller/all  ---> Retorna todos los item
	// - /api/v1/cash-seller/:id/del  ---> Elimina Un item por id
	// - /api/v1/cash-seller/:id/update  ---> edita un item por id

	//Rutas de Check money
	app.use("/api/v1/check-money", authMiddleware, checkMoney);
	// - /api/v1/check-money/new  ---> Permite crear
	// - /api/v1/check-money/:id  ---> Retorna un item por su id
	// - /api/v1/check-money/all  ---> Retorna todos los item
	// - /api/v1/check-money/:id/del  ---> Elimina Un item por id
	// - /api/v1/check-money/:id/update  ---> edita un item por id

	//Rutas de PreLiquidacion de Seller
	app.use("/api/v1/pre-liquidation/seller", authMiddleware, preLiquidSell);
	// - /api/v1/pre-liquidation/seller/new  ---> Permite crear una nueva Liquidacion de vehiculo
	// - /api/v1/pre-liquidation/seller/:i--> Retorna una liquidacion de veh por su id
	// - /api/v1/pre-liquidation/seller/all  ---> Retorna todos las liquidaciones de vehiculo
	// - /api/v1/pre-liquidation/seller/:id/del  ---> Elimina Un  por id
	// - /api/v1/pre-liquidation/seller/:id/update  ---> edita un  por id
};

module.exports = routerApi;
