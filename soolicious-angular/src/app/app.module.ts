import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { OrderDetailsDialogComponent } from './components/order-details-dialog/order-details-dialog.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { DessertDialogComponent } from './components/dessert-dialog/dessert-dialog.component';
import { InventoryItemsComponent } from './components/inventory-items/inventory-items.component';
import { InventoryDialogComponent } from './components/inventory-dialog/inventory-dialog.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutModalComponent } from './checkout-modal/checkout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    CustomersComponent,
    OrdersComponent,
    LoginComponent,
    HomeComponent,
    EmployeeDialogComponent,
    CustomerDialogComponent,
    OrderDetailsDialogComponent,
    DessertsComponent,
    DessertDialogComponent,
    InventoryItemsComponent,
    InventoryDialogComponent,
    CartComponent,
    CheckoutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
