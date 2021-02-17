import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    waitingForData = false;
    submitted = false;
    serverErrors: String[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private main: AppComponent
  ) {
    this.loginForm = this.formBuilder.group({
        Login: ['', [Validators.required, Validators.minLength(3)]],
        Password: ['', [Validators.required, Validators.minLength(3)]]
    });
    if (main.IsLoggin) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Login: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.serverErrors = [];

    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.controls.Login.value

    this.waitingForData = true;
    var Login = this.loginForm.controls.Login.value;
    var Password = this.loginForm.controls.Password.value;
    this.main.userService.CheckUser(new User(0,Login,Password)).subscribe(
    data =>{
      if(data == true)
      {
        let iuser= this.main.userService.GetUser(Login);
        console.log("iuser:"+iuser);
        this.main.userService.GetUser(Login).subscribe(
          user => {
                
                this.main.IsLoggin = true;
                var newUser = new User(user["id"], user["login"], user["password"]);
                this.main.currentUser = newUser;
                this.main.details();
                this.router.navigate(['/']);
          });
      }
      else{
        this.waitingForData = false;
      }
    });
  }
}
