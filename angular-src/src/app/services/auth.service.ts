import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
    onLoginChanged: Subject<boolean> = new Subject();
    onErrorChanged: Subject<string> = new Subject();
    loginObservable: Observable<User>;
    user: User;
    errorMessage: string = '';

    get token() {
        return this.cookieService.get('token');
    }

    get isLoggedIn() {
        return this.token && this.user;
    }   

    private setErrorMessage(message: string) {
        this.errorMessage = message;
        this.onErrorChanged.next(this.errorMessage);
    }
    
    constructor(private cookieService: CookieService, private apiService: ApiService) {}

    login(email: string, password: string): void {
        this.setErrorMessage(undefined);
        this.apiService.login(email, password).subscribe(
            result => {
                this.cookieService.put('token', result.token);
                this.user = result.user;
                this.onLoginChanged.next(true);
            }, err => {
                this.setErrorMessage(JSON.parse(err._body).error || err);
            }
        );
    }
}