"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
