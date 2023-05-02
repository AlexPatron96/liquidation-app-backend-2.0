const genCod = require("..");
const balanceSellService = require("../../services/balanceSell.services");
const balanceVehService = require("../../services/balanceVeh.services");
const billService = require("../../services/bill.services");
const cashSell = require("../../services/cashSell.services");
const cashVeh = require("../../services/cashVeh.services");
const checkMoney = require("../../services/checkMoney.services");
const cuadreSellBalance = require("../../services/cuadreSellBalance.services");
const cuadreVehBalance = require("../../services/cuadreVehBalance.services");
const deliveredCred = require("../../services/deliveredCred.services");
const discountSell = require("../../services/discountSell.services");
const discountVeh = require("../../services/discountVeh.services");
const expenseSell = require("../../services/expenseSell.services");
const expenseVeh = require("../../services/expenseVeh.services");
const liquidationVeh = require("../../services/liquidationVeh.services");
const productRet = require("../../services/productRet.services");
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
        // const checkMoneyView = data[8];
        const sellerDeliverCred = data[9];
        const principal = data[14];
        // const checkMoneyview = data[15];
        const dataVehBalance = data[15];

        const { settlement_code: codLiquidation } = principal
        const { id_user: userID } = principal


        //console.log(principal);
        const result = await liquidationVeh.create(principal);

        if (result) {


            const { settlement_code } = result;
            const invoiceLiquidated = invoiceLiquidation.map((invoiceId) => {
                const { id: id_bills, balance: saldo, pago: pass } = invoiceId;
                const id_liquidation = codLiquidation;
                return { id_bills, id_liquidation, saldo, pass }
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
                                        //console.log("transacion se a generado de manera correcta : " + index);
                                    } else {
                                        res.status(400).json({ message: 'Not process transaccition correct', transactionCorrect });
                                    }
                                }
                            }
                        }
                    }
                    else {
                        res.status(400).json({ message: 'Not process Liquidation Error! - Find inovice ' });
                    }
                });

                cash.settlement_code = codLiquidation;
                const cashProcess = await cashVeh.create(cash);

                const checkLiquidation = check.forEach(async (chekIt, index) => {
                    let data = chekIt;
                    // const settlement_code = codLiquidation;
                    data.settlement_code = codLiquidation;
                    const checkProcess = await checkMoney.create(data);
                    const { id: id_check } = checkProcess;
                    const dataCheck = { id_check, settlement_code }
                    if (cashProcess) {
                        const checkCashVehProcess = await checkMoney.createCheckCashVeh(dataCheck);
                        if (checkCashVehProcess) {
                            //console.log("checkCashVehProcess" + index);
                        } else {
                            return res.status(400).json({ message: 'Error! Not process checkCashVehProcess ' });
                        }
                    } else {
                        return res.status(400).json({ message: 'Error! Not process checkProcessProcess ' });
                    }
                });

                expenses.settlement_code = codLiquidation;
                const expensesProcess = await expenseVeh.create(expenses);
                if (expensesProcess) {
                    discount.settlement_code = codLiquidation;
                    const discountProcess = await discountVeh.create(discount);
                    if (discountProcess) {
                        productReturn.settlement_code = codLiquidation;
                        const productReturnPorcess = await productRet.create(productReturn);
                        if (productReturnPorcess) {

                            const producRetInv = productReturnInvoice.forEach(async (invoProRet, index) => {
                                let data = invoProRet;
                                delete data.id;
                                const productReturnInvoiceProcess = await billService.create(data);
                                if (productReturnInvoiceProcess) {
                                    const { id: id_bills } = productReturnInvoiceProcess;
                                    const settlement_code = codLiquidation
                                    const dataBillProdctRet = { id_bills, settlement_code };
                                    const billProductReturnProcess = await productRet.createBillProducRt(dataBillProdctRet);
                                } else {
                                    return res.status(400).json({ message: 'Error! Not process productReturnInvoiceProcess ' });
                                }
                            });

                            const sellDelCred = sellerDeliverCred.forEach(async (deliCred, index) => {
                                let data = deliCred;
                                data.settlement_code = codLiquidation;
                                const sellerDeliverCredProcess = await deliveredCred.create(data);
                                if (sellerDeliverCredProcess) {
                                    //console.log("sellDelCred" + index);
                                } else {
                                    return res.status(400).json({ message: 'Error! Not process sellerDeliverCredProcess ' });
                                }
                            });

                            // const id_balance = principal.id_vehicle;
                            // const value = principal.balance;

                            dataVehBalance.detail = `Realizado en la liquidacion ${codLiquidation}, por el usuario ${userID}`;


                            console.log(dataVehBalance);
                            const vehBalanceprocess = await cuadreVehBalance.create(dataVehBalance);
                            if (vehBalanceprocess) {
                                const { value, id_balance } = vehBalanceprocess;
                                console.log({ value, id_balance });
                                const findBalance = await balanceVehService.findId(id_balance);
                                if (findBalance) {
                                    let { id, total } = findBalance;
                                    console.log({ id, total });
                                    total = total + value;
                                    const refreshBalanceProcess = await balanceVehService.update(id, { total });
                                } else {
                                    console.log("error en findbalance");
                                    // res.status(400).json({ message: "Something wrong" });
                                }
                            } else {
                                console.log("error en vehBalanceprocess");

                                // res.status(400).json({ message: "Something wrong" });
                            }
                            const invoiceLiquidated = invoiceLiquidation.forEach(async (invoiceId) => {
                                const { id: id_inv } = invoiceId;

                                const invoiceAggVeh = await billService.update(id_inv, { vehicle_liq: 0 });
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