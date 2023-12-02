import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order, OrderItem } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent {
  @Input() order: Order = {}; 
  @Input() orderItems?: OrderItem[] = [];
  @Input() modalTitle: string = 'Order Items';
  newTime: string = '';

  constructor(public activeModal: NgbActiveModal, private orderService: OrderService) {}

  onCloseClick() {
    this.activeModal.dismiss('Close click');
  }

  calculateTotalPrice(): number {
    return this.orderItems?.reduce((total, item) => total + item.price! * item.quantityOrdered!, 0) || 0;
  }

  updatePickupOrDeliverTime() {
    if (this.newTime) {
      // Update the timeToPickupOrDeliver property in the order
      this.order.timeToPickupOrDeliver = this.newTime;
      // Call the service to save the updated order
      this.orderService.saveOrder(this.order).subscribe(
        (updatedOrder: any) => {
          console.log('Time left for pickup or delivery updated successfully:', updatedOrder);
        },
        (error: any) => {
          console.error('Error updating time left for pickup or delivery:', error);
        }
      );
    } else {
      console.error('New time is required.');
    }
  }

  updateDeliveryStatus() {
    // Mark the order as delivered
    this.order.timeToPickupOrDeliver = 'delivered';
    // Call the service to save the updated order
    this.orderService.saveOrder(this.order).subscribe(
      (updatedOrder: any) => {
        console.log('Delivery status updated successfully:', updatedOrder);
      },
      (error: any) => {
        console.error('Error updating delivery status:', error);
      }
    );
  }
}
