const db = require('../utils/database');
const Day = require('../models/day');
const Status = require('../models/status');
const Routes = require('../models/route');
const RoutesDay = require('../models/route_day');
const models  =  require('../models/index');

const days = [
    { day: 'lunes' },
    { day: 'martes' },
    { day: 'miercoles' },
    { day: 'jueves' },
    { day: 'viernes' },
    { day: 'sabado' },
    { day: 'domingo' },
];

const status = [
    { name: "pendiente" },
    { name: "abonada" },
    { name: "pagada" }
];

const routes = [
    { name: 'RUTA 1', external_code: 'M1', detail: 'ok' },
    { name: 'RUTA 2', external_code: 'M2', detail: 'ok' },
    { name: 'RUTA 3', external_code: 'M3', detail: 'ok' },
    { name: 'RUTA 4', external_code: 'M4', detail: 'ok' },
    { name: 'RUTA 5', external_code: 'M5', detail: 'ok' },
    { name: 'RUTA 6', external_code: 'M6', detail: 'ok' },
    { name: 'RUTA 7', external_code: 'M7', detail: 'ok' },
    { name: 'RUTA 8', external_code: 'M8', detail: 'ok' },
    { name: 'RUTA 9', external_code: 'M9', detail: 'ok' }
];

const routesDay = [
    { id_route: '1', day_id: '1' },
    { id_route: '1', day_id: '2' },
    { id_route: '1', day_id: '3' },
    { id_route: '1', day_id: '4' },
    { id_route: '1', day_id: '5' },

    { id_route: '2', day_id: '1' },
    { id_route: '2', day_id: '2' },
    { id_route: '2', day_id: '3' },
    { id_route: '2', day_id: '4' },
    { id_route: '2', day_id: '5' },

    { id_route: '3', day_id: '1' },
    { id_route: '3', day_id: '2' },
    { id_route: '3', day_id: '3' },
    { id_route: '3', day_id: '4' },
    { id_route: '3', day_id: '5' },

    { id_route: '4', day_id: '1' },
    { id_route: '4', day_id: '2' },
    { id_route: '4', day_id: '3' },
    { id_route: '4', day_id: '4' },
    { id_route: '4', day_id: '5' },

    { id_route: '5', day_id: '1' },
    { id_route: '5', day_id: '2' },
    { id_route: '5', day_id: '3' },
    { id_route: '5', day_id: '4' },
    { id_route: '5', day_id: '5' },

    { id_route: '6', day_id: '1' },
    { id_route: '6', day_id: '2' },
    { id_route: '6', day_id: '3' },
    { id_route: '6', day_id: '4' },
    { id_route: '6', day_id: '5' },

    { id_route: '7', day_id: '1' },
    { id_route: '7', day_id: '2' },
    { id_route: '7', day_id: '3' },
    { id_route: '7', day_id: '4' },
    { id_route: '7', day_id: '5' },

    { id_route: '8', day_id: '1' },
    { id_route: '8', day_id: '2' },
    { id_route: '8', day_id: '3' },
    { id_route: '8', day_id: '4' },
    { id_route: '8', day_id: '5' },

    { id_route: '9', day_id: '1' },
    { id_route: '9', day_id: '2' },
    { id_route: '9', day_id: '3' },
    { id_route: '9', day_id: '4' },
    { id_route: '9', day_id: '5' },
];

db.sync({ force: true })
    .then(() => {
        console.log("iniciando Sembrado de informacion");
        days.forEach((day) => models.day.create(day));
        setTimeout(() => {
            status.forEach((statu)=> models.status.create(statu));
        }, [1000]);
        setTimeout(() => {
            routes.forEach((rout)=> models.route.create(rout));
        }, [2000]);
        setTimeout(() => {
            routesDay.forEach((rotDay)=> models.route_day.create(rotDay));
        }, [3000]);
    })
    .catch(error => console.log(error))
