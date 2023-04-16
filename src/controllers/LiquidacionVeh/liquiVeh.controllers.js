const genCod = require("..");
const billService = require("../../services/bill.services");
const cashSell = require("../../services/cashSell.services");
const discountSell = require("../../services/discountSell.services");
const expenseSell = require("../../services/expenseSell.services");
const liquidationVeh = require("../../services/liquidationVeh.services");
const transactionService = require("../../services/transaction.services");

const getAllItem = async (req, res) => {
    try {
        const result = await liquidationVeh.findAll();
        if (result) {
            res.status(200).json({ message: "Available liquidation vehicle ", result });
        } else {
            res.status(400).json({ message: "Something wrong" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const data = req.body;

        const check = data[0];
        const discount = data[1];
        const expenses = data[2];
        const cash = data[3];
        const productReturn = data[4];
        const productReturnInvoice = data[5];
        const transaction = data[6];
        const invoiceLiquidation = data[7];
        const checkMoneyView = data[8];
        const sellerDeliverCred = data[9];
        const principal = data[14];

        const { settlement_code: codLiquidation } = principal
        const { id_user: userID } = principal

        console.log(principal);
        const result = await liquidationVeh.create(principal);
        if (result) {
            const { settlement_code } = result;
            console.log("id de resul: " + settlement_code);
            const invoiceLiquidated = invoiceLiquidation.map((invoiceId) => {
                const { id: id_bills } = invoiceId;
                return { id_bills, id_liquidation: settlement_code }
            });

            const processInvoice = await liquidationVeh.invoiceLiquidated(invoiceLiquidated);
            if (processInvoice) {
                const transactionProces = transaction.forEach(async (trans, index) => {
                    const { id_bill, pay } = trans;
                    const findBill = await billService.findId(id_bill);
                    const detail = `Este pago se genero en la liquidacion (${codLiquidation}), por el Usuario con ID:${userID}`
                    let { total_bill, id_status, balance } = findBill;
                    if (findBill) {
                        if (total_bill !== 0) {
                            balance = balance - pay;
                            if (!(balance < 0)) {
                                if (balance === 0) {
                                    id_status = 3;
                                } else {
                                    id_status = 2;
                                }
                                balance = balance.toFixed(2)

                                const updateBillPay = { balance, id_status };
                                const updateBill = await billService.update(id_bill, updateBillPay)

                                if (updateBill) {
                                    trans.detail = detail;
                                    const transactionCorrect = await transactionService.create(trans);
                                    if (transactionCorrect) {
                                        console.log("transacion se a generado de manera correcta : " + index);
                                    } else {
                                        res.status(400).json({ message: 'Not process transaccition correct', transactionCorrect });
                                    }
                                }
                            }
                        }
                    }
                });

                const cashProcess = await cashSell.create(cash);

                const expensesProcess = await expenseSell.create(expenses);
                if (expensesProcess) {

                    const discountProcess = await discountSell.create(discount);
                    if (discountProcess) {

                        console.log({ message: "correcto discountProcess" });
                        if (cashProcess) {

                            const checkLiquidation = check.forEach(async (chekIt, index) => {
                                console.log(chekIt);
                                const checkProcess = await checkMoney.create(chekIt);
                            });
                            
                            res.status(200).json({ message: "Liquidation resolve with success", result });

                        } else {
                            res.status(400).json({ message: 'Not process cash ', cashProcess });
                        }

                    } else {
                        res.status(400).json({ message: 'Not process discount ', discountProcess });
                    }

                } else {
                    res.status(400).json({ message: 'Not process cash ', expensesProcess });
                }

            } else {
                res.status(400).json({ message: 'Not process Inovice', processInvoice });
            }


        } else {
            res.status(400).json({ message: "Something wrong" });
        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// res.status(201).json({ message: 'Liquidation Vehicle created' });

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await liquidationVeh.findId(id);
        if (result) {
            res.status(200).json({ message: "Liquidation Vehicle by id found and selected.", result });
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
        const result = await liquidationVeh.delete(id);
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
        const result = await liquidationVeh.update(id, data);
        if (result) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem };