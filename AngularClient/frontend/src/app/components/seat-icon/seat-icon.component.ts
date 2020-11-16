import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatingService } from './../../service/seating.service';
import { Seat } from './../../model/Seat';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class SeatIconComponent implements OnInit, AfterViewInit {

  //Accordion Variables
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  //Canvas Variables
  isAdmin: boolean = true;
  role: string = "Employee";
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLDivElement;
  width: number = 800;
  length: number = 500;

  //------HTML DOM 

  button: HTMLButtonElement;
  adminFormGroup: FormGroup
  updateStatusForm: FormGroup;
  xValue:number
  yValue:number;fr
  xSpan:HTMLSpanElement;
  ySpan:HTMLSpanElement;
  

  //------Seat Variables
  selected: boolean;
  updateRequest: boolean;
  seats: Seat[];
  selectedSeat: Seat;
  updatedSeat: Seat;
  _RADIUS: number = 40;
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
    private fb: FormBuilder) {
    this.seats = this._ac.snapshot.data.seat
    // this.role = this._ac.snapshot.paramMap.get('role');
    // this.name = this._ac.snapshot.paramMap.get('name');

  }
  /***
   * LIFECYCLE
   * This method will be the second one to be called by the component
   * here is where you build any element that needs to be initialized whith the component
   */
  ngOnInit(): void {
    this.updateStatusForm = this.fb.group({
      status: null,
    });

    this.adminFormGroup = this.fb.group({
      adminSeatId: [{value: '', disabled:true}, Validators.required],
      adminSeatCapacity: ['',Validators.required],
      adminSeatStatus: null,
      adminXRange:['',Validators.required],
      adminYRange:['',Validators.required],
      
      //adminXRange:[0,[Validators.min(0), Validators.max(this.width)]],
      //adminYRange:[0,[Validators.min(0),Validators.max(this.length)]]
      
    });

  }

  /**
   * LIFECICLE
   * 
   * This method waits for all the HTML elements to be loaded on the screen.
   * This method should be used if you want to perform HTML DOM  manipulation.
   */
  ngAfterViewInit() {
    /**
     * CANVAS Methods and Manipulation 
     */
    this.canvas = document.querySelector('canvas') as
      HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.container = this.canvas.parentElement as HTMLDivElement;
    this.canvas.width = this.width;
    this.canvas.height = this.length;
    this.canvasfill();
    window.addEventListener('resize', this.respondCanvas);
  }

  respondCanvas() {
    this.canvas.width = this.container.getBoundingClientRect().width;
    this.canvas.height = this.container.getBoundingClientRect().height;

    return this.canvasfill();

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
      this.updateStatusForm.get("s").patchValue(null);      
    }
  }

  
  /**
   * This method submits any data that was put on the form to the back end 
   * using the service declared above and stores it on a object of type 
   * Seat
   */
  submitSeatUpdate() {

    if (this.updateStatusForm.invalid) {
      return;
    }

    const body = {
      seatId: this.selectedSeat.id,
      status: this.updateStatusForm.value.status
    };
    this.service.updateSeatbyId(body).subscribe(data => {

      this.updateRequest = false;
      this.selectedSeat = null;
      this.updateItem(this.seats, data);
      console.log(this.seats);
      this.canvasfill();

    });

  }

  /***
   * This is the submit method for the ADMIN
   */
  submitAdminSeatUpdate() {
    if (this.updateStatusForm.invalid) {
      return;
    }

    let seatItem = new Seat;
    seatItem.id = this.selectedSeat.id;
    seatItem.capacity=this.adminFormGroup.value.adminSeatCapacity;
    seatItem.cleanStatus = this.adminFormGroup.value.adminSeatStatus;
    seatItem.xPos = this.adminFormGroup.value.adminXRange;
    seatItem.yPos = this.adminFormGroup.value.adminYRange;
    

    this.service.updateSeat(seatItem).subscribe(data =>{
      this.selectedSeat = null;
      this.updateItem(this.seats, data);
      console.log(this.seats);
      this.canvasfill();
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

  /**
   * This method is just for updating the array 
   * 
   * @param array The array you want to update
   * @param item The item that will update the array
   */
  updateItem(array: any[], item: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == item.id) {
        array[i] = item;
      }
    }
  }

  //------------------------CANVAS METHODS/MANIPULATION

  /**
   * This method will erase and fill the canvas everytime is called and it will draw each one of the items 
   * that are inside the seats array
   * 
   */
  canvasfill() {
    this.ctx.clearRect(0, 0, this.width, this.length);
    this.seats.forEach(s => {
      var color;
      switch (s.cleanStatus) {
        case "clean":
          color = "#0C755B";
          break;

        case "dirty":
          color = "#F3AF42";
          break;


        case "occupied":
          color = "#F2293A";
          break;
      }
      this.draw(s.xPos, s.yPos, color);
      this.canvas.addEventListener("click", (event) => {

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (this.clickItem(x, s.xPos, y, s.yPos)) {
          this.selectedSeat = null;
          this.updateRequest = false;
          this.selectedSeat = s;         
        }
      });
    });
  }

  /**
   * This method draws a SINGLE element on to the canvas (in this case a circle) 
   * using the specified parameters 
   * 
   * @param xPos The position of the item you want to draw on the X-Axis
   * @param yPos The position of the item you want to draw on the X-Axis
   * @param color The color you want the item to be fill with
   */
  draw(xPos, yPos, color) {

    this.ctx.beginPath();
    this.ctx.arc(xPos, yPos, this._RADIUS, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();

  }

  /**
   * This method makes a calculation of the Euclidean distance between the 2 points 
   * using cartesian coordinates:
   * 
   * @param xMouse The position of the mouse when the item was clicked on the X-Axis
   * @param xPos   The position of the element on the X-Axis
   * @param yMouse The position of the mouse when the item was clicked on the Y-Axis
   * @param yPos   The position of the element on the Y-Axis
   * 
   * It then calculated if the distance between the radius and the point clicked is less that 
   * the radius of the circle, meaning the user clicked anywhere inside the circle area.
   */
  clickItem(xMouse, xPos, yMouse, yPos) {
    //Euclidean distance
    const distance =
      Math.sqrt(((xMouse - xPos) * (xMouse - xPos)) + ((yMouse - yPos) * (yMouse - yPos)));
    if (distance < this._RADIUS) {
      console.log(distance);
      
      return this.selected = true;
     
    }
    return this.selected = false;
  }



}
