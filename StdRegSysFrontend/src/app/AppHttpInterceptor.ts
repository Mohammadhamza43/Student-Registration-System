import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../account/login/login.service';
import {Router} from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  user: UserDto;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate(['/account/login']);
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.user.token
      }
    });
    return next.handle(req);
  }

}
