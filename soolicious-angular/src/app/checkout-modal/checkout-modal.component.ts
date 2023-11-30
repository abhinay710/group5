import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order, OrderItem } from '../shared/models/order';
import { OrderService } from '../shared/service/order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent {
  @Input() orderItems?: OrderItem[];
  @Input() orderTotal?: number;
  paymentOption: string = 'cash';
  order: Order = { pickupMethod:'delivery'};

  constructor(public activeModal: NgbActiveModal, private orderService: OrderService) {}


  dismiss() {
    this.activeModal.dismiss('Close button clicked');
  }

  submit() {
    this.order.id = undefined;
    this.order.customer = { id: Number(localStorage.getItem('userId')!) };
    this.order.orderDate = new Date();
    this.order.lastUpdated = new Date().getHours()+':'+ new Date().getMinutes();
    this.order.orderItems = this.orderItems;
    this.order.orderTotal = this.orderTotal;

    this.orderService.saveOrder(this.order).subscribe({
      next: ((resp: Order) => {
        this.activeModal.close(resp);
      }),
      error: (err: HttpErrorResponse) => {
        this.activeModal.close(err);      
      }
    });
   
  }
}
