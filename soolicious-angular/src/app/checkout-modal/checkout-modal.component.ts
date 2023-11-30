import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent implements OnInit {

  
deliveryOption: string = 'delivery';
  paymentOption: string = 'cash';

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dismiss() {
    this.activeModal.dismiss('Close button clicked');
  }

  submit() {
    // Add logic to handle the checkout process
    const result = {
      deliveryOption: this.deliveryOption,
      paymentOption: this.paymentOption
      // Add other necessary data
    };
    this.activeModal.close(result);
  }
}
