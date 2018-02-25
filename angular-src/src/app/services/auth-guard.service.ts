import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(route: Route){
    return this.authService.isLoggedInAsync;
  }

  canActivate(next: ActivatedRouteSnapshot
    , state: RouterStateSnapshot) {
    return this.authService.isLoggedInAsync;
  }
}
