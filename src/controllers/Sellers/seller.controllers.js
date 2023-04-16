
const balanceSellService = require("../../services/balanceSell.services");
const sellerService = require("../../services/seller.services");

const getAllItem = async (req, res) => {
    try {
        const result = await sellerService.findAll();
        if (result) {
            res.status(200).json({ message: 'All sellers Availble', result });
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
        const result = await sellerService.findId(id);
        if (result) {
            res.status(200).json({ message: "Seller by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createItem = async (req, res) => {
    try {
        const newSeller = req.body;
        const result = await sellerService.create(newSeller);
        if (result) {
            const { id: id_seller } = result;
            const total = 0;
            const dataBalance = { id_seller, total }
            const createBalance = await balanceSellService.create(dataBalance);
            res.status(201).json({ message: 'Seller created', result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const createClouster = async (req, res) => {
    try {
        const dataClouster = req.body;
        console.log(dataClouster);
        const result = await sellerService.createByClouster(dataClouster);
        if (result) {
            res.status(201).json({ message: 'Seller created by Clouster', result });
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
        const toUpdate = await sellerService.update(id, data);
        console.log(toUpdate);
        if (toUpdate) {
            // res.status(200).json({ message: "Required field removed with success.", result });
            res.status(200).json({ message: 'Seller successfully updated' });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sellerService.delete(id);
        if (result) {
            res.status(200).json({ message: "Required field removed with success.", result });
        } else {
            res.status(400).json({ message: 'Something wrong' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem , createClouster};