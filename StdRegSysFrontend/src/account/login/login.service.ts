import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  constructor(
    private httpBackend: HttpBackend,
  ) {}
  login(user: any): Observable<any> {
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.post('http://localhost:3000/users/login', {email: user.email, password: user.password})
      .pipe(
        tap(res => {
          user = new UserDto(res.user._id, res.user.name, res.user.email, res.token);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
}
