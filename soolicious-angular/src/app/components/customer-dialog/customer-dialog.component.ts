import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent {
  @Input() customer: Customer = {};
  @Input() modalTitle: string = 'Customer Form';
  @Input() submitButtonLabel: string = 'Save';

  constructor(public activeModal: NgbActiveModal, public loginService: LoginService) { }

  onSubmit(): void {
    this.activeModal.close(this.customer);
  }
}
