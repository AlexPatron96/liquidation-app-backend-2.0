const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
// const initModels = require("./models/initModels");
// const authRoutes = require("./routes/auth.routes");
const routerApi = require("./routes/index");
const app = express();

// initModels();

app.use(express.json({limit: '25mb'}));
app.use(cors()); //Origenes cruzados 
app.use(morgan('tiny'));


db.authenticate()
    .then(() => console.log("Base de datos autenticada"))
    .catch((error) => console.log(error));
//db.sync({ alter: this.trace })

// db.sync({ force: true })
db.sync({ alter: false })
    .then(() => console.log("Base de datos Sincronizada"))
    .catch((error) => console.log(error));
    
// La sincronizacion permiter, definir sino existe una tabla la crea en 
// En caso contrario que exista no la toca. 
// alter: true => compara y agrega a la base de datos todo lo nuevo , actualiza y altera la tabla.
// force: true => borra todo lo que tiene la base y vuelve a crearla sobre escribe.

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my server" });
});

routerApi(app);
// app.use("/api/v1/auth", authRoutes)
module.exports = app;
