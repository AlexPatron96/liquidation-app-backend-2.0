const cuadreVehBalance = require("../../services/cuadreVehBalance.services");

const getAllItem = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const result = await cuadreVehBalance.findAll();
        res.status(200).json({ message: "Available Cuadre vehicle ", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cuadreVehBalance.findId(id);
        if (result) {
            res.status(200).json({ message: "Cuadre vehicle by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const vehicle = req.body;
        console.log(vehicle);
        const result = await cuadreVehBalance.create(vehicle);
        if (result) {
            res.status(201).json({ message: 'Cuadre Vehicle created', result });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await cuadreVehBalance.delete(id);
        if (result) {
            res.status(200).json({ message: "Required field removed with success", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(data);
        const result = await cuadreVehBalance.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem , updateItem };