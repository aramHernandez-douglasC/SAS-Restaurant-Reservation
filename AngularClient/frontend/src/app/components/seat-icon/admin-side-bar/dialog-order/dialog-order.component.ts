import { Seat } from 'src/app/model/Seat';
import { OrderService } from './../../../../service/order.service';
import { AdminSideBarComponent } from './../admin-side-bar.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {


  currentOrder: Order;

  constructor(
    public dialogRef: MatDialogRef<AdminSideBarComponent>,
    public orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
   
  }

  ngOnInit(): void {
    
  }

}
