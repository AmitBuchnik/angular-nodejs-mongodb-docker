import CustomerController from "./controllers/customer.controller";
import TranscationController from "./controllers/transaction.controller";

class Configuration {
    controllers = [];

    constructor() {
        this.controllers.push(new TranscationController());
        this.controllers.push(new CustomerController());
    }
}

export default Configuration;

