import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {User} from './User';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user).subscribe((res) => {
      this.router.navigate(['/app/home']);
    }, error => { this.notifierService.notify('error', `${error.error}`); console.log(error);});
  }
}
