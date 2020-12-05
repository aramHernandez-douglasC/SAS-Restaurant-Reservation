import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {SignUpInfo} from '../../auth/signup-info';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean;
  registered: boolean;
  reset: boolean;
  registerForm: FormGroup;
  isAdmin: boolean;
  user = new User();
  signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  role = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: '',
      name: '',
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onRegister(): void {
    this.registered = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.role = this.isAdmin ? ['admin'] : ['employee'];
    this.signUpInfo = new SignUpInfo(
      this.registerForm.value.name,
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.role
    );

    this.service.signUp(this.signUpInfo)
      .subscribe((response) => {
          console.log(response);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        });
    this.router.navigate(['/authenticate']);
  }
}
