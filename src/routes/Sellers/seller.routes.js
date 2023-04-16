const { Router } = require("express");
const router = Router();

// const { allSellerAvailable, searchIdSeller, createSeller, updateSeller, deleteSeller } = require("../controllers/seller.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem, createClouster } = require("../../controllers/Sellers/seller.controllers");


router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.post("/newClouster", createClouster);
router.put("/:id/update", updateItem);
router.delete("/:id/del", deleteItem);

module.exports = router; 