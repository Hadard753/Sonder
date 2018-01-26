import * as express from 'express';
import {UserDocument, UserModel} from '../schemas/user';

export function register(req: express.Request, res: express.Response) {
    let user = new UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        res.status(400).send(error);
    }).then((token: string) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
}

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