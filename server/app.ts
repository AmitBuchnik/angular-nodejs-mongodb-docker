import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv/config');

import Configuration from './configurations';

class App {
    public app: express.Application;

    constructor(controllers) {
        this.app = express();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeServer();
        this.initializeMongoose();
        this.closeDBOnExit();
    }

    initializeMongoose() {
        mongoose.connect(process.env.DB_CONNECTION,
            () => {
                console.log('connected to DB');
            })
    }

    closeDBOnExit() {
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose disconnected on app termination');
                process.exit(0);
            });
        });
    }

    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Expose-Headers', 'authorization');
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeServer() {
        const port = 3000;
        const server = this.app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`);
        });
        server.on('error', console.error);
    }
}

const configuration = new Configuration();
new App(configuration.controllers);

export default App;