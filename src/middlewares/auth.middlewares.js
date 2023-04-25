//si el token es valido deja pasar a la ruta
//si no es valido responde retorno 400 
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    let { authorization: token } = req.headers;

    // console.log(req.headers);
    // console.log("token sin descortar : ");

    token = token.replace("Bearer ", "");
    // console.log( "nuevo token: ");

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        { algorithm: "HS512" },
        (err, decoded) => {
            if (err) {
                console.log("TOKEN INVALID");
                res.status(401).json({ error: "Invalid Token", message: " El token no es valido vuelva a ingresar a la aplicacion" });
            } else {
                console.log("TOKEN VALIDO");
                next();
            }
        });
}

module.exports = authMiddleware; 