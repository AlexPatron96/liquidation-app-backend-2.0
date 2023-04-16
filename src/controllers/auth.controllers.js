const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
    try {
        const user = req.body;
        const result = await AuthServices.register(user);
        
        if (result) {
            res.status(201).json({ message: "user Created", result });
            await transporter.sendMail({
                from: result.email,
                to: "alex.patron@utelvt.edu.ec",
                subject: "Email Confirmation",
                text: "Hola Nodemailer",
                html: "<h1>Bienvenido a la  </h1> <p> Tienes que confirmar tu cuenta </p> <a href='#' target='new_blanc'> enlace </a>",
            });

        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const credentials = req.body;
        const { mail, password } = req.body;
        console.log(credentials);
        if (!mail) {
            return res.status(400).json({
                error: "Missing data",
                message: "Not email provider"
            })
        }
        if (!password) {
            return res.status(400).json({
                error: "Missing data",
                message: "Not password provider"
            })
        }
        const result = await AuthServices.login({ mail, password });
        console.log(result.isValid);
        if (result.isValid) {
            const { username, id, mail , password } = result.user;
            const userData = { username, id, mail , password};
            const token = await AuthServices.genToken(userData);
            userData.password = "unknown";
            userData.token = token;
            console.log(userData);
            res.status(201).json({ message: "Permission enabled to logged in user", data: userData });
        } else {
            res.status(400).json(result.message);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await AuthServices.delete(id);
        if (result) {
            res.status(201).json({ message: 'Delete correct' });
        } else {
            res.status(400).json({ error: "delete Fail" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const listUser = async (req, res) => {
    try {
        const result = await AuthServices.listUser();
        if (result) {
            res.status(201).json({ message: 'List Available correct', result });
        } else {
            res.status(400).json({ error: "not available User" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    deleteUser,
    listUser
}