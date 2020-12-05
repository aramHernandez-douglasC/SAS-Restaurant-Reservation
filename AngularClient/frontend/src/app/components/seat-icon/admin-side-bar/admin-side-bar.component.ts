import { OrderService } from './../../../service/order.service';
import { Canvas } from './../../../model/canvas';
import { DialogAddSeatComponent } from './dialog-add-seat/dialog-add-seat.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { Inject, Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatingService } from '../../../service/seating.service';
import { Seat } from '../../../model/Seat';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from './dialog-order/dialog-order.component';
import { DialogAllSeatOrdersComponent } from './dialog-all-seat-orders/dialog-all-seat-orders.component';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})


export class AdminSideBarComponent implements OnInit {

  //FLAGS
  addSeat: boolean;

  adminFormGroup: FormGroup;
  xValue:number
  yValue:number;
  xSpan:HTMLSpanElement;
  ySpan:HTMLSpanElement;
  width: number = 800;
  length: number = 500;

  //BIND PROPERTIES
  @Input() selectedSeat;
  @Input() seats;
  @Input() statusOptions;
  @Input() canvas;

  @Output() updateItem = new EventEmitter ();




  constructor(    
    private service: SeatingService,
    private fb: FormBuilder,
    private dialog : MatDialog, 
    private orderService : OrderService   
    ) {
    
    
  }

  
  ngOnInit(): void {
    this.adminFormGroup = this.fb.group({
      adminSeatId: [{ value: '', disabled: true }, Validators.required],
      adminSeatCapacity: ['', Validators.required],
      adminSeatStatus: null,
      //adminXRange:['',Validators.required],
      //adminYRange:['',Validators.required],

      adminXRange: [0, [Validators.min(0), Validators.max(this.width)]],
      adminYRange: [0, [Validators.min(0), Validators.max(this.length)]]

    });
    
  }

  

   /***
   * This is the submit method for the ADMIN
   */ 
  
  

  submitAdminSeatUpdate() {
    console.log(this.adminFormGroup);
    if (this.adminFormGroup.invalid) {
      console.log("ivalid request") 
      return;
    }

    let seatItem = new Seat;
    seatItem.id = this.canvas.selectedSeat.id;
    seatItem.capacity=this.adminFormGroup.value.adminSeatCapacity;
    seatItem.cleanStatus = this.adminFormGroup.value.adminSeatStatus;
    seatItem.xPos = this.adminFormGroup.value.adminXRange;
    seatItem.yPos = this.adminFormGroup.value.adminYRange;
    

    this.service.updateSeat(seatItem).subscribe(data =>{
      this.canvas.setSelectedSeat(null);
      
      this.canvas.updateItem(data);    
      
    })   

  }

  

   /** SLIDER CHECK 
   * This method just updates the span element on the HTML so the user knows where the item is positioned
   */
  sliderCheck(){
    
    this.xSpan = document.querySelector("#x-lab");
    this.ySpan = document.querySelector("#y-lab");
    this.xSpan.innerHTML = this.adminFormGroup.value.adminXRange;
    this.ySpan.innerHTML = this.adminFormGroup.value.adminYRange;
  }

  addNew(){
    this.dialog.open(DialogAddSeatComponent);
  }

  orderOpenDialog(){
    this.orderService.getActiveOrder(this.canvas.selectedSeat).subscribe(data =>{
      this.dialog.open(DialogOrderComponent, {
        data: data
      });
    })
   
  }
  orderHistoryOpenDialog(){
    this.orderService.getAllOrdersBySeat(this.canvas.selectedSeat).subscribe(data=>{
      this.dialog.open(DialogAllSeatOrdersComponent,{
        data: data
      })
    })
  }

  

  


  
  

}
