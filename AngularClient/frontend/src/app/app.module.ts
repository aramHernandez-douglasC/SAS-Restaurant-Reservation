import { OrderService } from './service/order.service';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MenuComponent } from './components/menu/menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponent } from './components/error/error.component';
import { AdminSideBarComponent } from './components/seat-icon/admin-side-bar/admin-side-bar.component';
import { CanvasComponent } from './components/seat-icon/canvas/canvas.component';
import { NotificationBarComponent } from './components/seat-icon/notification-bar/notification-bar.component';
import { DialogAddSeatComponent } from './components/seat-icon/admin-side-bar/dialog-add-seat/dialog-add-seat.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SeatIconComponent,
    WelcomeUserComponent,
    MenuComponent,
    ErrorComponent,
    
    AdminSideBarComponent,
    
    CanvasComponent,
    
    NotificationBarComponent,
    
    DialogAddSeatComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    AlertModule.forRoot(),

    //Forms Modules
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,

    //Angular-Component modules
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule

  ],
  entryComponents: [DialogAddSeatComponent],
  providers: [AuthenticationService, SeatingService, OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
