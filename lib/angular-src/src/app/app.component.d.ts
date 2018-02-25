import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
export declare class AppComponent implements OnInit {
    private authService;
    isLoggedIn: boolean;
    constructor(authService: AuthService);
    ngOnInit(): void;
}
