const { Router } = require("express");

const router = Router();

// const { getAllLiqVeh, searchIdLiqVeh, createLiqVeh, updateLiqVeh, deleteLiqVeh } = require("../controllers/liquidationVeh.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem }  = require("../../controllers/LiquidacionVeh/liquiVeh.controllers");

router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.put("/:id/update", updateItem);
router.delete("/:id/del", deleteItem);


module.exports = router; 