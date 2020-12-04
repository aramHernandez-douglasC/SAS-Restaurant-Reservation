import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  customerName  =  '';
  timeSource: string[] =  ['4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];
  customerEmail = '';
  customerNumber = '';
  date  =  new  FormControl(new  Date());
  constructor() { }

  ngOnInit(): void {
  }
  public  reserve(): void{
    /* Typically this method will be used to send the contact form to a server to save it*/
  }
}
