import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {AuthLoginInfo} from '../../auth/login-info';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  reset: boolean;
  loginForm: FormGroup;
  user = new User();
  private loginInfo: AuthLoginInfo;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginInfo = new AuthLoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password);
    this.service.attemptAuth(this.loginInfo).subscribe(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUserName(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log(data);
        console.log(this.tokenStorage.getToken());
        console.log(this.tokenStorage.getUserName());
        console.log(this.tokenStorage.getAuthorities());
        // this.user = data;
        this.router.navigate(['/seat', this.tokenStorage.getAuthorities()[0], this.tokenStorage.getUserName()]);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
      });
  }
}

export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}



