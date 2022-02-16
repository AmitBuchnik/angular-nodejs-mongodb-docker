import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Customer } from './models/customer.model';
import { Transcation } from './models/transcation.model';

// export type CustomerTranscations = Customer & Transcation;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getTranscations() {
    return this.httpClient.get<Transcation[]>(`${environment.baseUrl}api/transcations`)
      .pipe(
        map(res => {
          return res.map(t => ({ ...t, customer: { ...t.customer, label: t.customer.first_name + " " + t.customer.last_name } }))
        }));
  }

  getCustomers() {
    return this.httpClient.get<Customer[]>(`${environment.baseUrl}api/customers`)
      .pipe(
        map(res => {
          return res.map(c => ({ ...c, label: c.first_name + " " + c.last_name }))
        }));
  }

  createTransaction(body: Transcation) {
    return this.httpClient.post<Transcation>(`${environment.baseUrl}api/transcations`, body).toPromise();
  }

  updateTransaction(id: string, body: Transcation) {
    return this.httpClient.put<Transcation>(`${environment.baseUrl}api/transcations/${id}`, body).toPromise();
  }

  deleteTransaction(id: string) {
    return this.httpClient.delete(`${environment.baseUrl}api/transcations/${id}`).toPromise();
  }
}
