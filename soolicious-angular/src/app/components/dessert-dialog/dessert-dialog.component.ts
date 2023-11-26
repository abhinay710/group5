import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dessert } from 'src/app/shared/models/dessert';

@Component({
  selector: 'app-dessert-dialog',
  templateUrl: './dessert-dialog.component.html',
  styleUrls: ['./dessert-dialog.component.css']
})
export class DessertDialogComponent {

  @Input() dessert: Dessert = {};
  @Input() modalTitle: string = 'Dessert Form';
  @Input() submitButtonLabel: string = 'Save';

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {
    // Handle form submission here, e.g., save or update dessert
    this.activeModal.close(this.dessert);
  }

  onCloseClick() {
    // Handle close button click here, e.g., perform cleanup or additional actions
    this.activeModal.dismiss('Close click');
  }
}
