import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  API: string = 'http://localhost:8080/order/';

  constructor(private http: HttpClient) { }
  
  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API);
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.API + 'save', order);
  }

  public getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.API + id);
  }

  public getOrderByCustId(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.API + 'customer/' + id);
  }
  public updateTimeLeft(orderId: number, timeLeft: number): Observable<any> {
    const url = `${this.API}/${orderId}/update-time-left`;
    return this.http.put(url, { timeLeft });
  }

  public markAsDelivered(orderId: number): Observable<any> {
    const url = `${this.API}/${orderId}/mark-as-delivered`;
    return this.http.put(url, {});
  }

  public markAsPickedUp(orderId: number): Observable<any> {
    const url = `${this.API}/${orderId}/mark-as-picked-up`;
    return this.http.put(url, {});
  }
}
