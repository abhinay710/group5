import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Order, OrderItem } from '../shared/models/order';
import { OrderService } from '../shared/service/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent {
  @Input() orderItems?: OrderItem[];
  @Input() orderTotal?: number;
  checkoutForm: FormGroup;
  paymentOption: string = 'cash';
  order: Order = {
    pickupMethod: 'delivery',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    expiryMonth: '',  // Add this line
    expiryYear: ''
  };

  // NgbDateStruct to store selected date
  expiryDate: NgbDateStruct | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    private fb: FormBuilder,
    private calendar: NgbCalendar
  ) {
    this.checkoutForm = this.fb.group({
      expiryMonth: [null, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expiryYear: [null, [Validators.required, Validators.pattern(/^[0-9]{2}$/)]]
    });
  }

  // Method to set the initial year and month for the datepicker
  get currentYear() {
    return this.calendar.getToday().year;
  }

  get currentMonth() {
    return this.calendar.getToday().month;
  }

  // Method to set the year and month when navigating in the datepicker
  setYearMonth(date: NgbDateStruct) {
    this.expiryDate = date;
  }

  dismiss() {
    this.activeModal.dismiss('Close button clicked');
  }

  isValid(): boolean {
    const cardNumber = this.order.cardNumber as string;
    const cvv = this.order.cvv as string;
  
    if (this.paymentOption === 'card') {
      // Check card number validity (16 digits)
      const isCardNumberValid = /^[0-9]{16}$/.test(cardNumber);
      const isCvvValid = /^[0-9]{3,4}$/.test(cvv);
      const expiryDateControl = this.checkoutForm.get('expiryDate');
      const isExpiryDateValid = expiryDateControl ? expiryDateControl.valid : false;
  
      return isCardNumberValid && isCvvValid && isExpiryDateValid;
    }
    return true;
  }
  
  
 
  submit() {
    this.order.id = undefined;
    this.order.customer = { id: Number(localStorage.getItem('userId')!) };
    this.order.orderDate = new Date();
    this.order.lastUpdated = new Date().getHours() + ':' + new Date().getMinutes();
    this.order.orderItems = this.orderItems;
    this.order.orderTotal = this.orderTotal;

    // Concatenate expiry month and year with '/'
    this.order.expiryDate = `${this.checkoutForm.get('expiryMonth')?.value}/${this.checkoutForm.get('expiryYear')?.value}`;

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
