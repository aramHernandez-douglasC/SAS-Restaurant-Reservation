import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    this.registerForm = this.formBuilder.group({
      username: '',
      firstname: '',
      lastname: '',
      email: ['', Validators.required],
      password : ['', Validators.required],
    });
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
}
