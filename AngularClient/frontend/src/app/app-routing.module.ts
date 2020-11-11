import { SeatResolver } from './resolvers/seat.resolver';
import { SeatIconComponent } from './components/seat-icon/seat-icon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'seat',
    component: SeatIconComponent,
    resolve: {
      seat : SeatResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
