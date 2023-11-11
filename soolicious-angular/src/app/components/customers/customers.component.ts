import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/shared/service/customer.service';

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
  filteredCustomers?: Customer[];
  constructor(private customerService: CustomerService) { }

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
}
