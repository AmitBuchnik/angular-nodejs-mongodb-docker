import { Transcation } from "./transcation.model";

export class Customer {
    _id: string;
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
    transactions: Transcation[]
};
