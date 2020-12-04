import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-dialog-all-seat-orders',
  templateUrl: './dialog-all-seat-orders.component.html',
  styleUrls: ['./dialog-all-seat-orders.component.css']
})
export class DialogAllSeatOrdersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:Order[]) { }

  ngOnInit(): void {
  }

}
