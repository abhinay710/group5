import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './shared/service/login.service';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent, canActivate: [LoginService]},
  { path: 'customers', component: CustomersComponent, canActivate: [LoginService]},
  { path: 'orders', component: OrdersComponent, canActivate: [LoginService]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [LoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
