const { Router } = require("express");
const router = Router();

const { getAllItem, getIdItem, createItem, deleteItem, updateItem } = require("../../controllers/LiquidacionVeh/productRet.controllers");


router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.put("/:id/update", deleteItem);
router.delete("/:id/del", updateItem);

module.exports = router; 