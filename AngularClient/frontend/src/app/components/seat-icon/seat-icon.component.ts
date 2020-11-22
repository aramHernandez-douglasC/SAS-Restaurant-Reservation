import { Canvas } from './../../model/canvas';
import { CanvasComponent } from './canvas/canvas.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatingService } from './../../service/seating.service';
import { Seat } from './../../model/Seat';
import {Inject, AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';



@Component({
  selector: 'app-seat-icon',
  templateUrl: './seat-icon.component.html',
  styleUrls: ['./seat-icon.component.css']
})
export class SeatIconComponent implements OnInit {

  //Accordion Variables
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );  

  snackBarMesage: string;
  isAdmin: boolean;
  role: string ;
  name: string;


  //BINDING PROPERTIES
  width: number = 800;
  length: number = 500;  
  seats: Seat[];
  selectedSeat: Seat;
  //Flags
  updateRequest: boolean;
  selected: boolean;



  //------HTML DOM 

  button: HTMLButtonElement; 
  updateStatusForm: FormGroup;
  canvas : Canvas;
  

  //------Seat Variables
  updatedSeat: Seat;
  statusOptions = [
    "dirty",
    "clean",
    "occupied",
  ]



  /**
   * CONSTRUCTOR
   * 
   * This is the first thing that the component loads before anything else
   * any type of global object initializer should be declared as a parameter
   * and any item that should be loaded before the component is initialized,
   *  should be initialized inside the constructor
   * 
   * @param _ac :ActivetedRoute it will help connect to the SeatResolver so it can load the array before anything else
   * @param breakpointObserver Will help editing the side-nav-bar NOTE: sear for the angular material documentation for more info
   * @param service this service will instantiate a the SeatingService so it can do http requests to the back-end.  
   * @param fb this will build any form declared on the html 
   * @param router this will give a route to the any of the components. ROUTE NEEDS TO BE DECLARED UNDER app-routing-module FIRST!
   */
  constructor(
    private _ac: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private service: SeatingService,
    private fb: FormBuilder, // employee
    ) 
    {
    this.canvas = new Canvas();    
    this.seats =  this._ac.snapshot.data.seat    
    this.role = this._ac.snapshot.paramMap.get('role');
    this.name = this._ac.snapshot.paramMap.get('name');
    
    if (this.role == "Admin"){
      this.isAdmin = true;
    }

  }
  /***
   * LIFECYCLE
   * This method will be the second one to be called by the component
   * here is where you build any element that needs to be initialized whith the component
   */
  ngOnInit(): void {
    console.log(this.seats);
    this.updateStatusForm = this.fb.group({// employee
      status: null,
    });     
    this.canvas.setRadius(40)
  }

  setSelectedSeat(seat:Seat){
    this.selectedSeat = seat;
  }
  setUpdateRequest(req){
    this.updateRequest = req;

  }

 

  //---------------UPDATE CANVAS AND ELEMENTS SECTION


  /**
   * This method checks for if the user pressed the "update" button 
   * in case it was it will set the updateRequest = true so the system knows 
   * if the user wants to perform an update, this way the form is loaded on screen using the *ngIf
   * on the HTML 
   * 
   * It also sets the default value of the select item to true.
   */
  updateRequestMethod() {
    this.updateRequest = true;
    () => {
      this.updateStatusForm.get("s").patchValue(null); // employee     
    }
  }

  


  
  /**
   * This method submits any data that was put on the form to the back end 
   * using the service declared above and stores it on a object of type 
   * Seat
   */
  submitSeatUpdate() {// employee

    if (this.updateStatusForm.invalid) {
      return;
    }

    const body = {
      seatId: this.selectedSeat.id,
      status: this.updateStatusForm.value.status

    };

    this.service.updateSeatbyId(body).subscribe(data => {// employee

      this.updateRequest = false;
      this.selectedSeat = null;
      this.canvas.updateItem(data);
      console.log(this.seats);
      this.canvas.canvasfill();

    });

  }

 

 
 

  

}
