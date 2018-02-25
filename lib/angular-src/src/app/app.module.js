"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const ngx_cookie_1 = require("ngx-cookie");
const http_1 = require("@angular/http");
const app_component_1 = require("./app.component");
const login_component_1 = require("./components/login/login.component");
const api_service_1 = require("./services/api.service");
const auth_service_1 = require("./services/auth.service");
const home_component_1 = require("./components/home/home.component");
const http_service_1 = require("./services/http.service");
const app_routing_module_1 = require("./modules/app-routing.module");
const auth_guard_service_1 = require("./services/auth-guard.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            home_component_1.HomeComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            ngx_cookie_1.CookieModule.forRoot(),
            ng_bootstrap_1.NgbModule.forRoot(),
            app_routing_module_1.AppRoutingModule
        ],
        providers: [
            api_service_1.ApiService,
            http_service_1.HttpClient,
            auth_guard_service_1.AuthGuardService,
            auth_service_1.AuthService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
