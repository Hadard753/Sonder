import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Http } from '@angular/http/src/http';
import { HomeComponent } from './components/home/home.component';
import { HttpClient } from './services/http.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CookieModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ApiService,
    HttpClient,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
