import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConsts} from '../../../../AppConsts';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  baseUrl = AppConsts.remoteServiceBaseUrl;

  constructor(private httpClient: HttpClient) { }

  createSection(name: string): Observable<any> {
    const url = this.baseUrl + '/section/create';
    return this.httpClient.post(url, {name});
  }

  getSections(): Observable<any> {
    const url = this.baseUrl + '/section/getAll';
    return this.httpClient.get(url);
  }
}
