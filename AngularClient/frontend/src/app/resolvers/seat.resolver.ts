import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { SeatingService } from '../service/seating.service';

@Injectable({
    providedIn: 'root'
})

export class SeatResolver implements Resolve<Observable<any>>{

    constructor(private api: SeatingService){}
    resolve(): Observable<any>{
        return this.api.requestAllSeats();
    }
}
