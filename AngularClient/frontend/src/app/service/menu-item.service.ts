import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MenuItem} from '../model/MenuItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  constructor(private http: HttpClient) {
  }

  BASE_URL = 'http://localhost:8080/items';
  ADD_URL = 'http://localhost:8080/new/item';
  DELETE_URL = 'http://localhost:8080/delete/item';

  getAllItems(): Observable<MenuItem[]> {
    console.log('Came here!');
    console.log(this.http.get(this.BASE_URL));
    return this.http.get<MenuItem[]>(this.BASE_URL, httpOptions);
  }

  saveItem(body): Observable<any> {
    return this.http.post<MenuItem>(this.BASE_URL + '/new', body, httpOptions);
  }

  deleteItem(id, body): Observable<any> {
    return this.http.post<MenuItem[]>(this.DELETE_URL + '/delete/' + id, body, httpOptions);
  }
}
