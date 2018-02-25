import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuardService } from '../services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuardService]
  },
  {
    path: '**', redirectTo: '',
  } // redirect the user when invaild route entered.
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
