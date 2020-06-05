import express from "express";
import http from "http";
import SocketIO from "socket.io";
import cors from "cors";

import routes from "./routes";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();

        this.app = http.Server(this.server);
        this.io = new SocketIO(this.app);
    }

    middlewares() {
        this.server.use(express.json());

        this.server.use((req, res, next) => {
            req.io = this.io;

            return next();
        });

        //this.routes.use(cors);
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
