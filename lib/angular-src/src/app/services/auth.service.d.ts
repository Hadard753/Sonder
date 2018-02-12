import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
import { ApiService } from './api.service';
export declare class AuthService {
    private cookieService;
    private apiService;
    onLoginChanged: Subject<boolean>;
    onErrorChanged: Subject<string>;
    loginObservable: Observable<User>;
    user: User;
    errorMessage: string;
    readonly token: string;
    readonly isLoggedIn: User;
    private setErrorMessage(message);
    constructor(cookieService: CookieService, apiService: ApiService);
    login(email: string, password: string): void;
}
