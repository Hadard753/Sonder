import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email, Validators.minLength(4)]),
      'password': new FormControl(this.password, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.loginForm, undefined, 2);
  }
}
