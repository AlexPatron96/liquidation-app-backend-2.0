const { cash_sell } = require("../../models");
const billService = require("../../services/bill.services");
const cashSell = require("../../services/cashSell.services");
const checkMoney = require("../../services/checkMoney.services");
const discountSell = require("../../services/discountSell.services");
const expenseSell = require("../../services/expenseSell.services");
const liquiSeller = require("../../services/liquiSeller.services");
const transactionService = require("../../services/transaction.services");

const getAllItem = async (req, res) => {
    try {
        const result = await liquiSeller.findAll();
        if (result) {
            res.status(200).json({ message: "Available Liquidation the Sellers ", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const billAll = async (req, res) => {
    try {
        const result = await liquiSeller.invoiceLiquidatedAll();
        res.status(200).json({ message: "Available bill liquidated ", result });
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
        const transaction = data[4];
        const invoice = data[5];
        const principal = data[10];
        const { settlement_code: codLiquidation } = principal
        const { id_user: userID } = principal
        //console.log(principal);

        const result = await liquiSeller.create(principal);
        if (result) {
            const { settlement_code } = result;
            //console.log("id de resul: " + settlement_code);
            const invoiceLiquidated = invoice.map((invoiceId) => {
                const { id: id_bills, pago: pass } = invoiceId;
                return { id_bills, id_liquidation: settlement_code, pass }
            });

            const processInvoice = await liquiSeller.invoiceLiquidated(invoiceLiquidated);
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
                                    // data.pay = balance;
                                    trans.detail = detail;
                                    const transactionCorrect = await transactionService.create(trans);
                                    if (transactionCorrect) {
                                        //console.log("transacion se a generado de manera correcta : " + index);
                                    } else {
                                        res.status(400).json({ message: 'Not process transacction correct', transactionCorrect });
                                    }
                                }
                            }
                        }
                    }
                });


                const expensesProcess = await expenseSell.create(expenses);
                if (expensesProcess) {

                    const discountProcess = await discountSell.create(discount);
                    if (discountProcess) {

                        //console.log({ message: "correcto discountProcess" });

                        const cashProcess = await cashSell.create(cash);
                        if (cashProcess) {
                            const checkLiquidation = check.forEach(async (chekIt, index) => {
                                let data = chekIt;
                                const settlement_code = codLiquidation;
                                data.settlement_code = codLiquidation;
                                const checkProcess = await checkMoney.create(data);
                                const { id: id_check } = checkProcess;
                                const dataCheck = { id_check, settlement_code };
                                if (cashProcess) {
                                    const checkCashVehProcess = await checkMoney.createCheckCashSell(dataCheck);
                                    if (checkCashVehProcess) {
                                        console.log("checkCashSellProcess: " + index);
                                    } else {
                                        return res.status(400).json({ message: 'Error! Not process checkCashVehProcess ' });
                                    }
                                } else {
                                    return res.status(400).json({ message: 'Error! Not process checkProcessProcess ' });
                                }
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
            res.status(400).json({ message: 'Not process Result Liquidation', result });
        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await liquiSeller.findId(id);
        if (result) {
            res.status(200).json({ message: "Liquidation by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteBillLiquidated = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await liquiSeller.invoiceLiquidatedDeleteID(id);
        if (result) {
            res.status(200).json({ message: "Required field removed with success", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await liquiSeller.delete(id);
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
        const result = await liquiSeller.update(id, data);
        if (result) {
            res.status(200).json({ message: "Item modified successfully", result });
        } else {
            res.status(400).json({ message: 'It was not possible to modify this item' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllItem, getIdItem, createItem, deleteItem, updateItem, billAll, deleteBillLiquidated };