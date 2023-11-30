import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './shared/service/login.service';
import { DessertsComponent } from './components/desserts/desserts.component';
import { InventoryItemsComponent } from './components/inventory-items/inventory-items.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo: 'home'},
  { path: 'employees', component: EmployeesComponent, canActivate: [LoginService]},
  { path: 'customers', component: CustomersComponent, canActivate: [LoginService]},
  { path: 'orders', component: OrdersComponent, canActivate: [LoginService]},
  { path: 'desserts', component: DessertsComponent, canActivate: [LoginService]},
  { path: 'inventory-items', component: InventoryItemsComponent, canActivate: [LoginService]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [LoginService]},
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
