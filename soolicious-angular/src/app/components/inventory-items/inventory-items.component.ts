import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient, Inventory } from 'src/app/shared/models/inventory';
import { InventoryService } from 'src/app/shared/service/inventory.service';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css']
})
export class InventoryItemsComponent implements OnInit {
  page = 1;
	pageSize = 10;
  collectionSize = 0;
  inventories: Inventory[] = [];
  ingredients: Ingredient[] = [];
  filteredInventories?: Inventory[] = [];
  constructor(private invService: InventoryService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.getInventories();
    this.getIngredients();
  }

  getInventories() {
    this.invService.getInventories().subscribe({
      next: ((resp: Inventory[]) => {
        this.inventories = resp;
        this.collectionSize = resp.length; 
        this.filterInvs();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  getIngredients() {
    this.invService.getIngredients().subscribe({
      next: ((resp: Ingredient[]) => {
        this.ingredients = resp;
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  filterInvs() {
    this.filteredInventories = this.inventories.map((inv, i) => ({ id: i + 1, ...inv })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  editInventoryItem(inventory: Inventory) {
    const modalRef = this.modalService.open(InventoryDialogComponent);
    modalRef.componentInstance.inventory = { ...inventory };
    modalRef.componentInstance.ingredients = [ ...this.ingredients ];
    modalRef.componentInstance.modalTitle = 'Edit Inventory';
    modalRef.componentInstance.submitButtonLabel = 'Update';

    modalRef.result.then((result: Inventory) => {
      if (result) {
        this.invService.saveInventory(result).subscribe({
          next: ((resp: Inventory) => {
            const index = this.inventories.findIndex((e) => e.id === result.id);
            if (index !== -1) {
              this.filteredInventories![index] = resp;
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
