const { Router } = require("express");
const router = Router();

// const { allBalanceAvailable, searchIdBalance, createBalance, updateBalance, deleteBalance } = require("../controllers/balanceSell.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem } = require("../../controllers/Sellers/balanceSell.controllers");


router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.put("/:id/update", deleteItem);
router.delete("/:id/del", updateItem);

module.exports = router; 