import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  API: string = 'http://localhost:8080/employee/';

  constructor(private http: HttpClient) { }

  
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API);
  }

  public saveEmp(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.API + 'save', emp);
  }

  public getEmpById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.API + id);
  }
}
