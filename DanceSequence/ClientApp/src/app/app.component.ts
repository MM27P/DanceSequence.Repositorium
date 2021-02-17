import { Component } from '@angular/core';
import {UserService} from './UserService'
import {MoveService} from './MoveService'
import {TagService} from './TagService'
import { Router } from '@angular/router';
import { User } from './model/user';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public currentUser : User | null;
  public IsLoggin : boolean;

  constructor(
    public userService: UserService,
    public moveService: MoveService,
    public tagService: TagService,
    private router: Router) {
  }

  logout() {
    console.log("log off");
    this.currentUser = null;
    this.IsLoggin = false;
    this.router.navigate(['/login']);
  }

  details()
  {
    console.log("current User:" + this.currentUser);
    console.log("login:" + this.currentUser.login);
    console.log("password:" + this.currentUser.password);
    console.log("IsLoggin :" + this.IsLoggin);
  }
}
  
