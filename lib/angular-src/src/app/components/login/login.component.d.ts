import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
export declare class LoginComponent implements OnInit {
    private authService;
    loginForm: FormGroup;
    email: string;
    password: string;
    constructor(authService: AuthService);
    ngOnInit(): void;
    private initForm();
    onSubmit(): void;
}
