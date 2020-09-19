import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentDto} from './StudentDto';
import {Course} from './create-student/create-student.component';
import {AppConsts} from '../../AppConsts';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = AppConsts.remoteServiceBaseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getStudents(): Observable<any> {
    const _url = this.baseUrl + '/info/getAll';
    return this.httpClient.get(_url);
  }

  createStudent(student: StudentDto, course: any) {
    const _url = this.baseUrl + '/student/create';
    return this.httpClient.post(_url, {studentDetail: student, course});
  }

  getById(studentId: string): Observable<any> {
    const _url = this.baseUrl + '/info/getById';

    return this.httpClient.post(_url + '?id=' + studentId, null);
  }

  updateStudent(studentDetail: StudentDto, course: Course[], masterId: any): Observable<any> {
    const _url = this.baseUrl + '/info/update';

    return this.httpClient.put(_url + '?id=' + masterId, {studentDetail, course});
  }

  deleteStudent(masterId: any): Observable<any> {
    const _url = this.baseUrl + '/info/delete';

    return this.httpClient.delete(_url + '?id=' + masterId);
  }
  getCourses(): Observable<any> {
    const _url = this.baseUrl + '/course/getAll';

    return this.httpClient.get(_url);
  }
  getUSers(): Observable<any> {
    const _url = this.baseUrl + '/users/getAll';
    return this.httpClient.get(_url);
  }
}
