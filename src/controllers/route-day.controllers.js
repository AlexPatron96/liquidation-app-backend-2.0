const RouteDayServices = require("../services/route-day.services")

//All
const getAllItem = async (req, res) => {
    try {
        const result = await RouteDayServices.findAll();
        if (result) {
            res.status(200).json({ message: "RouteDay Available", result })
        } else {
            res.status(400).json({ message: "Something wrong" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//ID
const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RouteDayServices.findId(id);
        if (result) {
            res.status(200).json({ message: "RouteDay available by id is.", result })
        } else {
            res.status(400).json({ message: "Something wrong" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Create
const createItem = async (req, res) => {
    try {
        const route = req.body;
        console.log(route);
        const result = await RouteDayServices.create(route);
        if (result) {
            res.status(201).json({ message: 'Route-day Create' });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Delete
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RouteDayServices.delete(id);
        if (result) {
            res.status(200).json({ message: "RouteDay delete by id is.", result })
        } else {
            res.status(400).json({ message: "Something wrong" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Update
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await RouteDayServices.update(id,data);
        if (result) {
            res.status(201).json({ message: 'Route-day Update' });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllItem, getIdItem, createItem, deleteItem , updateItem }; 