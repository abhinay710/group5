import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/shared/models/inventory';
import { InventoryService } from 'src/app/shared/service/inventory.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css']
})
export class IngredientDialogComponent implements OnInit {

  @Input() ingredient: Ingredient = {};
  @Input() modalTitle: string = 'Add Ingrdient';
  @Input() submitButtonLabel: string = 'Save';

  constructor(public activeModal: NgbActiveModal, public invService: InventoryService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.invService.addIngredient(this.ingredient).subscribe({
      next: ((resp: Ingredient) => {
        this.activeModal.close(resp);
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  onCloseClick() {
    this.activeModal.dismiss('Close click');
  }
}
