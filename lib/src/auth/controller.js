"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../schemas/user");
function register(req, res) {
    let user = new user_1.UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        res.status(400).send(error);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
}
exports.register = register;
function login(req, res) {
    let { email, password } = req.body;
    user_1.UserModel.findByCredentials(email, password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch(e => {
        res.status(400).send(e);
    });
}
exports.login = login;
function getCurrentUser(req, res) {
    res.send(req.user);
}
exports.getCurrentUser = getCurrentUser;
function logout(req, res) {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
}
exports.logout = logout;
