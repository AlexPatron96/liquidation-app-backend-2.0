const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");
const fs = require('fs');
const path = require('path');

const htmlMail = fs.readFileSync(path.join(__dirname, './../../src/templates/mailnew.html'), 'utf8');

const register = async (req, res) => {
    try {
        const user = req.body;
        const { password:clave } = user;
        const result = await AuthServices.register(user);

        if (result) {

            const user = {
                mail: result.mail,
                fullname: result.fullname,
                username: result.username,
                password: clave
            };

            const htmlFormate = htmlMail.replace(/\${(.*?)}/g, (_, key) => {
                return user[key.trim()];
            });

            await transporter.sendMail({
                from: "BossDesign",
                to: result.mail,
                subject: "Email de Registro",
                text: "Bienvenido a la App",
                html: htmlFormate,
            });

            res.status(201).json({ message: "user Created", result });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const login = async (req, res) => {
    try {
        const credentials = req.body;
        const { mail, password } = req.body;
        // console.log(credentials);
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
        if (result.isValid) {
            const { username, id, mail, password } = result.user;
            const userData = { username, id, mail, password };
            const token = await AuthServices.genToken(userData);
            userData.password = "unknown";
            userData.token = token;
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
        // console.log(id);
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