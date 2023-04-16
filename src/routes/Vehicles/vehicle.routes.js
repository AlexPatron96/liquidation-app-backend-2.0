const { Router } = require("express");
const router = Router();

// const { createVehicle , getAllVehicles , deleteVehicle , searchIdVehicle ,updateVehicle } = require("../controllers/vehicle.controllers");
const { getAllItem, getIdItem, createItem, deleteItem , updateItem ,createClouster} = require("../../controllers/Vehicles/vehicle.controllers");

router.get("/all" , getAllItem);
router.get("/:id" , getIdItem);
router.post("/new" , createItem);
router.post("/new-clouster" , createClouster);
router.put("/:id/update" , updateItem);
router.delete("/:id/del" , deleteItem);

module.exports = router; 