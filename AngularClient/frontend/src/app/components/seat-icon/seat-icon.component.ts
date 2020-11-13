import { FormBuilder, FormGroup } from '@angular/forms';
import { SeatingService } from './../../service/seating.service';
import { Seat } from './../../model/Seat';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-seat-icon',
  templateUrl: './seat-icon.component.html',
  styleUrls: ['./seat-icon.component.css']
})
export class SeatIconComponent implements OnInit, AfterViewInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    //Canvas 
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width:number = 700;
  length: number = 500;
  //------HTML DOM 

  button: HTMLButtonElement;
  updateStatusForm: FormGroup;

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



  constructor(
    private _ac: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private service: SeatingService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.seats = this._ac.snapshot.data.seat

  }
  ngOnInit(): void {
    this.updateStatusForm = this.fb.group({
      status: null,
    })
  }

  ngAfterViewInit() {
    /**
     * CANVAS Methods and Manipulation 
     */
    this.canvas = document.querySelector('canvas') as
      HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.length;
    this.canvasfill();
  }

  /**
     * UPDATE Button and Form
     */


  updateRequestMethod() {
    this.updateRequest = true;
    () => {
      this.updateStatusForm.get("s").patchValue(null);
    }
  }


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
  updateItem(array: any[], item: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == item.id) {
        array[i] = item;
      }
    }
  }

  /***
   * CANVAS METHODS
   */


  canvasfill() {
     this.ctx.clearRect(0,0,this.width,this.length);
    this.seats.forEach(s => {
      var color;
      switch (s.cleanStatus) {
        case "clean":
          color = "rgba(0, 255, 92, 0.64)";
          break;

        case "dirty":
          color = "rgba(255, 255, 92, 0.64)";
          break;


        case "occupied":
          color = "rgba(255, 0, 92, 0.64)";
          break;
      }
      this.draw(s.xPos, s.yPos, color);
      this.canvas.addEventListener("click", (event) => {
        
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (this.clickItem(x, s.xPos, y, s.yPos)) {
          this.updateRequest = false;
          this.selectedSeat = s;
        }
      });
    });
  }

  draw(xPos, yPos, color) {
   
    this.ctx.beginPath();
    this.ctx.arc(xPos, yPos, this._RADIUS, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();

  }

  clickItem(xMouse, xPos, yMouse, yPos) {
    //Pitagoran Theory
    const distance =
      Math.sqrt(((xMouse - xPos) * (xMouse - xPos)) + ((yMouse - yPos) * (yMouse - yPos)));
    if (distance < this._RADIUS) {
      console.log(distance);
      return this.selected = true;
    }
    return this.selected = false;
  }



}
