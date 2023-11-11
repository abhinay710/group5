import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  page = 1;
	pageSize = 10;
  collectionSize = 0;
  orders: Order[] = [];
  filteredOrders?: Order[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: ((resp: Order[]) => {
        this.orders = resp;
        this.collectionSize = resp.length; 
        this.filterOrders();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  filterOrders() {
    this.filteredOrders = this.orders.map((emp, i) => ({ id: i + 1, ...emp })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }
}
