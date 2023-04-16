const { Router } = require("express");
const router = Router();

// const { createCustomer , getAllCustomers , deleteCustomer , searchIdCustomer ,updateCustomer } = require("../controllers/customer.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem, billAll , deleteBillLiquidated} = require("../../controllers/LiquidacionSell/liquiSeller.controllers");

router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.put("/:id/update", updateItem);
router.delete("/:id/del", deleteItem);
router.delete("/bill/:id/del", deleteBillLiquidated);
router.get("/bill/all", billAll);

module.exports = router; 