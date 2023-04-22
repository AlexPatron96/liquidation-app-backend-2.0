const billService = require("../services/bill.services");
const transactionService = require("../services/transaction.services");


const getAllPay = async (req, res) => {
    try {
        const result = await transactionService.all();
        res.status(200).json({ message: "Payments available", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIdAllPay = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await transactionService.idAll(id);
        res.status(200).json({ message: `Available bill payments with id ${id}`, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllBill = async (req, res) => {
    try {
        const { id: numFact } = req.params;
        const result = await transactionService.numFact(numFact);
        res.status(200).json({ message: `Available bill payments with id ${numFact}`, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createPay = async (req, res) => {
    try {
        let data = req.body;
        let { id_bill, pay } = data;

        const findBill = await billService.findId(id_bill);
        let { total_bill, id_status, balance } = findBill;

        if (findBill) {
            if (total_bill !== 0) {
                balance = balance - pay;

                //console.log("Balance ante"+balance);
                if (!(balance < 0)) {
                    if (balance === 0) {
                        id_status = 3;
                    } else {
                        id_status = 2;
                    }
                    balance = balance.toFixed(2)
                    //console.log("balance");
                    //console.log(balance);
                    const updateBillPay = { balance, id_status };
                    const updateBill = await billService.update(id_bill, updateBillPay)

                    if (updateBill) {
                        //console.log("actualizo la factura de manera correcta");
                        // data.pay = balance;
                        //console.log(data);
                        const result = await transactionService.create(data);
                        if (result) {
                            res.status(201).json({ message: 'Pay created', result });
                        } else {
                            res.status(400).json({ message: 'Something wrong' });
                        }
                    }
                } else {
                    res.status(406).json({ message: 'No puede realizar un abono mayor al valor del saldo de lafactura' });
                }
            } else {
                res.status(406).json({ message: 'La factura ya está pagada en su totalidad, no puedes realizar abonos.' });
            }

        } else {
            res.status(404).json({ message: 'La factura a registrar el pago no encontrada.' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchIdPay = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await transactionService.idPay(id);
        if (result) {
            res.status(200).json({ message: "Payments by id found and selected.", result });
        } else {
            res.status(400).json({ message: 'The requested parameter does not exist' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePay = async (req, res) => {
    try {
        const { id } = req.params;
        const findIdPay = await transactionService.idPay(id);
        let newTotal = 0;
        if (findIdPay) {
            const { num, abono } = findIdPay;
            const findIdBill = await billService.idBill(id_bills);
            //console.log(findIdBill);
            let { total_bill } = findIdBill;
            newTotal = total + abono;
            total = newTotal;
            type = "abonada"
            const dataUpdate = { num_Fact, isWhite, fecha_entrega, total, type, id_client, detalle_adt };
            //console.log(dataUpdate);
            const updateBill = await billService.update(id_bills, dataUpdate);
            //console.log(updateBill);
            if (updateBill) {
                //console.log("Actualizacion Realizada");
                const result = await transactionService.delete(id);
                if (result) {
                    res.status(200).json({ message: "Required field removed with success", result });
                } else {
                    res.status(400).json({ message: 'The requested parameter does not exist.' });
                }
            } else {
                res.status(400).json({ message: 'No se pudo realizar la operacion de actualizacion.' });
            }
        } else {
            res.status(406).json({ message: 'No se ah encontrado el pago a eliminar.' });
        }



    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePay = async (req, res) => {
    try {
        const { id } = req.params;
        let data = req.body;
        //console.log(data);
        const findTrans = await transactionService.idPay(id);
        if (findTrans) {
            let { abono: abonoAnt, id_bills } = findTrans;
            const findBill = await billService.idBill(id_bills);
            let { total_fact, status, saldo } = findBill;
            if (data.abono === abonoAnt) {
                //console.log("es igual");
                const result = await transactionService.update(id, data);
                if (result) {
                    res.status(200).json({ message: "Item modified successfully", result });
                } else {
                    res.status(400).json({ message: 'It was not possible to modify this item' });
                }
            } else {
                //console.log("No es igual");
                saldo = saldo + abonoAnt - data.abono;
                //console.log(saldo);
                if (!(saldo < 0)) {
                    if (saldo === 0) {
                        status = "pagada";
                    } else {
                        status = "abonada";
                    }
                    const dataBill = { status, saldo };
                    //console.log(dataBill);
                    const updateBill = await billService.update(id_bills, dataBill);
                    if (updateBill) {
                        const result = await transactionService.update(id, data);
                        if (result) {
                            res.status(200).json({ message: "Item modified successfully", result });
                        } else {
                            res.status(400).json({ message: 'It was not possible to modify this item' });
                        }
                    }
                } else {
                    res.status(406).json({ message: 'No puede realizar un abono mayor al valor del saldo de la factura' });
                }
            }
        } else {
            res.status(400).json({ error: "NO ENCONTRO A LA TRANSACCION" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getAllPay, getIdAllPay, getAllBill, searchIdPay, createPay, updatePay, deletePay };