import { SeatingService } from './service/seating.service';
import { AuthenticationService } from './service/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SeatIconComponent } from './components/seat-icon/seat-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { WelcomeUserComponent } from './components/welcomeuser/welcome-user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SeatIconComponent,
    WelcomeUserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,

    //Component modules
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule
   
  ],
  providers: [AuthenticationService, SeatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
