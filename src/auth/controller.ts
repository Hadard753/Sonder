import * as express from 'express';
import * as passwordHash from 'password-hash';

import {UserDocument, UserModel} from '../schemas/user';
import {sendOk, sendError} from '../responses';
import { send } from '../../angular-src/node_modules/@types/q';

export function register(req: express.Request, res: express.Response) {
    let user = new UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        sendError(res, 'Invalid user data');
    }).then((token: string) => {
        res.header('x-auth', token);
        sendOk(res, user);
    }).catch((e) => {
        sendError(res, 'Could not generate token', 500);
    });
}

export function login(req: express.Request, res: express.Response) {
    let {email, password} = req.body;
    UserModel.findByCredentials(email, password).then((user: UserDocument) => {
        return user.generateAuthToken().then((token: string) => {
            res.header('x-auth', token);
            sendOk(res, user);
        });
    }).catch(e => {
        sendError(res, e, 401)
    });
}

export function getCurrentUser(req, res: express.Response) {
    sendOk(res, req.user);
}

export function logout(req, res: express.Response) {
    req.user.removeToken(req.token).then(() => {
        sendOk(res);
    }, () => {
        sendError(res, 'Could not delete token. Please try again later.', 500);
    });
}