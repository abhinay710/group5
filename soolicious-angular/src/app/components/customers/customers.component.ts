import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  page = 1;
	pageSize = 10;
  collectionSize = 0;
  customers: Customer[] = [];
  filteredCustomers?: Customer[] = [];
  constructor(private customerService: CustomerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomerss().subscribe({
      next: ((resp: Customer[]) => {
        this.customers = resp;
        this.collectionSize = resp.length; 
        this.filterCustomers();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  filterCustomers() {
    this.filteredCustomers = this.customers.map((cust, i) => ({ id: i + 1, ...cust })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }


  editCustomer(customer: Customer) {
    const modalRef = this.modalService.open(CustomerDialogComponent);
    modalRef.componentInstance.customer = { ...customer };
    modalRef.componentInstance.modalTitle = 'Edit Customer';
    modalRef.componentInstance.submitButtonLabel = 'Update';

    modalRef.result.then((result: Customer) => {
      // Handle the result after the modal is closed
      if (result) {
        this.customerService.saveCust(result).subscribe({
          next: ((resp: Customer) => {
            const index = this.customers.findIndex((e) => e.id === result.id);
            if (index !== -1) {
              this.filteredCustomers![index] = resp;
            }
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }
}
