import { SeatingService } from './../../../../service/seating.service';
import { AdminSideBarComponent } from './../admin-side-bar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Seat } from 'src/app/model/Seat';

@Component({
  selector: 'app-dialog-add-seat',
  templateUrl: './dialog-add-seat.component.html',
  styleUrls: ['./dialog-add-seat.component.css']
})
export class DialogAddSeatComponent implements OnInit {

 
  seatInfo : Seat = new Seat();
  addSeatFormGroup: FormGroup;
  statusOptions = [
    "dirty",
    "clean",
    "occupied",
  ]

  constructor(
    public dialogRef: MatDialogRef<AdminSideBarComponent>,
    private fb: FormBuilder,
    private service : SeatingService
    ) { 
    
  }

  ngOnInit(): void {
    this.addSeatFormGroup = this.fb.group({
      addNewSeatCapacity : ['', Validators.required], 
      addNewSeatStatus: null,
      addNewSeatXPos:  ['', Validators.required],
      addNewSeatYPos:  ['', Validators.required]
    });

  }

  addNew(){

    this.seatInfo.capacity = this.addSeatFormGroup.value.addNewSeatCapacity;
    this.seatInfo.cleanStatus = this.addSeatFormGroup.value.addNewSeatStatus;
    this.seatInfo.xPos = this.addSeatFormGroup.value.addNewSeatXPos;
    this.seatInfo.yPos = this.addSeatFormGroup.value.addNewSeatYPos;

    this.service.addSeat(this.seatInfo).subscribe(data=>{
      console.log(data);
    })
    

  }
  onNoClick(){
    this.dialogRef.close();
  }



}
