"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
let AuthService = class AuthService {
    constructor(cookieService, apiService) {
        this.cookieService = cookieService;
        this.apiService = apiService;
        this.loginProcess = new Observable_1.Observable();
        this.loginChanged = new Subject_1.Subject();
        this.onErrorChanged = new Subject_1.Subject();
        this.errorMessage = '';
        this.isLoading = false;
    }
    get token() {
        return this.cookieService.get('token');
    }
    get isLoggedIn() {
        return this.token && this.user ? true : false;
    }
    // Used within AuthGuard, returns promise if login haven't been figured out yet
    get isLoggedInAsync() {
        return this.isLoggedIn || (this.token && this.checkLogin().map(user => user ? true : false, err => false));
    }
    setErrorMessage(message) {
        this.errorMessage = message;
        this.onErrorChanged.next(this.errorMessage);
    }
    onLoggedIn(user) {
        this.loginChanged.next(user);
        this.user = user;
    }
    login(email, password) {
        this.setErrorMessage(undefined);
        this.apiService.login(email, password).subscribe(result => {
            this.cookieService.put('token', result.token);
            this.onLoggedIn(result.user);
        }, err => {
            this.setErrorMessage(JSON.parse(err._body).error || err);
        });
    }
    checkLogin() {
        if (this.isLoading) {
            return this.loginProcess;
        }
        else {
            this.isLoading = true;
            this.loginProcess = this.apiService.getCurrentUser();
            this.loginProcess.subscribe(user => {
                this.onLoggedIn(user);
            }, err => {
                this.isLoading = false;
                this.setErrorMessage(`could not fetch current user: ${err}`);
                return false;
            });
        }
    }
};
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
