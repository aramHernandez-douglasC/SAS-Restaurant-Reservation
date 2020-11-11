import { SeatingService } from './../../service/seating.service';
import { Seat } from './../../model/Seat';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  selected: boolean;

  seats: Seat[];

  constructor(
    private _ac: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.seats = this._ac.snapshot.data.seat

  }


  ngOnInit(): void {

  }
  ngAfterViewInit() {
    console.log(this.seats);
    this.canvas = document.querySelector('canvas') as
      HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 700;
    this.canvas.height = 500;

    this.seats.forEach(s => {


      switch (s.cleanStatus) {
        case "clean":
          s.color = "rgba(0, 255, 92, 0.64)";
          break;

        case "dirty":
          s.color = "rgba(255, 255, 92, 0.64)";
          break;


        case "occupied":
          s.color = "rgba(255, 0, 92, 0.64)";
          break;

      }

      this.draw(s.xPos, s.yPos, s.color);
      this.canvas.addEventListener("click", (event) => {

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.selected = this.clickItem(x, s.xPos, y, s.yPos)
        if (this.selected) {
          console.log(s);
        }

      })


    });




  }

  draw(xPos, yPos, color) {
    this.ctx.beginPath();
    this.ctx.arc(xPos, yPos, 30, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();

  }

  clickItem(xMouse, xPos, yMouse, yPos) {
    //Pitagoran Theory
    const distance =
      Math.sqrt(((xMouse - xPos) * (xMouse - xPos)) + ((yMouse - yPos) * (yMouse - yPos)));


    if (distance < 80) {
      console.log(distance);
      return true;
    }
    return false;
  }

  update(xPos, yPos, cleanStatus) {
    var color: string;

    switch (cleanStatus) {
      case "clean":
        console.log(cleanStatus);
        color = "rgba(0, 255, 92, 0.64)";
        break;



      case "dirty":
        color = ""
        console.log(cleanStatus);
        color = "rgba(255, 255, 92, 0.64)";
        break;


      case "occupied":
        color = ""
        console.log(cleanStatus);
        color = "rgba(255, 0, 92, 0.64)";
        break;



    }
    this.draw(xPos, yPos, color);
  }

}
