import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee';
import { EmpService } from 'src/app/shared/service/emp.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  page = 1;
	pageSize = 10;
  collectionSize = 0;
  employees: Employee[] = [];
  filteredEmps?: Employee[];
  constructor(private empService: EmpService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.empService.getEmployees().subscribe({
      next: ((resp: Employee[]) => {
        this.employees = resp;
        this.collectionSize = resp.length; 
        this.filterEmps();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  filterEmps() {
    this.filteredEmps = this.employees.map((emp, i) => ({ id: i + 1, ...emp })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }
}
