import { Component } from '@angular/core';
import { LoginService } from './shared/service/login.service';
import { CustomerService } from './shared/service/customer.service';
import { Customer } from './shared/models/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soolicious-angular';

  constructor(public loginService: LoginService, private customerService: CustomerService,
              private modalService: NgbModal,private router: Router, private activatedRoute: ActivatedRoute){}

  openMyProfile() {
    this.customerService.getCustById(Number(localStorage.getItem('userId'))).subscribe({
      next: ((resp: Customer) => {
          this.openMyProfileDialog(resp);
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  openMyProfileDialog(customer: Customer) {
    const modalRef = this.modalService.open(CustomerDialogComponent);
    modalRef.componentInstance.customer = { ...customer };
    modalRef.componentInstance.modalTitle = 'My Profile';
    modalRef.componentInstance.submitButtonLabel = 'Update';

    modalRef.result.then((result: Customer) => {
      if (result) {
        this.customerService.saveCust(result).subscribe({
          next: ((resp: Customer) => {
            console.log(resp);
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  myOrders() {
    this.router.navigate([`/orders`], { relativeTo: this.activatedRoute });
  }
}
