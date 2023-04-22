
const balanceVehService = require("../../services/balanceVeh.services");

const getAllItem = async (req, res) => {
    try {
        const result = await balanceVehService.findAll();
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
        const result = await balanceVehService.findId(id);
        if (result) {
            res.status(200).json({ message: "Balance Vehicle by id found and selected.", result });
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
        //console.log(newBalance);
        const result = await balanceVehService.create(newBalance);
        if (result) {
            res.status(201).json({ message: 'Balance Vehicle created', result });
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
        //console.log(id);
        //console.log(data);
        const result = await balanceVehService.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: 'Balance Vehicle successfully updated', result });
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
        const result = await balanceVehService.delete(id);
        if (result) {
            res.status(200).json({ message: "Required field removed with success.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { getAllItem, getIdItem, createItem, deleteItem , updateItem } ;