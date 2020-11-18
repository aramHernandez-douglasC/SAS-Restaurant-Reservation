import {Component, OnInit, Inject} from '@angular/core';
import {SessionStorage, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  userRole = '';
  private data: any = [];
  constructor(private storage: SessionStorageService) {
  }
  ngOnInit(): void {
    this.saveInLocal('token', 'customer');
    this.userRole = this.getFromLocal('token');
  }
  saveInLocal(key, val): void {
    console.log( 'role:' + val);
    this.storage.store(key, val);
  }

  getFromLocal(key): any {
    this.data[key] = this.storage.retrieve(key);
    console.log(this.data);
    return this.data[key];
  }

}

