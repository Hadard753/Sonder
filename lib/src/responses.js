"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendOk(res, data) {
    res.json({
        success: true,
        error: null,
        data: data
    });
}
exports.sendOk = sendOk;
function sendError(res, error, status) {
    // Log the error
    error && console.error(error);
    res.status(status || 400).json({
        success: false,
        error: error
    });
}
exports.sendError = sendError;
