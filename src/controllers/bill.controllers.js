const genCod = require("./index");
const billService = require("../services/bill.services");
const transactionService = require("../services/transaction.services");
const RouteService = require("../services/route.services");

const getAllItem = async (req, res) => {
    try {
        const result = await billService.findAll();
        if (result) {
            res.status(200).json({ message: "Invoices available", result });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSearch = async (req, res) => {
    try {
        const id_client = req.query.client;
        const numFact = req.query.numBill;
        const dateInit = req.query.dateInit;
        const dateEnd = req.query.dateEnd;
        const id_seller = req.query.seller;
        const balance = req.query.balance;
        const data = { id_client, numFact, dateInit, dateEnd , id_seller , balance};
        const result = await billService.searchQuery(data);
        if (result) {
            res.status(200).json({ message: "Invoices available", result });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRouteBill = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const findRoute = await billService.searchRoute(id);
        res.status(200).json({ message: `Invoices available por la ruta del   `, findRoute });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFindNumBill = async (req, res) => {
    try {
        const { num_bill } = req.body;
        // console.log(id);
        const findRoute = await billService.findNumBill(num_bill);
        res.status(200).json({ message: `Invoices available por la ruta del   `, findRoute });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        let data = req.body;
        // console.log(data);
        let { num_bill } = data;
        const existence = await billService.findNumBill(num_bill);
        if (existence) {
            console.log(existence);
            const { id_client, num_bill, balance, total_bill } = existence;
            res.status(400).json({ message: `Ya existe un registro con ese numero de Documento. Clienteid: ${id_client} #${num_bill} , Balance:${balance} , Total:${total_bill} `, });
        } else {
            const factWhite = data.isWhite === "true" ? true : false;

            let isValid = false;
            if (factWhite) {
                // console.log(factWhite);
                num = genCod("FA-BL-");
                data.num_bill = num;
                isValid = true;
                // console.log("es verdadedo es white : " + factWhite);

            } else {
                // console.log("es falso no  es white : " + factWhite);
                // console.log();
                const validator = /\d{3}\-\d{9}/;
                // console.log(validator.test(num_bill))
                if (validator.test(num_bill)) {
                    // console.log("SI CUMPLE LA VALIDACION");
                    isValid = true;
                } else {
                    res.status(400).json({ message: "El numero de factura no cumple con la validacion" });
                }
            }

            // console.log(isValid);
            if (isValid) {
                const result = await billService.create(data);
                // console.log(isValid);
                if (result) {
                    res.status(201).json({ message: 'Invoice created', result });

                } else {
                    res.status(400).json({ message: "Something wrong" });
                }
            }
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await billService.findId(id);
        if (result) {
            res.status(200).json({ message: "Invoice by id found and selected..", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const findBill = await billService.findId(id);
        if (findBill) {
            const { num_bill } = findBill;
            const deleteLote = await transactionService.deleteLote(num_bill);
            if (deleteLote) {
                console.log(deleteLote);
                const result = await billService.delete(id);
                if (result) {
                    res.status(200).json({ message: "Required field removed with success", result, deleteLote });
                }
            } else {
                const result = await billService.delete(id);
                if (result) {
                    res.status(200).json({ message: "Required field removed with success", result });
                } else {
                    res.status(400).json({ message: "Something wrong" });
                }
            }
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
        const result = await billService.update(id, data);
        if (result) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem, getRouteBill, getSearch };

