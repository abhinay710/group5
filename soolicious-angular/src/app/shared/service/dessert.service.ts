import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dessert } from '../models/dessert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  API: string = 'http://localhost:8080/dessert/';

  constructor(private http: HttpClient) { }

  
  public getDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.API);
  }

  public saveDessert(dessert: Dessert): Observable<Dessert> {
    return this.http.post<Dessert>(this.API + 'save', dessert);
  }

  public getDessertById(id: number): Observable<Dessert> {
    return this.http.get<Dessert>(this.API + id);
  }
}
