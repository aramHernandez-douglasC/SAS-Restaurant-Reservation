import { User } from './../../model/User';
import { AuthenticationService } from './../../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  registered: boolean;
  success = false;
 
  registerForm: FormGroup;
  us = new User();
  

  isAdmin: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: '',
      firstname: '',
      lastname: '',
      email: ['', 
      Validators.required],
      password : ['', Validators.required],
    });
  }

     onRegister():void{
    this.registered = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.us.email = this.registerForm.value.email;
    this.us.first_name = this.registerForm.value.firstname;
    this.us.last_name = this.registerForm.value.lastname;
    this.us.username = this.registerForm.value.username;
    this.us.password = this.registerForm.value.password;
    this.us.type = this.isAdmin ? "Admin" : "Employee";
    
    this.service.register(this.us)
    .subscribe((response) => {
     console.log(response);
    });

    
    
  }
  // private reset(){
  //   this.us.id = null;
  //   this.us.name = null;
  //   this.us.email = null;
    
  // }

}
