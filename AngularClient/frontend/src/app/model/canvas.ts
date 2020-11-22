import { kill } from 'process';
import { element } from 'protractor';
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
  
  seat = {
    x : 0,
    y: 0,
    width: 0

  }

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
      }
      this.draw(s.xPos, s.yPos, color);
      const rect = this.canvas.getBoundingClientRect();

      this.canvas.addEventListener("click", (event) => {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        //Click Item
        if (this.clickItem(x, s.xPos, y, s.yPos)) {
          this.selectedSeat = s;
        }

      });
      //this.dragAndDrop(s);


    });
  }

  // dragAndDrop(element) {
  //   const rect = this.canvas.getBoundingClientRect();
  //   var mousedown: boolean;

  //   this.canvas.addEventListener("mousedown", (event) => {
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;     
  //     if (this.clickItem(x, element.xPos, y, element.yPos)) {
  //       this.ctx.clearRect(0, 0, this.width, this.length);
  //       this.canvasfill()
  //       mousedown = true;
  //       console.log(mousedown);
        
  //     }
  //   })

  //   this.canvas.addEventListener("mouseup", (event) => {
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     if (this.clickItem(x, element.xPos, y, element.yPos)) {
  //       mousedown = false
  //       console.log(mousedown);
  //     }

  //   })
    


  // }

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

    let area = (Math.PI) * (Math.pow(this._RADIUS, 2));

    if (distance < this._RADIUS && distance < area) {
      console.log(distance);
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