
const bankService = require("../services/bankService.services");

const getAllItem = async (req, res) => {
    try {
        const result = await bankService.findAll();
        if (result) {
            res.status(200).json({ message: 'All Bank Availble', result });
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
        const result = await bankService.findId(id);
        if (result) {
            res.status(200).json({ message: "Bank by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createItem = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        const result = await bankService.create(data);
        if (result) {
            res.status(201).json({ message: 'Bank created', result });
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
        // console.log(id);
        // console.log(data);
        const result = await bankService.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: 'Bank successfully updated', result });
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
        const result = await bankService.delete(id);
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