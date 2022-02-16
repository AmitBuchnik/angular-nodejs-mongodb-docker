import * as express from 'express';

import customerService from '../services/customer.service';

class CustomerController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(`/api/customers/:customer_id`, this.getCustomerById);
        this.router.get(`/api/customers`, this.getCustomers);
        this.router.post(`/api/customers`, this.create);
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            const data = await customerService.create(request.body);
            response.json(data);
        } catch (error) {
            response.json(error);
        }
    }

    getCustomerById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const customer = await customerService.getCustomerById(request.params.customer_id);
            response.send(customer).json();
        } catch (error) {
            response.json(error);
        }
    };

    getCustomers = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const customer = await customerService.getCustomers();
            response.send(customer).json();
        } catch (error) {
            response.json(error);
        }
    };
}

export default CustomerController;
