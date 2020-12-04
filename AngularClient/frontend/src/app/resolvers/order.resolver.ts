import { OrderService } from './../service/order.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OrderResolver implements Resolve<Observable<any>>{
    constructor(private api: OrderService){}
    resolve(): Observable<any>{
        return this.api.getAllOrders();
    }
}
