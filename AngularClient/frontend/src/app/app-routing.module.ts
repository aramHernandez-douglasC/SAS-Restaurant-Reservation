import { SeatResolver } from './resolvers/seat.resolver';
import { SeatIconComponent } from './components/seat-icon/seat-icon.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {WelcomeUserComponent} from './components/welcomeuser/welcome-user.component';
import {MenuComponent} from './components/menu/menu.component';
import {ErrorComponent} from './components/error/error.component';
<<<<<<< HEAD
import {AuthcontainerComponent} from "./components/authcontainer/authcontainer.component";
=======
import {ReservationComponent} from './components/reservation/reservation.component';
>>>>>>> c3aba0755c79754bfc096b4d16e587a162c3aa60

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'seat/:role/:name',
    component: SeatIconComponent,
    resolve: {
      seat : SeatResolver
    }
  },
  { path: 'authenticate', component: AuthcontainerComponent },
  { path: 'menu', component: MenuComponent },
  {path: 'welcome', component: WelcomeUserComponent},
  {path: 'reserve', component: ReservationComponent},
  {path: '',   redirectTo: '/welcome', pathMatch: 'full'},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
