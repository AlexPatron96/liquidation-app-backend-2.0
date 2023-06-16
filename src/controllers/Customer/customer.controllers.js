const custumerService = require("../../services/customer.services");

const getAllItem = async (req, res) => {
	try {
		const result = await custumerService.findAll();
		res.status(200).json({ message: "Available Customer ", result });
	} catch (error) {
		res.status(400).json({ error: error.message, message: "" });
	}
};

const createItem = async (req, res) => {
	try {
		const vehicle = req.body;
		console.log(vehicle);
		const result = await custumerService.create(vehicle);
		if (result) {
			res.status(201).json({ message: "Customer created", result });
		} else {
			res.status(400).json({ message: "Something wrong" });
		}
	} catch (error) {
		// console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};
const createClouster = async (req, res) => {
	try {
		const dataClouster = req.body;
		// console.log(dataClouster);
		const result = await custumerService.createByClouster(dataClouster);
		if (result) {
			res.status(201).json({ message: "Customers createds", result });
		} else {
			res.status(400).json({ message: "Something wrong" });
		}
	} catch (error) {
		// console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};

const getIdItem = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await custumerService.findId(id);
		if (result) {
			res.status(200).json({
				message: "Customer by id found and selected.",
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

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await custumerService.delete(id);
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
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateItem = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const result = await custumerService.update(id, data);
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
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllItem,
	getIdItem,
	createItem,
	deleteItem,
	updateItem,
	createClouster,
};
