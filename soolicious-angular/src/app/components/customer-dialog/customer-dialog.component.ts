import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent {
  @Input() customer: Customer = {};
  @Input() modalTitle: string = 'Customer Form';
  @Input() submitButtonLabel: string = 'Save';

  constructor(public activeModal: NgbActiveModal) { }

  onSubmit(): void {
    this.activeModal.close(this.customer);
  }

  formatDate(date: Date): string {
    return date ? new Date(date).toISOString().split('T')[0] : 'null';
  }
  updateCreatedOn(value: string) {
    this.customer.createdOn = new Date(value);
  }
}
