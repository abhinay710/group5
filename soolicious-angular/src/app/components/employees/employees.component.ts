import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/shared/models/employee';
import { EmpService } from 'src/app/shared/service/emp.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

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
  filteredEmps?: Employee[] = [];
  constructor(private empService: EmpService, private modalService: NgbModal) { }

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

  editEmployee(employee: Employee) {
    const modalRef = this.modalService.open(EmployeeDialogComponent);
    modalRef.componentInstance.employee = { ...employee };
    modalRef.componentInstance.modalTitle = 'Edit Employee';
    modalRef.componentInstance.submitButtonLabel = 'Update';

    modalRef.result.then((result: Employee) => {
      // Handle the result after the modal is closed
      if (result) {
        this.empService.saveEmp(result).subscribe({
          next: ((resp: Employee) => {
            const index = this.employees.findIndex((e) => e.id === result.id);
            if (index !== -1) {
              this.filteredEmps![index] = resp;
            }
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  addEmployee() {
    const modalRef = this.modalService.open(EmployeeDialogComponent);
    modalRef.componentInstance.modalTitle = 'Add Employee';
    modalRef.componentInstance.submitButtonLabel = 'Add';

    modalRef.result.then((result: Employee) => {
      if (result) {
        this.empService.saveEmp(result).subscribe({
          next: ((resp: Employee) => {
            this.employees.push(resp);
            this.filterEmps();
            this.getEmployees();
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }
}
