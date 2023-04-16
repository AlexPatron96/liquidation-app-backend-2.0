
const balanceSellService = require("../../services/balanceSell.services");

const getAllItem = async (req, res) => {
    try {
        const result = await balanceSellService.findAll();
        if (result) {
            res.status(200).json({ message: 'All Balance Availble', result });
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
        const result = await balanceSellService.findId(id);
        if (result) {
            res.status(200).json({ message: "Balance Seller by id found and selected.", result });
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
        const result = await balanceSellService.create(newBalance);
        if (result) {
            res.status(201).json({ message: 'Balance Seller created', result });
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
        const result = await balanceSellService.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: 'Balance Seller successfully updated', result });
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
        const result = await balanceSellService.delete(id);
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