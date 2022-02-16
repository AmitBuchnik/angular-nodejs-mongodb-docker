import mongoose from "mongoose";

import CustomerModel from "../models/Customer";
import TransactionModel from "../models/Transcation";

class TranscationService {

    async create(body: any) {
        const transcation = new TransactionModel({
            product_id: body.product_id,
            customer: body.customer,
        });

        const data = await transcation.save().then(t => t.populate('customer'));
        const customer = await CustomerModel.findOne({ _id: body.customer });
        customer.transactions.push(data._id);
        await customer.save();
        return data;
    }

    async update(id: string, body: any) {
        const data = TransactionModel.updateOne({ _id: id }, { $set: body })
        return data;
    }

    async getTransactions() {
        const transcations = TransactionModel.find().populate('customer');
        return transcations;
    }

    async getTransactionById(id: string) {
        const transcation = TransactionModel.findById(id);
        return transcation;
    }

    async deleteById(id: string) {
        const transcation = await TransactionModel.findOne({ _id: id });

        const customer = await CustomerModel.findOne({ _id: transcation.customer });
        customer.transactions = customer.transactions.filter(t => String(t) != id);
        console.log(customer.transactions);

        await customer.save();

        const result = await transcation.deleteOne({ _id: id });
        return result;
    }
}

export default new TranscationService();
