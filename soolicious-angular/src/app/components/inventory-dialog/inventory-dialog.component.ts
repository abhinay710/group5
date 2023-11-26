import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient, Inventory } from 'src/app/shared/models/inventory';

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.css']
})
export class InventoryDialogComponent implements OnInit{  
  @Input() inventory: Inventory = {};
  @Input() ingredients: Ingredient[] = [];
  @Input() modalTitle: string = 'Edit Inventory Item';
  @Input() submitButtonLabel: string = 'Save';
  selectedIngredientId?: number;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.selectedIngredientId = this.inventory.ingredient?.id;
  }

  onSubmit() {
    this.inventory.ingredient = this.ingredients.find(ingredient => ingredient.id === this.selectedIngredientId);

    this.activeModal.close(this.inventory);
  }

  onCloseClick() {
    this.activeModal.dismiss('Close click');
  }

  formatDate(date: Date): string {
    return date ? new Date(date).toISOString().split('T')[0] : 'null';
  }
  updateDatePurchased(value: string) {
    this.inventory.datePurchased = new Date(value);
  }
  updateExpiryDate(value: string) {
    this.inventory.expiryDate = new Date(value);
  }
}
