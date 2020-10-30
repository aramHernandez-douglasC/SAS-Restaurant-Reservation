import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  registered: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isAdmin: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService
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
  }
  onSubmit(): void  {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const body = {
      email: this.loginForm.value.email,
      password : this.loginForm.value.password,
      role: (this.isAdmin) ? 'admin' : 'employee'
    };
    this.service.authenticate(body).subscribe( data => {
      if (data.success) {
        console.log('User is logged in!');
      } else {
        console.log('Incorrect password');
      }
    });
    // console.log(body);
    }
  onRegister(): void {
    this.registered = true;
    if (this.registerForm.invalid) {
      return;
    }
    const body = {
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password : this.registerForm.value.password,
      role: (this.isAdmin) ? 'admin' : 'employee'
    };
    this.service.register(body).subscribe(data => {
      if (data.success){
        console.log('user has been registered');
      }else {
        console.log('User could not be registered');
      }
    });
    // console.log(body);
  }
}
