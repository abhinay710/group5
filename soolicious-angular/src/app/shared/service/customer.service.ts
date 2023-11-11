import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API: string = 'http://localhost:8080/customer/';

  constructor(private http: HttpClient) { }

  
  public getCustomerss(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API);
  }

  public saveCust(emp: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API + 'save', emp);
  }

  public getCustById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.API + id);
  }
}
