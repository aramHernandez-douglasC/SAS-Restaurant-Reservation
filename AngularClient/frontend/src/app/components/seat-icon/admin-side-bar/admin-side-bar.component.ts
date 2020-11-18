import { CanvasComponent } from '../canvas/canvas.component';
import { Inject, Component, OnInit, Injectable, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatingService } from '../../../service/seating.service';
import { Seat } from '../../../model/Seat';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})

@Injectable()
export class AdminSideBarComponent implements OnInit {

  adminFormGroup: FormGroup;
  canvas: CanvasComponent;
  xValue:number
  yValue:number;
  xSpan:HTMLSpanElement;
  ySpan:HTMLSpanElement;
  width: number = 800;
  length: number = 500;

  //BIND PROPERTIES
  @Input() selectedSeat;
  @Input() seats;




  constructor(
    
    private service: SeatingService,
    private fb: FormBuilder,
    
    ) {
    this.adminFormGroup = this.fb.group({
      adminSeatId: [{ value: '', disabled: true }, Validators.required],
      adminSeatCapacity: ['', Validators.required],
      adminSeatStatus: null,
      //adminXRange:['',Validators.required],
      //adminYRange:['',Validators.required],

      adminXRange: [0, [Validators.min(0), Validators.max(this.width)]],
      adminYRange: [0, [Validators.min(0), Validators.max(this.length)]]

    });
    
  }

  ngOnInit(): void {
    
  }

   /***
   * This is the submit method for the ADMIN
   */

  
  
  submitAdminSeatUpdate() {
    if (this.adminFormGroup.invalid) {
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
      this.canvas.updateItem(this.seats, data);
      console.log(this.seats);
      this.canvas.canvasfill();
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

  
  

}
