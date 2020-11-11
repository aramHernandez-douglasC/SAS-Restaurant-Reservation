import { Seat } from './../../model/Seat';
import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-seat-icon',
  templateUrl: './seat-icon.component.html',
  styleUrls: ['./seat-icon.component.css']
})
export class SeatIconComponent implements OnInit, AfterViewInit {

  seat: Seat[];

  constructor() {

  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    let canvas = document.querySelector("canvas");
    //initiliaze the image4
    var image = new Image();
    image.src = "../src/assets/images/tbale.png";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext('2d');
  }

  



}
