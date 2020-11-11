import { SeatingService } from './../../service/seating.service';
import { Seat } from './../../model/Seat';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-seat-icon',
  templateUrl: './seat-icon.component.html',
  styleUrls: ['./seat-icon.component.css']
})
export class SeatIconComponent implements OnInit, AfterViewInit {


  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  seats: Seat[];

  constructor(
    private _ac: ActivatedRoute
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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.seats.forEach(s => {
      this.update(s.xPos, s.yPos, s.cleanStatus);
      this.canvas.addEventListener("click", (event) => {
        if (event.x >= s.xPos
          && event.y >= s.yPos
          && event.x <= s.xPos + 80
          && event.y <= s.yPos + 80
        ) {

          console.log(s);
        }
      })
    });




  }

  draw(xPos, yPos, color) {
    this.ctx.rect(xPos, yPos, 80, 80);
    this.ctx.fillStyle = color;
    this.ctx.fill();

  }
  update(xPos, yPos, cleanStatus) {
    var color: string;
    switch (cleanStatus) {
      case "clean":
        color = "rgba(0, 255, 92, 0.64)";



      case "dirty":
        color = ""
        color = "rgba(255, 255, 92, 0.64)";


      case "occupied":
        color = ""
        color = "rgba(255, 0, 92, 0.64)";

    }
    this.draw(xPos, yPos, color);
  }

}
