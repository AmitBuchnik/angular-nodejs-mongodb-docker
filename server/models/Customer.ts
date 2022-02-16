import mongoose, { Schema, Types } from 'mongoose';

// mongoose.set('debug', true);

// Document interface
export interface ICustomer extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    country: string;
    city: string;
    street: string;
    phone: string;
    total_price: string;
    currency: string;
    cerdit_card_type: string;
    cerdit_card_number: string;
    transactions: mongoose.Schema.Types.ObjectId[];
};

const CustomerSchema = new Schema<ICustomer>({
    customer_id: { type: String, required: true },
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    country: String,
    city: String,
    street: String,
    phone: String,
    total_price: String,
    currency: String,
    cerdit_card_type: String,
    cerdit_card_number: String,
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);

// CustomerModel.findOne({}).populate<{ transactions: any[] }>([{ "path": "transactions", "model": "Transaction" }]).orFail().then(doc => {
//     console.log('populate transactions: ' + doc);
// });

export default CustomerModel;
