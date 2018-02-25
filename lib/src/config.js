"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = 'http://localhost:4200';
exports.DB_URI = 'mongodb://localhost:27017/Sonder';
exports.TOKEN_SECRET = 'SonderSecret';
exports.CORS_OPTIONS = {
    origin: exports.CLIENT_URL,
    optionsSuccessStatus: 200,
    allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authentication, x-auth',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true
};
