import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReservationService} from '../../service/reservation-service';
import {Reservation} from '../../model/Reservation';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  customerName  =  '';
  customerEmail = '';
  customerPhone = '';
  reservationDate  =  new  Date();
  reservationDateString: string;
  numOfPeople: number;
  reservationTimeSource = ['4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];
  reservationTime: string;
  newReservation = new Reservation();
  openTimings = [];
  constructor(private service: ReservationService, private router: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  setNoGuests(num): void{
       this.numOfPeople = num.value;
  }
  setReservationTime(time): void{
    this.reservationTime = time.value;
  }
  setReservationDate(date): void{
    console.log('Reached');
    console.log(date.value);
    this.reservationDate = date.value;
    this.reservationDateString = this.datepipe.transform(this.reservationDate, 'dd-MM-yyyy');
    this.service.getTimings(this.reservationDateString).subscribe(data => {
      this.openTimings = data;
      console.log(this.openTimings);
      this.openTimings = this.reservationTimeSource.filter(el => !this.openTimings.includes(el));
      console.log(this.openTimings);
    });
    console.log(this.reservationDateString);
  }

  public  reserve(): void{
    /* Typically this method will be used to send the contact form to a server to save it*/

    this.newReservation.customerName = this.customerName;
    this.newReservation.customerEmail = this.customerEmail;
    this.newReservation.customerPhone = this.customerPhone;
    this.newReservation.numOfPeople = this.numOfPeople;
    this.newReservation.reservationDate = this.datepipe.transform(this.reservationDate, 'dd-MM-yyyy');
    this.newReservation.reservationTime = this.reservationTime;
    console.log(this.newReservation);
    this.service.saveReservation(this.newReservation).subscribe(data => {
      alert('Your table on ' + this.newReservation.reservationDate + ' at ' + this.newReservation.reservationTime + ' has been reserved. Thank you ' + this.newReservation.customerName);
      console.log(data);
      this.newReservation = data;
      this.router.navigate(['/welcome']);
    });
  }
}
