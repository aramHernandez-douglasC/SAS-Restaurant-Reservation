import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation} from '../model/Reservation';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  BASE_URL = 'http://localhost:8080/reservations';
  ADD_URL = 'http://localhost:8080/reservation/new';
  DELETE_URL = 'http://localhost:8080/delete/reservation';
  getAllItems(): Observable<Reservation[]> {
    console.log(this.http.get(this.BASE_URL));
    return this.http.get<Reservation[]>(this.BASE_URL, httpOptions);
  }
  saveReservation(body): Observable<any> {
    return this.http.post<Reservation>(this.ADD_URL, body, httpOptions);
  }
  deleteItem(id, body): Observable<any> {
    return this.http.post<Reservation[]>(this.DELETE_URL + '/delete/' + id, body, httpOptions);
  }
}
