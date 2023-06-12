const models = require("../models/index");

class transactionService {
	static async all() {
		try {
			const result = await models.transaction.findAll();
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async create(transaction) {
		try {
			const result = await models.transaction.create(transaction);
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async idPay(id) {
		try {
			const result = await models.transaction.findByPk(id);
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async idAll(id) {
		try {
			const result = await models.transaction.findAndCountAll({
				where: {
					id_bills: id,
				},
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async delete(id) {
		try {
			const result = await models.transaction.destroy({ where: { id } });
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async update(id, data) {
		try {
			const result = await models.transaction.update(data, {
				where: { id },
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
	static async numFact(data) {
		try {
			const result = await models.transaction.findAll({
				where: { num_bill: data },
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
	static async deleteLote(data) {
		try {
			const result = await models.transaction.destroy({
				where: {
					num_bill: data,
				},
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = transactionService;
