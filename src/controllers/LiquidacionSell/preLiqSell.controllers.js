const preLiqSell = require("../../services/preLiqSell.services");

const getAllItem = async (req, res) => {
    try {
        const result = await preLiqSell.findAll();
        if (result) {
            res.status(200).json({ message: "Available PreLiquidation ", result });
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
        const result = await preLiqSell.findId(id);
        if (result) {
            res.status(200).json({ message: "Available PreLiquidation by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const recepter = req.body;
        // console.log(recepter);
        const principal = recepter[0];
        const data = recepter[1];

        let processData = {};
        processData.userliquidator = principal.user;
        processData.id_seller = principal.sellerBack;
        processData.pre_Date = principal.dateBack;
        processData.total = parseFloat(principal.total);
        // processData.total = 55;
        // console.log(processData);
        const result = await preLiqSell.create(processData);
        if (result) {
            const { id } = result;
            const invoicePreLiquidated = data.map((invoiceId) => {
                const { id: id_bill , balance: pre_balance } = invoiceId;
                return { id_bill, id_pre_liquidation: id , pre_balance }
            });

            const invoiceProcess = await preLiqSell.billPreLiquidationCreate(invoicePreLiquidated);
            if (invoiceProcess) {
                res.status(201).json({ message: 'PreLiquidation created', result });
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

        const result = await preLiqSell.delete(id);
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
        const result = await preLiqSell.update(id, data);
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