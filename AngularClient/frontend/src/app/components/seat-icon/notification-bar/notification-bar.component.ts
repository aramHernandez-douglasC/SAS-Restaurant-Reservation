import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {

  @Input() message: string;
  constructor(private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  openSnackBar(message, action){
    let snackbar = this.snackBar.open(message, action);
    
  }

}
