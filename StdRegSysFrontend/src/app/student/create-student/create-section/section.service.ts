import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private httpClient: HttpClient) { }

  createSection(name: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/section/create', {name});
  }

  getSections(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/section/getAll');
  }
}
