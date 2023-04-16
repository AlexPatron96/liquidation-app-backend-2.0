const { Router } = require("express");
const router = Router();

// const { createVehicle , getAllVehicles , deleteVehicle , searchIdVehicle ,updateVehicle } = require("../controllers/vehicle.controllers");
const { getAllItem, getIdItem, createItem, deleteItem , updateItem } = require("../../controllers/LiquidacionSell/preLiqSell.controllers");

router.get("/all" , getAllItem);
router.get("/:id" , getIdItem);
router.post("/new" , createItem);
router.put("/:id/update" , updateItem);
router.delete("/:id/del" , deleteItem);

module.exports = router; 