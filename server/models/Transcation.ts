import mongoose, { Schema, Types } from 'mongoose';
var AutoIncrement = require('mongoose-sequence')(mongoose);

// mongoose.set('debug', true);

// Document interface
export interface ITranscation extends mongoose.Document {

    _id: mongoose.Schema.Types.ObjectId;

    sale_id: number;

    product_id: string;

    date: Date;

    customer: mongoose.Schema.Types.ObjectId;
};

const TransactionSchema = new Schema<ITranscation>({
    sale_id: Number,
    product_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
});

TransactionSchema.plugin(AutoIncrement, { id: 'sale_id_seq', inc_field: 'sale_id' });

const TransactionModel = mongoose.model<ITranscation>('Transaction', TransactionSchema);

// TransactionModel.findOne({}).populate<{ customer: ICustomer }>([{ "path": "customer", "model": "Customer" }]).orFail().then(doc => {
//     console.log('populate customer: ' + doc);
// });

export default TransactionModel;
