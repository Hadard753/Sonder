"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
// App class will encapsulate our web server.
class App {
    constructor() { }
    init(port) {
        this.express = express();
        // Allow parsing JSON data obtained from post
        this.express.use(bodyParser.json());
        this.initDatabase(() => {
            this.mountRoutes();
            this.express.use(this.allowOriginMiddleware);
            this.express.listen(port);
            console.log(`Server is now listening on port ${port}...`);
        });
    }
    //mounts the routes served by the server.
    mountRoutes() {
        this.express.use('/auth', require('./auth/routes'));
    }
    initDatabase(callback) {
        mongoose.connect(config.DB_URI);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Unable to connect to MongoDB server'));
        db.once('open', function () {
            // we're connected!
            console.log('Connected to MongoDB server');
            this.mongoose = mongoose;
            callback();
        });
    }
    allowOriginMiddleware(req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', config.CLIENT_URL);
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authentication');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // Pass to next layer of middleware
        next();
    }
}
exports.App = App;
// The express instance is reachable through the public express property.
exports.default = new App();
