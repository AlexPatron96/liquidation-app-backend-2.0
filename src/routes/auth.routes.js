// registro y login

const { Router } = require("express");
const {
	register,
	login,
	deleteUser,
	listUser,
} = require("../controllers/auth.controllers");

const router = Router();

//router.METHOD // se podra usar cualquier metodo
// ya sea get - post - put - delete
router.get("/register/users", listUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/user/:id/del", deleteUser);

module.exports = router;
