import { OrderService } from './../../../service/order.service';
import { Canvas } from './../../../model/canvas';
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../../model/Seat';
import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


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
 
  @Input() canvas:Canvas;




  constructor() {        
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.canvas.setElements(this.seats);
    this.canvas.setCanvas(document.querySelector('canvas') as HTMLCanvasElement);
    this.canvas.setContainer(this.canvas.getCanvas().parentElement as HTMLDivElement)
    this.canvas.setCtx(this.canvas.getCanvas().getContext("2d")); 
     
    
    this.canvas.setWidth(this.width); 
    this.canvas.setLength(this.length);  
    
    this.canvas.canvasfill();
    
    console.log(this.canvas.currentOrder);
    window.addEventListener('resize', this.canvas.respondCanvas);
  } 
  
 
  

 
  


}
