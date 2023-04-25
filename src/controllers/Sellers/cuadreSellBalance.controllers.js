const balanceSellService = require("../../services/balanceSell.services");
const cuadreSellBalance = require("../../services/cuadreSellBalance.services");

const getAllItem = async (req, res) => {
    try {
        //console.log(req.body);
        //console.log(req.params);
        const result = await cuadreSellBalance.findAll();
        res.status(200).json({ message: "Available Cuadre Seller ", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cuadreSellBalance.findId(id);
        if (result) {
            res.status(200).json({ message: "Cuadre Seller by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const seller = req.body;
        //console.log(vehicle);
        const result = await cuadreSellBalance.create(seller);
        if (result) {
            const { value, id_balance } = result;
            // console.log({ value, id_balance });
            const findBalance = await balanceSellService.findId(id_balance);
            if (findBalance) {
                let { id, total } = findBalance;
                // console.log({ id, total });
                total = total + value;
                const refreshBalanceProcess = await balanceSellService.update(id, { total });
                if (refreshBalanceProcess) {
                    res.status(201).json({ message: 'Cuadre Seller created', result });
                } else {
                    res.status(400).json({ message: "Something wrong" });
                }
            } else {
                res.status(400).json({ message: "Something wrong" });
            }
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

        const result = await cuadreSellBalance.delete(id);
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
        //console.log(data);
        const result = await cuadreSellBalance.update(id, data);
        if (result.ok) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem };