import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppConsts} from '../../AppConsts';

export class UserDto {
  constructor(
    public  _id: any,
    public name: any,
    public email: any,
    public token: any
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  newHttpClient: HttpClient;
  baseUrl = AppConsts.remoteServiceBaseUrl;
  constructor(
    private httpBackend: HttpBackend,
  ) {
    this.newHttpClient = new HttpClient(this.httpBackend);
  }

  login(user: any): Observable<any> {
    const url = this.baseUrl + '/users/login';
    return this.newHttpClient.post(url, {email: user.email, password: user.password})
      .pipe(
        tap(res => {
          user = new UserDto(res.user._id, res.user.name, res.user.email, res.token);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  signUp(user: any): Observable<any> {
    const url = this.baseUrl + '/users/create';
    return this.newHttpClient.post(url, {name: user.name, email: user.email, password: user.password});
  }
}
