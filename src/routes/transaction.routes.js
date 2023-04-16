const { Router } = require("express");

const router = Router();

const { getAllPay, getIdAllPay, getAllBill, searchIdPay, createPay, updatePay, deletePay } = require("../controllers/transaction.controllers");


router.get("/all", getAllPay);
router.get("/:id/all", getIdAllPay); // busca por el id_ de factura
router.get("/:id/bill", getAllBill); // Busca transacciones por numero de factura
router.get("/:id", searchIdPay);
router.post("/new", createPay);
router.put("/:id/update", updatePay);
router.delete("/:id/del", deletePay);


module.exports = router; 