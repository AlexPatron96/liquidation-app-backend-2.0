const db = require("../utils/database");
const Day = require("../models/day");
const Status = require("../models/status");
const Routes = require("../models/route");
const RoutesDay = require("../models/route_day");
// const user = require("../models/users");
const models = require("../models/index");
// const users = require("../models/users");

const user = [
	{
		fullname: "Alex Patron",
		username: "AlexPG",
		dni: "0850320078",
		mail: "alex.patron1996@hotmail.com",
		password: "alex1234",
		id_roll: 1,
	},
];
const permissions = [
	{
		name_permissions: "Permisos Generales",
		create_newroll: true,
		create_newpermissions: true,
		create_user: true,
		create_seller: true,
		create_vehicle: true,
		edited_seller_maxtotal: true,
	},
];
const roll = [
	{
		rol_user: "Administrador",
		isActive: true,
		id_permissions: 1,
	},
];

const days = [
	{ day: "lunes" },
	{ day: "martes" },
	{ day: "miercoles" },
	{ day: "jueves" },
	{ day: "viernes" },
	{ day: "sabado" },
	{ day: "domingo" },
	{ day: "todos" },
];

const status = [{ name: "pendiente" }, { name: "abonada" }, { name: "pagada" }];

const routes = [
	{ name: "RUTA G", external_code: "M0", detail: "General Todas las rutas" },
	{ name: "RUTA 1", external_code: "M1", detail: "ok" },
	{ name: "RUTA 2", external_code: "M2", detail: "ok" },
	{ name: "RUTA 3", external_code: "M3", detail: "ok" },
	{ name: "RUTA 4", external_code: "M4", detail: "ok" },
	{ name: "RUTA 5", external_code: "M5", detail: "ok" },
	{ name: "RUTA 6", external_code: "M6", detail: "ok" },
	{ name: "RUTA 7", external_code: "M7", detail: "ok" },
	{ name: "RUTA 8", external_code: "M8", detail: "ok" },
	{ name: "RUTA 9", external_code: "M9", detail: "ok" },
];

const routesDay = [
	{ id_route: "1", day_id: "8" },

	{ id_route: "2", day_id: "1" },
	{ id_route: "2", day_id: "2" },
	{ id_route: "2", day_id: "3" },
	{ id_route: "2", day_id: "4" },
	{ id_route: "2", day_id: "5" },

	{ id_route: "3", day_id: "1" },
	{ id_route: "3", day_id: "2" },
	{ id_route: "3", day_id: "3" },
	{ id_route: "3", day_id: "4" },
	{ id_route: "3", day_id: "5" },

	{ id_route: "4", day_id: "1" },
	{ id_route: "4", day_id: "2" },
	{ id_route: "4", day_id: "3" },
	{ id_route: "4", day_id: "4" },
	{ id_route: "4", day_id: "5" },

	{ id_route: "5", day_id: "1" },
	{ id_route: "5", day_id: "2" },
	{ id_route: "5", day_id: "3" },
	{ id_route: "5", day_id: "4" },
	{ id_route: "5", day_id: "5" },

	{ id_route: "6", day_id: "1" },
	{ id_route: "6", day_id: "2" },
	{ id_route: "6", day_id: "3" },
	{ id_route: "6", day_id: "4" },
	{ id_route: "6", day_id: "5" },

	{ id_route: "7", day_id: "1" },
	{ id_route: "7", day_id: "2" },
	{ id_route: "7", day_id: "3" },
	{ id_route: "7", day_id: "4" },
	{ id_route: "7", day_id: "5" },

	{ id_route: "8", day_id: "1" },
	{ id_route: "8", day_id: "2" },
	{ id_route: "8", day_id: "3" },
	{ id_route: "8", day_id: "4" },
	{ id_route: "8", day_id: "5" },

	{ id_route: "9", day_id: "1" },
	{ id_route: "9", day_id: "2" },
	{ id_route: "9", day_id: "3" },
	{ id_route: "9", day_id: "4" },
	{ id_route: "9", day_id: "5" },

	{ id_route: "10", day_id: "1" },
	{ id_route: "10", day_id: "2" },
	{ id_route: "10", day_id: "3" },
	{ id_route: "10", day_id: "4" },
	{ id_route: "10", day_id: "5" },
];

db.sync({ force: true })
	.then(() => {
		console.log("Iniciando Sembrado de Informacion");
		days.forEach((day) => models.day.create(day));
		console.log("A sembrado Days...");

		setTimeout(() => {
			status.forEach((statu) => models.status.create(statu));
			console.log("A sembrado Status...");
		}, [1000]);

		setTimeout(() => {
			routes.forEach((rout) => models.route.create(rout));
			console.log("A sembrado Rutas...");
		}, [2000]);

		setTimeout(() => {
			routesDay.forEach((rotDay) => models.route_day.create(rotDay));
			console.log("A sembrado RouteDay...");
		}, [3000]);

		setTimeout(() => {
			permissions.forEach((permit) => models.permissions.create(permit));
			console.log("A sembrado los permisos...");
		}, [4000]);

		setTimeout(() => {
			roll.forEach((rolling) => models.roll.create(rolling));
			console.log("A sembrado los rolles de usuarios...");
		}, [5000]);

		setTimeout(() => {
			user.forEach((user) => models.users.create(user));
			console.log("A sembrado user...");
			console.log("A Teminado el sembrado de la base de datos...");
			console.log("Culminando...");
		}, [6000]);
	})
	.catch((error) => console.log(error));
