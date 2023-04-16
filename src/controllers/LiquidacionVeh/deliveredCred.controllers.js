const deliveredCred = require("../../services/deliveredCred.services")

//All
const getAllItem = async (req, res) => {
    try {
        const result = await deliveredCred.findAll();
        if (result) {
            res.status(200).json({ message: "DeliveredCred Available", result })
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
        const result = await deliveredCred.findId(id);
        if (result) {
            res.status(200).json({ message: "DeliveredCred available by id is.", result })
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
        const result = await deliveredCred.create(route);
        if (result) {
            res.status(201).json({ message: 'DeliveredCred Create' });
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
        const result = await deliveredCred.delete(id);
        if (result) {
            res.status(200).json({ message: "DeliveredCred delete by id is.", result })
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
        const result = await deliveredCred.update(id,data);
        if (result) {
            res.status(201).json({ message: 'DeliveredCred Update' });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllItem, getIdItem, createItem, deleteItem , updateItem }; 