import CustomerModel from "../models/Customer";

class CustomerService {

    async getCustomers() {
        const customer = CustomerModel.find().populate({
            path: 'transactions',
            model: 'Transaction'
        });
        return customer;
    }

    async getCustomerById(customer_id: string) {
        const customer = CustomerModel.find({ customer_id: customer_id });
        return customer;
    }

    async create(body: any) {
        const customer = new CustomerModel({ ...body });
        const data = customer.save();
        return data;
    }
}

export default new CustomerService();
