import { SeatResolver } from './resolvers/seat.resolver';
import { SeatIconComponent } from './components/seat-icon/seat-icon.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {WelcomeUserComponent} from './components/welcomeuser/welcome-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'seat/:role/:name',
    component: SeatIconComponent,
    resolve: {
      seat : SeatResolver
    }
  },
  {path: 'welcome', component: WelcomeUserComponent},
  { path: '**', component: WelcomeUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
