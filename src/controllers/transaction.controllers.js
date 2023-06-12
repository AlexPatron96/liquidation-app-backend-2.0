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
		res.status(200).json({
			message: `Available bill payments with id ${id}`,
			result,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
const getAllBill = async (req, res) => {
	try {
		const { id: numFact } = req.params;
		const result = await transactionService.numFact(numFact);
		res.status(200).json({
			message: `Available bill payments with id ${numFact}`,
			result,
		});
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
					balance = balance.toFixed(2);
					//console.log("balance");
					//console.log(balance);
					const updateBillPay = { balance, id_status };
					const updateBill = await billService.update(
						id_bill,
						updateBillPay
					);

					if (updateBill) {
						//console.log("actualizo la factura de manera correcta");
						// data.pay = balance;
						//console.log(data);
						const result = await transactionService.create(data);
						if (result) {
							res.status(201).json({
								message: "Pay created",
								result,
							});
						} else {
							res.status(400).json({
								message: "Something wrong",
							});
						}
					}
				} else {
					res.status(406).json({
						message: "No puede realizar un abono mayor al valor del saldo de lafactura",
					});
				}
			} else {
				res.status(406).json({
					message: "La factura ya está pagada en su totalidad, no puedes realizar abonos.",
				});
			}
		} else {
			res.status(404).json({
				message: "La factura a registrar el pago no encontrada.",
			});
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
			res.status(200).json({
				message: "Payments by id found and selected.",
				result,
			});
		} else {
			res.status(400).json({
				message: "The requested parameter does not exist",
			});
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
function obtenerFechaActual() {
	let fechaActual = new Date();
	let dia = fechaActual.getDate();
	let mes = fechaActual.getMonth() + 1; // Los meses en JavaScript comienzan desde 0, por lo que se suma 1
	let año = fechaActual.getFullYear();

	// Formatear el resultado con ceros a la izquierda si es necesario
	if (dia < 10) {
		dia = "0" + dia;
	}
	if (mes < 10) {
		mes = "0" + mes;
	}

	const fecha = año + "-" + mes + "-" + dia;
	return fecha;
}
const deleteUpdatePay = async (req, res) => {
	try {
		const { id } = req.params;
		const findIdPay = await transactionService.idPay(id);
		if (findIdPay) {
			const { pay, detail: detailOld, id_bill } = findIdPay;
			const findBill = await billService.findId(id_bill);
			let newTotal = 0;
			let newStatus = 0;
			if (findBill) {
				const { balance, total_bill } = findBill;
				newTotal = balance + pay;
				if (newTotal < 0) {
					res.status(400).json({
						message: "El valor calculado es mejor al balance de la factura",
						findIdPay,
						findBill,
						newTotal,
						data,
						error: "el valor es Menor",
					});
				} else if (newTotal === 0) {
					newStatus = 3;
				} else if (newTotal !== total_bill) {
					newStatus = 2;
				} else {
					newStatus = 1;
				}
				const dataTransaction = {
					isDelete: true,
					detail: `(Esta transaccion a sido eliminada, el dia ${obtenerFechaActual()}) ${detailOld}`,
				};
				const dataBill = { balance: newTotal, id_status: newStatus };
				const result = await billService.update(id_bill, dataBill);
				if (result) {
					const updateTransaction = await transactionService.update(
						id,
						dataTransaction
					);
					res.status(200).json({
						message: "Recurso encontrado",
						findIdPay,
						findBill,
						newTotal,
						result,
						updateTransaction,
					});
				}
			}
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
			type = "abonada";
			const dataUpdate = {
				num_Fact,
				isWhite,
				fecha_entrega,
				total,
				type,
				id_client,
				detalle_adt,
			};
			//console.log(dataUpdate);
			const updateBill = await billService.update(id_bills, dataUpdate);
			//console.log(updateBill);
			if (updateBill) {
				//console.log("Actualizacion Realizada");
				const result = await transactionService.delete(id);
				if (result) {
					res.status(200).json({
						message: "Required field removed with success",
						result,
					});
				} else {
					res.status(400).json({
						message: "The requested parameter does not exist.",
					});
				}
			} else {
				res.status(400).json({
					message: "No se pudo realizar la operacion de actualizacion.",
				});
			}
		} else {
			res.status(406).json({
				message: "No se ah encontrado el pago a eliminar.",
			});
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
			let { pay: abonoAnt, id_bill } = findTrans;
			const findBill = await billService.findId(id_bill);
			let { total_fact, id_status: status, balance: saldo } = findBill;
			if (data.abono === abonoAnt) {
				//console.log("es igual");
				const result = await transactionService.update(id, data);
				if (result) {
					res.status(200).json({
						message: "Item modified successfully",
						result,
					});
				} else {
					res.status(400).json({
						message: "It was not possible to modify this item",
					});
				}
			} else {
				console.log(data.pay);
				console.log(abonoAnt);
				console.log(saldo);
				const balance = saldo + abonoAnt - data.pay;
				//console.log(saldo);
				let id_status = 1;
				if (!(balance < 0)) {
					if (balance === 0) {
						id_status = 3;
					} else {
						id_status = 2;
					}
					const dataBill = { id_status, balance };
					console.log(dataBill);
					const updateBill = await billService.update(
						id_bill,
						dataBill
					);
					if (updateBill) {
						const result = await transactionService.update(
							id,
							data
						);
						if (result) {
							res.status(200).json({
								message: "Item modified successfully",
								result,
							});
						} else {
							res.status(400).json({
								message: "It was not possible to modify this item",
							});
						}
					}
				} else {
					res.status(406).json({
						message: "No puede realizar un abono mayor al valor del saldo de la factura",
					});
				}
			}
		} else {
			res.status(400).json({ error: "NO ENCONTRO A LA TRANSACCION" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllPay,
	getIdAllPay,
	getAllBill,
	searchIdPay,
	createPay,
	updatePay,
	deletePay,
	deleteUpdatePay,
};
