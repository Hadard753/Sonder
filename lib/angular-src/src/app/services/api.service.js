"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/operator/map");
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    get serverUrl() { return 'http://localhost:3000'; }
    getAuthApiEndPoint(endPoint) {
        return `${this.serverUrl}/auth/${endPoint}`;
    }
    login(email, password) {
        return this.http.post(this.getAuthApiEndPoint('login'), { email, password })
            .map(res => {
            return {
                token: res.json().data.token,
                user: res.json().data
            };
        });
    }
    getCurrentUser() {
        return this.http.get(this.getAuthApiEndPoint('current'))
            .map(res => res.json().data);
    }
};
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
