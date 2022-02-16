import * as express from 'express';

import transactionService from '../services/transaction.service';

class TranscationController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(`/api/transcations`, this.getTransactions);
        this.router.get(`/api/transcations/:id`, this.getTransactionById);
        this.router.post(`/api/transcations`, this.create);
        this.router.put(`/api/transcations/:id`, this.update);
        this.router.delete(`/api/transcations/:id`, this.deleteById);
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            const data = await transactionService.create(request.body);
            response.json(data);
        } catch (error) {
            response.json(error);
        }
    }

    update = async (request: express.Request, response: express.Response) => {
        try {
            const data = await transactionService.update(request.params.id, request.body);
            response.json(data);
        } catch (error) {
            response.json(error);
        }
    }

    getTransactions = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const transcations = await transactionService.getTransactions();
            response.send(transcations).json();
        } catch (error) {
            response.json(error);
        }
    };

    getTransactionById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const transcation = await transactionService.getTransactionById(request.params.id);
            response.send(transcation).json();
        } catch (error) {
            response.json(error);
        }
    };

    deleteById = async (
        request: express.Request,
        response: express.Response
    ) => {
        try {
            const transcation = await transactionService.deleteById(request.params.id);
            response.send(transcation).json();
        } catch (error) {
            response.json(error);
        }
    };
}

export default TranscationController;
