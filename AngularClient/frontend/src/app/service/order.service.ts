import { Seat } from 'src/app/model/Seat';
import { Order } from './../model/Order';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private GET_ALL_ORDERS:string = "http://localhost:8080/order/get-all";
  private DELETE_ORDER_ITEM:string="http://localhost:8080/order/order-item/delete";
  private PLACE_ORDER:string="http://localhost:8080/order/placeOrder";
  private GET_ACTIVE_ORDER = "http://localhost:8080/order/get-active";
  private GET_ALL_ORDERS_BY_SEAT = "http://localhost:8080/order/getAllBySeat";
  private PAY_ORDER = "http://localhost:8080/order/pay";

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]>{
    return this.http.get<any[]>(this.GET_ALL_ORDERS);
  }

  deleteOrderItem(body, params: number){
    let p : HttpParams = new HttpParams().set("itemId", params.toString());
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      p
    };

    return this.http.post(this.DELETE_ORDER_ITEM, body, options);
    
  }

  getActiveOrder(p): Observable<Order>{
    let params : HttpParams = new HttpParams()
    .set("seatId", p.id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params
    }
    console.log(params);
    return this.http.get<Order>(this.GET_ACTIVE_ORDER,{params: params});

  }

  getAllOrdersBySeat(body : Seat) : Observable<Order[]>{

    return this.http.post<Order[]>(this.GET_ALL_ORDERS_BY_SEAT, body); 
  }

  placeOrder(body : Order){
    return this.http.post(this.PLACE_ORDER, httpOptions);
  }

  payOrder(body:Order){
    return this.http.post(this.PAY_ORDER,body);
  }
}
