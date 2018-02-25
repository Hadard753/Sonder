import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
import { ApiService } from './api.service';
export declare class AuthService {
    private cookieService;
    private apiService;
    loginProcess: Observable<User>;
    loginChanged: Subject<User>;
    onErrorChanged: Subject<string>;
    user: User;
    errorMessage: string;
    isLoading: boolean;
    readonly token: string;
    readonly isLoggedIn: boolean;
    readonly isLoggedInAsync: boolean | Observable<boolean>;
    private setErrorMessage(message);
    constructor(cookieService: CookieService, apiService: ApiService);
    onLoggedIn(user: any): void;
    login(email: string, password: string): void;
    checkLogin(): Observable<User>;
}
