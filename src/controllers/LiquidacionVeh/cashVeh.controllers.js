
const cashVeh = require("../../services/cashVeh.services");

const getAllItem = async (req, res) => {
    try {
        const result = await cashVeh.findAll();
        if (result) {
            res.status(200).json({ message: 'All Cash Veh Availble', result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cashVeh.findId(id);
        if (result) {
            res.status(200).json({ message: "Cash Veh by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createItem = async (req, res) => {
    try {
        const newBalance = req.body;
        console.log(newBalance);
        const result = await cashVeh.create(newBalance);
        if (result) {
            res.status(201).json({ message: 'Cash Veh created', result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log(id);
        console.log(data);
        const result = await cashVeh.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: 'Cash Veh successfully updated', result });
        } else {
            res.status(400).json({ message: 'Something wrong' , result });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cashVeh.delete(id);
        if (result) {
            res.status(200).json({ message: "Required field removed with success.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem };