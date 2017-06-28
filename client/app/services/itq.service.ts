import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ItqService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getItqs(): Observable<any> {
    return this.http.get('/api/itqs').map(res => res.json());
  }

  countItqs(): Observable<any> {
    return this.http.get('/api/itqs/count').map(res => res.json());
  }

  addItq(itq): Observable<any> {
    return this.http.post('/api/itq', JSON.stringify(itq), this.options);
  }

  // getItq(itq): Observable<any> {
  //   return this.http.get(`/api/itq/${itq._id}`).map(res => res.json());
  // }
  getItq(id): Observable<any> {
    return this.http.get(`/api/itq/${id}`).map(res => res.json());
  }
  editItq(itq): Observable<any> {
    return this.http.put(`/api/itq/${itq._id}`, JSON.stringify(itq), this.options);
  }
  deleteItq(itq): Observable<any> {
    return this.http.delete(`/api/itq/${itq._id}`, this.options);
  }

}
