import { Customer } from "./customer.model";

export class Transcation {

    _id: string;

    sale_id: number;

    product_id: string;

    customer: Customer;

    date: Date;
};