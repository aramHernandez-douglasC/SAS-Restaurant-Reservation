import { User } from '../model/User';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  REGISTER_URL = "http://localhost:8080/register"

  constructor(private http: HttpClient) { }

  authenticate(body): any{
    return this.http.post('', {user: body});
  }

  register(user:User): Observable<User>{
    console.log(user);
    return this.http.post<User>(this.REGISTER_URL,user,httpOptions);
  }
}
