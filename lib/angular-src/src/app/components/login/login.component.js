"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let LoginComponent = class LoginComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.onErrorChanged.subscribe(err => {
            this.error = err;
        });
        this.initForm();
    }
    initForm() {
        this.loginForm = new forms_1.FormGroup({
            'email': new forms_1.FormControl(this.email, [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.minLength(4)]),
            'password': new forms_1.FormControl(this.password, forms_1.Validators.required)
        });
    }
    onSubmit() {
        this.authService.login(this.loginForm.value['email'], this.loginForm.value['password']);
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
