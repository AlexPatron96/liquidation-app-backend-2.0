//si el token es valido deja pasar a la ruta
//si no es valido responde retorno 400 
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    let { authorization: token } = req.headers;
    
    console.log(req.headers);
    console.log("token sin descortar : ");

    token = token.replace("Bearer ", "");
    console.log( "nuevo token: ");

    jwt.verify(
        token, 
        process.env.JWT_SECRET,
        {algorithm: "HS512" },
        (err , decoded) => {
            if (err) {
                console.log("invalid token");
                res.status(400).json({error: "Invalid Token"});
            } else {
                console.log("decodificado con exito");
                next();
            }
        });
}

module.exports = authMiddleware; 