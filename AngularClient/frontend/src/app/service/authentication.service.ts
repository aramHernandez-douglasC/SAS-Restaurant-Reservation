import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  LOGIN_URL = 'http://localhost:8080/login';
  REGISTER_URL = 'http://localhost:8080/register';
  RESET_URL = 'http://localhost:8080/reset';

  constructor(private http: HttpClient) {
  }

  authenticate(body): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', body.email)
      .set('password', body.password);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params
    };
    return this.http.post(this.LOGIN_URL, body, options);
  }

  register(user: User): Observable<User> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<User>(this.REGISTER_URL, user, options);
  }

  reset(body): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', body.email)
      .set('password', body.password);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params
    };

    return this.http.post(this.RESET_URL, body, options);
  }
}
