"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
function register(req, res) {
    let user = new user_model_1.UserModel(req.body.user);
    user.save().then((user) => {
        res.send(user);
    }, (error) => {
        res.status(400).send(error);
    });
}
exports.register = register;
function login(req, res) {
    let { username, password } = req.body;
    if (username === 'Hadar!' && password === 'SecretPass') {
        res.status(200).json({
            username: 'Hadar!',
            password: 'SecretPass',
            token: 'myToken'
        });
    }
    else {
        res.status(401).json({
            error: 'Wrong username or password'
        });
    }
}
exports.login = login;
function getCurrentUser(req, res) {
    res.json({
        username: 'Hadar!',
        password: 'SecretPass',
        token: 'myToken'
    });
}
exports.getCurrentUser = getCurrentUser;
