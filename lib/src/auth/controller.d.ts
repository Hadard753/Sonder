/// <reference types="express" />
import * as express from 'express';
export declare function register(req: express.Request, res: express.Response): void;
export declare function login(req: express.Request, res: express.Response): void;
export declare function getCurrentUser(req: any, res: express.Response): void;
export declare function logout(req: any, res: express.Response): void;
