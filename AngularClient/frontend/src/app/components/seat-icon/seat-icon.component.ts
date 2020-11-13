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

  //------HTML DOM 
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  button: HTMLButtonElement;
  updateStatusForm: FormGroup;

  //------Seat Variables
  selected: boolean;
  updateRequest: boolean;
  seats: Seat[];
  selectedSeat: Seat;
  _RADIUS: number = 40;
  statusOptions = [
    "dirty",
    "clean",
    "occupied",
  ]


  constructor(
    private _ac: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private service : SeatingService,
    private fb  : FormBuilder,
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
    console.log(this.seats);
    this.canvas = document.querySelector('canvas') as
      HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 700;
    this.canvas.height = 500;
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
          this.selectedSeat = s;
          console.log(this.selectedSeat);

        }
        console.log(this.selected);


      });


    });
  }

  /**
     * UPDATE Button and Form
     */
  updateRequestMethod() {    
    this.updateRequest = true; 
    ()=>{
      this.updateStatusForm.get("s").patchValue(null);
    }
  }


  submitSeatUpdate(){
    console.log("updating");
    if(this.updateStatusForm.invalid){
      return;
    }
    //Part of my issue :(
    const body = {
      seatId: this.selectedSeat.id,
      status: this.updateStatusForm.value.status
    };
    this.service.updateSeatbyId(body).subscribe(data =>{
      console.log(data);
      this.updateRequest = false
    });
    this.router.navigate(["/seat"]);
    


  }




  draw(xPos, yPos, color) {
    this.ctx.beginPath();
    this.ctx.arc(xPos, yPos, this._RADIUS, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();

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
