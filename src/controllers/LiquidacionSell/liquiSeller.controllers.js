const { cash_sell } = require("../../models");
const balanceSellService = require("../../services/balanceSell.services");
const billService = require("../../services/bill.services");
const cashSell = require("../../services/cashSell.services");
const checkMoney = require("../../services/checkMoney.services");
const cuadreSellBalance = require("../../services/cuadreSellBalance.services");
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
        const datasellerBalance = data[12];








        const result = await liquiSeller.create(principal);
        if (result) {
            const { settlement_code } = result;
            //console.log("id de resul: " + settlement_code);
            const invoiceLiquidated = invoice.map((invoiceId) => {
                const { id: id_bills, pago: pass, balance: saldo } = invoiceId;
                return { id_bills, id_liquidation: settlement_code, saldo, pass }
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

                expenses.settlement_code = codLiquidation;
                const expensesProcess = await expenseSell.create(expenses);
                if (expensesProcess) {
                    discount.settlement_code = codLiquidation;
                    const discountProcess = await discountSell.create(discount);
                    if (discountProcess) {

                        //console.log({ message: "correcto discountProcess" });
                        cash.settlement_code = codLiquidation;
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

                            datasellerBalance.detail = `Realizado en la liquidacion ${codLiquidation}, por el usuario ${userID}`;
                            const sellBalanceprocess = await cuadreSellBalance.create(datasellerBalance);
                            if (sellBalanceprocess) {
                                const { value, id_balance } = sellBalanceprocess;
                                console.log({ value, id_balance });
                                const findBalance = await balanceSellService.findId(id_balance);
                                if (findBalance) {
                                    let { id, total } = findBalance;
                                    console.log({ id, total });
                                    total = total + value;
                                    const refreshBalanceProcess = await balanceSellService.update(id, { total });
                                    if (refreshBalanceProcess) {
                                        console.log("SE REALIZO LA ACTUALIZACION DE EL BALANCE ");

                                        const invoiceLiquidated = invoice.forEach(async (invoiceId) => {
                                            const { id: id_inv, vehicle_liq } = invoiceId;
                                            const invoiceAggVeh = await billService.update(id_inv, { vehicle_liq });
                                        });
                                    } else {
                                        console.log("ERROR EN AL REALIZAR LA ACTUALIZACION DE EL BALANCE ");
                                    }
                                }
                                else {
                                    // res.status(400).json({ message: "Something wrong" });
                                    console.log("ERROR EN FIND BALANCE");
                                }
                            }
                            else {
                                // res.status(400).json({ message: "Something wrong" });
                                console.log("ERROR EN  sellBalanceprocess");
                            }

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

            }
            else {
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