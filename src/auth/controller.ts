import * as express from 'express';

export function login(req: express.Request, res: express.Response) {
    let {username, password} = req.body;
    if (username === 'Hadar!' && password === 'SecretPass') {
        res.status(200).json({
            username: 'Hadar!',
            password: 'SecretPass',
            token: 'myToken'
        });
    } else {
        res.status(401).json({
            error: 'Wrong username or password'
        });
    } 
}

export function getCurrentUser(req: express.Request, res: express.Response) {
    res.json({
        username: 'Hadar!',
        password: 'SecretPass',
        token: 'myToken'
    });
}