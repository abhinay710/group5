import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DessertPrep } from 'src/app/shared/models/dessert';

@Component({
  selector: 'app-dessert-prep-dialog',
  templateUrl: './dessert-prep-dialog.component.html',
  styleUrls: ['./dessert-prep-dialog.component.css']
})
export class DessertPrepDialogComponent {
  @Input() dessertPreps?: DessertPrep[] = [];
  @Input() modalTitle: string = 'Dessert';

  constructor(public activeModal: NgbActiveModal) {}

  onCloseClick() {
    this.activeModal.dismiss('Close click');
  }
}
