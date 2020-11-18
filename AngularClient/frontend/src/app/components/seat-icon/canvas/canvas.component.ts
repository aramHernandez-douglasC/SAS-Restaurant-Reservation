import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../../model/Seat';
import { AfterViewInit, Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit{

  //BINDING PROPERTIES
  @Input() width;
  @Input() length;
  @Input() seats;
  @Input() selectedSeat;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLDivElement;
 
  _RADIUS: number = 40;
  




  constructor(
    ) {     
     
      
    
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.canvas = document.querySelector('canvas') as
      HTMLCanvasElement;
      this.container = this.canvas.parentElement as HTMLDivElement;
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
        if(this.clickItem(x, s.xPos, y, s.yPos)){
          this.selectedSeat = s;
          console.log(this.selectedSeat);
          
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

      let area =  (Math.PI)*(Math.pow(this._RADIUS, 2));
      
      if (distance < this._RADIUS && distance < area)  {
      console.log(distance);      
      return true;     
    }
    return false;
  }

   /**
   * This method is just for updating the in canvas array 
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


}
