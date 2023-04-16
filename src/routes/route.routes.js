const { Router } = require("express");
const router = Router();


// const { getAllRoute, getIdRoute, createRoute, deleteRoute , updateRoute } = require("../controllers/route.controllers");
const { getAllItem, getIdItem, createItem, deleteItem , updateItem } = require("../controllers/route.controllers");

router.get("/all", getAllItem);
router.get("/:id", getIdItem);
router.post("/new", createItem);
router.delete("/:id/del", deleteItem);
router.put("/:id/update", updateItem);
module.exports = router; 