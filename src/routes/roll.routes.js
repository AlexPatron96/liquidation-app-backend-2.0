const { Router } = require("express");
const router = Router();

// const {getAllRouteDat, getIdRouteDay, createRouteDay, deleteRouteDay, updateRouteDay } = require("../controllers/route-day.controllers")
const {
	getAllItem,
	getIdItem,
	createItem,
	deleteItem,
	updateItem,
} = require("../controllers/roll.controllers");

router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.put("/:id/update", updateItem);
router.delete("/:id/del", deleteItem);

module.exports = router;
