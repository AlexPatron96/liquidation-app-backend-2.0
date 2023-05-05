const { Router } = require("express");
const router = Router();

// const { createBill , getAllBills , getRouteBill,  deleteBill , searchIdBill ,updateBill } = require("../controllers/bill.controllers");
const { getAllItem, getIdItem, createItem, deleteItem, updateItem , getRouteBill , getSearch}  = require("../controllers/bill.controllers");
 
router.get("/:id/route" , getRouteBill); //Buscar las facturas por rutas
router.get("/all" , getAllItem);
router.get("/search" , getSearch);
router.get("/:id" , getIdItem);
router.post("/new" , createItem);
router.put("/:id/update" , updateItem);
router.delete("/:id/del" , deleteItem);


module.exports = router; 