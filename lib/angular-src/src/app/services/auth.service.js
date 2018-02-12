"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Subject_1 = require("rxjs/Subject");
let AuthService = class AuthService {
    constructor(cookieService, apiService) {
        this.cookieService = cookieService;
        this.apiService = apiService;
        this.onLoginChanged = new Subject_1.Subject();
        this.onErrorChanged = new Subject_1.Subject();
        this.errorMessage = '';
    }
    get token() {
        return this.cookieService.get('token');
    }
    get isLoggedIn() {
        return this.token && this.user;
    }
    setErrorMessage(message) {
        this.errorMessage = message;
        this.onErrorChanged.next(this.errorMessage);
    }
    login(email, password) {
        this.setErrorMessage(undefined);
        this.apiService.login(email, password).subscribe(result => {
            this.cookieService.put('token', result.token);
            this.user = result.user;
            this.onLoginChanged.next(true);
        }, err => {
            this.setErrorMessage('Error occurred. try again');
        });
    }
};
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
