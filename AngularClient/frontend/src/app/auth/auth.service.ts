import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {SignUpInfo} from './signup-info';
import {AuthResetInfo} from './reset-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private resetUrl = 'http://localhost:8080/api/auth/reset';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, httpOptions);
  }

  resetPassword(info: AuthResetInfo): Observable<any> {
    return this.http.post(this.resetUrl, info, httpOptions);
  }
}
