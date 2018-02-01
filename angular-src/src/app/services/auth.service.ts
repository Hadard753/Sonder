import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
    onLoginChanged: Subject<boolean> = new Subject();
    loginObservable: Observable<User>;
    user: User;
    errorMessage: string = '';

    get token() {
        return this.cookieService.get('token');
    }

    get isLoggedIn() {
        return this.token && this.user;
    }   
    
    constructor(private cookieService: CookieService, private apiService: ApiService) {}

    login(email: string, password: string): void {
        this.apiService.login(email, password).subscribe(
            result => {
                this.cookieService.put('token', result.token);
                this.user = result.user;
                this.onLoginChanged.next(true);
            }, err => {
                this.errorMessage =  'Error occurred. try again';
            }
        )
    }
}