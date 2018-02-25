import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
    this.isLoggedIn = this.authService.isLoggedIn ? true : false;
    this.authService.loginChanged.subscribe(
      user => this.isLoggedIn = this.authService.isLoggedIn ? true : false
    );
  }
}
