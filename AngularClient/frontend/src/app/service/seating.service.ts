import { Seat } from './../model/Seat';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class SeatingService {
  GET_ALL_SEATS = "http://localhost:8080/seats";
  DELETE_SEAT_BY_ID = "http://localhost:8080/delete-seat";
  ADD_SEAT = "http://localhost:8080/newSeat";
  UPDATE_SEAT = "http://localhost:8080/update-seat-status";

  constructor(private http: HttpClient) { }

  requestAllSeats() : Observable<any>{
    return this.http.get(this.GET_ALL_SEATS);

  }
  updateSeatbyId(body): Observable<any>{
    let params : HttpParams = new HttpParams();
    params = params.set("seatId", body.id)
    .set("status", body.newStatus);

    console.log(body);

    return this.http.put(this.UPDATE_SEAT, body);
  }
}

