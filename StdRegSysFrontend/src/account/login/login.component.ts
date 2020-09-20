import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {User} from './User';
import {NotifierService} from 'angular-notifier';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  isSignUp = false;
  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifierService: NotifierService
  ) {
  }

  ngOnInit() {
  }

  login() {
    if (!this.isSignUp) {
      this.loginService.login(this.user).subscribe((res) => {
        this.router.navigate(['/app/home']);
      }, error => {
        this.notifierService.notify('error', `${error.error}`);
        console.log(error);
      });
    } else {
      this.loginService.signUp(this.user).pipe(take(1)).subscribe((res) => {
        this.isSignUp = false;
        this.notifierService.notify('success', 'User Created Successfully');
      }, error => {
        if (error.error.code === 11000) {
          this.notifierService.notify('error', 'User with email already exists');
        } else {
          console.log(error);
          this.notifierService.notify('error', `${error.error.message}`);
        }
      });
    }
  }
}
