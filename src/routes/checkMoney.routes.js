const { Router } = require("express");
const router = Router();

const { getAllItem, getIdItem, createItem, deleteItem, updateItem, getLast } = require("../controllers/checkMoney.controllers");


router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.get("/search/final", getLast);
router.post("/new", createItem);
router.put("/:id/update", updateItem);
router.delete("/:id/del", deleteItem);

module.exports = router; 