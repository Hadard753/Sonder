"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../schemas/user");
exports.isAuthenticate = (req, res, next) => {
    let token = req.header('x-auth');
    user_1.UserModel.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(undefined);
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};
