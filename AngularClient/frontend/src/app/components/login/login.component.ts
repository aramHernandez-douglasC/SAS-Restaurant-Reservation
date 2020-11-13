import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../model/User';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  registered: boolean;
  reset: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  resetForm: FormGroup;
  isAdmin: boolean;
  user = new User();
  passwordMatch = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      username: '',
      firstname: '',
      lastname: '',
      email: ['', Validators.required],
      password : ['', Validators.required],
    });
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.service.authenticate(body).subscribe(data => {
      console.log(data);
      this.user = data;
      this.router.navigate(['/seat'+"?"+this.user.type+"&"+this.user.userName, this.user.type, this.user.userName]);
    });

    // this.storage.clear('token');
    // this.storage.store('token', this.userRole);
    // this.data = this.storage.retrieve('token');
    // console.log(this.data);

  }

  onRegister(): void{
    this.registered = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.user.email = this.registerForm.value.email;
    this.user.firstName = this.registerForm.value.firstname;
    this.user.lastName = this.registerForm.value.lastname;
    this.user.userName = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.user.type = this.isAdmin ? 'Admin' : 'Employee';

    this.service.register(this.user)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigate(['/login']);
  }
    // console.log(body);

  onReset(): void{
    this.reset = true;

    if (this.resetForm.invalid) {
      this.passwordMatch = true;
      return;
    }
    const body = {
      email: this.resetForm.value.email,
      password: this.resetForm.value.password,
    };

    this.service.reset(body)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigate(['/login']);
  }
  passwordConfirming(): boolean {
    if (this.resetForm.value.password === this.resetForm.value.confirm_password) {
      console.log('Reached here');
      return true;
    }
      else{
        return false;
    }
  }
}
export function MustMatch(controlName: string, matchingControlName: string): any
{
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}



