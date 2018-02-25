import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
    loginProcess = new Observable<User>();
    loginChanged = new Subject<User>();
    onErrorChanged: Subject<string> = new Subject();
    user: User;
    errorMessage: string = '';
    isLoading = false;

    get token(): string {
        return this.cookieService.get('token');
    }

    get isLoggedIn(): boolean {
        return this.token && this.user ? true : false;
    }   

    // Used within AuthGuard, returns promise if login haven't been figured out yet
    get isLoggedInAsync(): boolean | Observable<boolean> {
        return this.isLoggedIn || (this.token && this.checkLogin().map(
            user => user ? true : false,
            err => false
        ));
    }

    private setErrorMessage(message: string): void {
        this.errorMessage = message;
        this.onErrorChanged.next(this.errorMessage);
    }
    
    constructor(private cookieService: CookieService, private apiService: ApiService) {}

    onLoggedIn(user): void {
        this.user = user;
        this.loginChanged.next(user);
    }

    login(email: string, password: string): void {
        this.setErrorMessage(undefined);
        this.apiService.login(email, password).subscribe(
            result => {
                this.cookieService.put('token', result.token);
                this.onLoggedIn(result.user);
            }, err => {
                this.setErrorMessage(JSON.parse(err._body).error || err);
            }
        );
    }

    checkLogin() {
        if (this.isLoading) {
          return this.loginProcess;
        } else {
          this.isLoading = true;
          this.loginProcess = this.apiService.getCurrentUser();
          this.loginProcess.subscribe(
            user => {
              this.onLoggedIn(user);
            },
            err => {
              this.isLoading = false;
              this.setErrorMessage(`could not fetch current user: ${err}`);
              return false;
            }
          );
        }
    }
}