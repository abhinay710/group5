import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dessert, DessertPrep } from 'src/app/shared/models/dessert';
import { DessertService } from 'src/app/shared/service/dessert.service';
import { DessertDialogComponent } from '../dessert-dialog/dessert-dialog.component';
import { DessertPrepDialogComponent } from '../dessert-prep-dialog/dessert-prep-dialog.component';
import { InventoryService } from 'src/app/shared/service/inventory.service';
import { Ingredient } from 'src/app/shared/models/inventory';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent implements OnInit {
  page = 1;
	pageSize = 10;
  collectionSize = 0;
  desserts: Dessert[] = [];
  filteredDesserts?: Dessert[] = [];
  ingredients: Ingredient[] = [];
  constructor(private dessertService: DessertService, private modalService: NgbModal,
    private invService: InventoryService) { }

  ngOnInit(): void {
    this.getDesserts();
    this.getIngredients();
  }

  getDesserts() {
    this.dessertService.getDesserts().subscribe({
      next: ((resp: Dessert[]) => {
        this.desserts = resp;
        this.collectionSize = resp.length; 
        this.filterDesserts();
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

  filterDesserts() {
    this.filteredDesserts = this.desserts.map((dessert, i) => ({ id: i + 1, ...dessert })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  editDessert(dessert: Dessert) {
    const modalRef = this.modalService.open(DessertDialogComponent);
    modalRef.componentInstance.dessert = { ...dessert };
    modalRef.componentInstance.ingredients = [ ...this.ingredients ];
    modalRef.componentInstance.modalTitle = 'Edit Dessert';
    modalRef.componentInstance.submitButtonLabel = 'Update';

    modalRef.result.then((result: Dessert) => {
      // Handle the result after the modal is closed
      if (result) {
        this.dessertService.saveDessert(result).subscribe({
          next: ((resp: Dessert) => {
            const index = this.desserts.findIndex((e) => e.id === result.id);
            if (index !== -1) {
              this.filteredDesserts![index] = resp;
            }
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  addDessert( ) {
    const modalRef = this.modalService.open(DessertDialogComponent);
    modalRef.componentInstance.ingredients = [ ...this.ingredients ];
    modalRef.componentInstance.modalTitle = 'Add Dessert';
    modalRef.componentInstance.submitButtonLabel = 'Add';

    modalRef.result.then((result: Dessert) => {
      if (result) {
        this.dessertService.saveDessert(result).subscribe({
          next: ((resp: Dessert) => {
            this.desserts.push(resp);
            this.filterDesserts();
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  viewIngredients(name?: string, dessertPreps?: DessertPrep[]) {
    const modalRef = this.modalService.open(DessertPrepDialogComponent);
    modalRef.componentInstance.dessertPreps = dessertPreps;
    modalRef.componentInstance.modalTitle = name + ' Preparation';      
  }
}