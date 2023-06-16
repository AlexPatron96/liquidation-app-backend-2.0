const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log("Servidor escuchando en el puerto: " + PORT);
});

{
	/*
const https = require('https');
const fs = require('fs');

const app = require("./app");

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/distribuidoradcheo.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/distribuidoradcheo.online/fullchain.pem')
};

const PORT = process.env.PORT || 8000;

//app.listen(PORT, () => {
  //  console.log("Servidor escuchando en el puerto: " + PORT);
//})
https.createServer(options, app).listen(PORT, () => {
console.log("Servidor escuchando en el puerto: "+ PORT);
console.log("Welcome to the DCheo Distributor company server - Desarrollador Por BossDesign");
})

*/
}
