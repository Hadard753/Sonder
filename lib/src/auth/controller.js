"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../schemas/user");
const responses_1 = require("../responses");
function register(req, res) {
    let user = new user_1.UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        responses_1.sendError(res, 'Invalid user data');
    }).then((token) => {
        res.header('Authentication', token);
        responses_1.sendOk(res, user);
    }).catch((e) => {
        responses_1.sendError(res, 'Could not generate token', 500);
    });
}
exports.register = register;
function login(req, res) {
    let { email, password } = req.body;
    user_1.UserModel.findByCredentials(email, password).then((user) => {
        return user.generateAuthToken().then((token) => {
            responses_1.sendOk(res, { user, token });
        });
    }).catch(e => {
        responses_1.sendError(res, e, 401);
    });
}
exports.login = login;
function getCurrentUser(req, res) {
    responses_1.sendOk(res, req.user);
}
exports.getCurrentUser = getCurrentUser;
function logout(req, res) {
    req.user.removeToken(req.token).then(() => {
        responses_1.sendOk(res);
    }, () => {
        responses_1.sendError(res, 'Could not delete token. Please try again later.', 500);
    });
}
exports.logout = logout;
