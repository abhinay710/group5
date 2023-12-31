import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/service/order.service';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  customerLogin = false;
  constructor(private orderService: OrderService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (localStorage.getItem('designation') === 'Customer') {
      this.customerLogin = true;
      this.getOrdersByCustomerId(Number(localStorage.getItem('userId')));
    } else {
      this.customerLogin = false;
      this.getOrders();
    }
  }

  getOrdersByCustomerId(id: number) {
    this.orderService.getOrderByCustId(id).subscribe({
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

  viewOrderItems(order?: Order) {
    const modalRef = this.modalService.open(OrderDetailsDialogComponent);
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderItems = order?.orderItems;
    modalRef.componentInstance.modalTitle = 'Order Details';      
  }
}
