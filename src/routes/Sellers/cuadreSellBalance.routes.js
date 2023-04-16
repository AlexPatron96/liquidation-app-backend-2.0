const { Router } = require("express");
const router = Router();

const { getAllItem, getIdItem, createItem, deleteItem, updateItem } = require("../../controllers/Sellers/cuadreSellBalance.controllers");

router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.delete("/:id/del", deleteItem);
router.put("/:id/update", updateItem);
module.exports = router; 