const { Router } = require("express");
const router = Router();

// const { createCustomer , getAllCustomers , deleteCustomer , searchIdCustomer ,updateCustomer } = require("../controllers/customer.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem , createClouster} = require("../../controllers/Customer/customer.controllers");
 
router.get("/all" , getAllItem);
router.get("/:id" , getIdItem);
router.post("/new" , createItem);
router.post("/newClouster" , createClouster);
router.put("/:id/update" , updateItem);
router.delete("/:id/del" , deleteItem);


module.exports = router; 