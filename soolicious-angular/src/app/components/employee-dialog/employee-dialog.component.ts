import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {
  @Input() employee: Employee = {};
  @Input() modalTitle: string = 'Employee Form';
  @Input() submitButtonLabel: string = 'Save';

  constructor(public activeModal: NgbActiveModal) { }

  onSubmit(): void {
    this.activeModal.close(this.employee);
  }

}
