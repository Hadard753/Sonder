"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authRouter = require("./auth/router");
const mongodb_1 = require("mongodb");
const config = require("./config");
// App class will encapsulate our web server.
class App {
    constructor() {
        this.express = express();
    }
    init(port) {
        console.log('Initializing App...');
        this.initDatabase(() => {
            this.mountRoutes();
            // this.express.listen(port, (err: any) => {
            //   if (err)  return console.log(err);
            //   return console.log(`server is listening on ${port}`);
            // });
        });
    }
    //mounts the routes served by the server.
    mountRoutes() {
        this.express.use('/auth/', authRouter);
    }
    initDatabase(callback) {
        mongodb_1.MongoClient.connect(config.DB_URI, (err, db) => {
            if (err)
                return console.error('Unable to connect to MongoDB server');
            console.log('Connected to MongoDB server');
            db.close();
        });
    }
}
// The express instance is reachable through the public express property.
exports.default = new App().express;
