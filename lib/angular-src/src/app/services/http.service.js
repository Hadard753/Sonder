"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
require("rxjs/add/operator/share");
let HttpClient = class HttpClient {
    constructor(document, http, cookieService) {
        this.document = document;
        this.http = http;
        this.cookieService = cookieService;
        this.requestsCount = 0;
    }
    get isDebugging() { return this.document.location.href.startsWith('http://localhost:4200'); }
    get serverUrl() { return this.isDebugging ? 'http://localhost:3000' : ''; }
    // Returns the server url
    getServerUrl(endpoint) {
        if (endpoint && endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }
        return `${this.serverUrl}/${endpoint}`;
    }
    get(url, options, disableErrorToast) {
        const observable = this.http
            .get(url, this.generateOptions(options))
            .share();
        return observable;
    }
    post(url, data, options, disableErrorToast) {
        const observable = this.http
            .post(url, data, this.generateOptions(options))
            .share();
        return observable;
    }
    postWithUrlParams(url, data, options, disableErrorToast) {
        options = this.generateOptions(options);
        options.headers = new http_1.Headers();
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const body = new http_1.URLSearchParams();
        for (const property of Object.keys(data)) {
            body.set(property, data[property]);
        }
        const observable = this.http.post(url, body, options).share();
        return observable;
    }
    generateOptions(options) {
        const newOptions = options || {};
        newOptions.withCredentials = true;
        const headers = newOptions.headers || new http_1.Headers({});
        // Add authentication token
        const authToken = this.cookieService.get('token');
        if (authToken) {
            headers.append(`Authentication`, `${authToken}`);
            console.log(headers);
        }
        newOptions.headers = headers;
        return newOptions;
    }
};
HttpClient = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT))
], HttpClient);
exports.HttpClient = HttpClient;
