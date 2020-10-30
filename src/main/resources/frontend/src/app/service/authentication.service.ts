import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(body): any{
    return this.http.post('https://localhost:8080/login', {user: body});
  }

  register(body): any{
    return this.http.post('https://localhost:8080/register', {user: body});
  }
}
