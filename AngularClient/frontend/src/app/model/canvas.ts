
import { utils } from 'protractor';
import { reduce } from 'rxjs/operators';
import { Seat } from './Seat';

export class Canvas {
  private canvas: HTMLCanvasElement; //done
  private ctx: CanvasRenderingContext2D; //done
  private container: HTMLDivElement;

  private width: number; //done
  private length: number; //done
  private _RADIUS: number;//done  

  private selectedSeat: Seat;//done  
  private elements: Seat[]; //done 

  xMouse: any;
  yMouse: any;




  //------gEttERS & SetTerS----------
  getWidth() { return this.width; }
  getLength() { return this.length; }
  getSelectedSeat() { return this.selectedSeat }
  getCanvas() { return this.canvas; }
  getCtx() { return this.ctx }
  getContainer() { return this.container }
  getRadius() { return this._RADIUS }
  getElements() { return this.elements }

  setWidth(w) { this.width = w; }
  setLength(l) { this.length = l; }
  setSelectedSeat(s) { this.selectedSeat = s }
  setCanvas(ca) { this.canvas = ca; }
  setCtx(ct) { this.ctx = ct }
  setContainer(con) { this.container = con }
  setRadius(rad) { this._RADIUS = rad }
  setElements(ele) { this.elements = ele }



  //--------------------M  E  T  H  O  D  S-----
  /**
   * Responsive Canvas:
   * Allows the canvas to resize according to the size of the string
   * 
   */
  respondCanvas() {
    this.canvas.width = this.container.getBoundingClientRect().width;
    this.canvas.height = this.container.getBoundingClientRect().height;

    return this.canvasfill();

  }

  canvasfill() {
    this.canvas.width = this.width;
    this.canvas.height = this.length;
     this.elements.forEach(s => {
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

         default:
           color = "#FFFFFF"
           break;
       }

       //Check why is drawing items weird

       this.draw(s.xPos, s.yPos, color);
       const rect = this.canvas.getBoundingClientRect();

       this.canvas.addEventListener("click", (event) => {
         const x = event.clientX - rect.left;
         const y = event.clientY - rect.top;

         //console.log("x: " +  x + " y: " + y );
         //Click Item
         if (this.clickItem(x, s.xPos, y, s.yPos)) {
           this.selectedSeat = s;
         }
       });



     });

    // const seat = {
    //   xPos: 100,
    //   yPos: 100,
    //   color: "red"
    // }


    // this.draw(seat.xPos, seat.yPos, seat.color);
    // this.canvas.addEventListener("mousedown", event => {
    //   this.mouseDown(seat, event);
    //   this.mouseMove(true);

    // });
    // this.canvas.addEventListener("mouseup", event => {
    //   this.mouseUp();
    //   this.mouseMove(false);

    // });

  }

  mouseDown(element, event) {
    if (this.clickItem(event.clientX, element.xPos, event.clientY,
      element.yPos)) {
      this.canvas.style.backgroundColor = "#4b6a94";


    }

  }


  mouseUp() {
    this.canvas.style.backgroundColor = "#1f2d41";

  }

  mouseMove(move: boolean) {

    let x;
    let y;
    this.canvas.addEventListener("mousemove", event => {
      if (move) {
        this.ctx.clearRect(0, 0, this.width, this.length);
        x = event.clientX;
        y = event.clientY;
        this.draw(x, y, "white");
      }
      else{
        this.draw(x,y,"black");
      }

    })


  }
  draw(xPos, yPos, color) {


    this.ctx.beginPath();
    //DEBUG:  console.log ("x = " + xPos + " y = " +yPos);
    this.ctx.arc(xPos, yPos, this._RADIUS, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();

  }

  drawXandYLines() {
    this.ctx.beginPath
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

    let area = (Math.PI) * (Math.pow(this._RADIUS, 2));

    if (distance < this._RADIUS && distance < area) {
      //DEBUG: console.log(distance);
      return true;
    }
    return false;
  }




  updateItem(item) {
    let array = this.getElements()
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == item.id) {
        array[i] = item;
        this.setElements(array);
        this.canvasfill();
      }
    }
  }
}
