const { balance_veh } = require("../../models");
const balanceVehService = require("../../services/balanceVeh.services");
const vehService = require("../../services/vehicle.services");

const getAllItem = async (req, res) => {
    try {
        const result = await vehService.findAll();
        if (result) {
            res.status(200).json({ message: "Available vehicles ", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await vehService.findId(id);
        if (result) {
            res.status(200).json({ message: "Vehicle by id found and selected.", result });
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
        const result = await vehService.create(vehicle);
        if (result) {
            const { id: id_veh } = result;
            const total = 0;
            const dataBalance = { id_veh, total }
            const createBalance = await balanceVehService.create(dataBalance);
            res.status(201).json({ message: 'Vehicle created', result, createBalance });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createClouster = async (req, res) => {
    try {
        const dataClouster = req.body;
        // console.log(dataClouster);
        const result = await vehService.createByClouster(dataClouster);
        if (result) {
            res.status(201).json({ message: 'Vehicle by clouster created', result });
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

        const result = await vehService.delete(id);
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
        const result = await vehService.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem, createClouster };