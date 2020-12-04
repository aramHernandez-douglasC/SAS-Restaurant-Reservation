import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {MustMatch} from '../login/login.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
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
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
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
