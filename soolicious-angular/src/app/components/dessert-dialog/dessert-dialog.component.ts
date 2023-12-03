import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dessert } from 'src/app/shared/models/dessert';
import { Ingredient } from 'src/app/shared/models/inventory';

@Component({
  selector: 'app-dessert-dialog',
  templateUrl: './dessert-dialog.component.html',
  styleUrls: ['./dessert-dialog.component.css']
})
export class DessertDialogComponent {
  @Input() ingredients: Ingredient[] = [];
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

  addDessertPrep() {
    if (!this.dessert.dessertPreps) {
      this.dessert.dessertPreps = [];
    }

    this.dessert.dessertPreps.push({ ingredient: this.ingredients[0], ingredientQuantity: 1 });
  }

  removeDessertPrep(index: number) {
    this.dessert.dessertPreps?.splice(index, 1);
  }
  compareFn = this._compareFn.bind(this);
  
  _compareFn(a:Ingredient, b:Ingredient): boolean {
    return a && b && a.id === b.id;
 }
}
