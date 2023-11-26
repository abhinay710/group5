import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent {
  @Input() orderItems?: OrderItem[] = [];
  @Input() modalTitle: string = 'Order Items';
  @Input() totalPrice: number = 0;

  constructor(public activeModal: NgbActiveModal) {}

  onCloseClick() {
    this.activeModal.dismiss('Close click');
  }

  calculateTotalPrice(): number {
    return this.orderItems?.reduce((total, item) => total + item.price! * item.quantityOrdered!, 0) || 0;
  }
}
