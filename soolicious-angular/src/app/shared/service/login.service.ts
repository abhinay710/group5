import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService  implements CanActivate {
  API_URL: string = 'http://localhost:8080/login/';

  constructor(private http: HttpClient, private router: Router) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    
    return false;
  }

  public login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.API_URL ,login);
  }

  public isLoggedIn() {
    let customer = localStorage.getItem('user');
    if ((customer !== null)) {
      return true;
    }
    return false;
  }

  public isManagerLoggedIn() {
    let designation = localStorage.getItem('designation')!;
    if (designation && designation === 'Manager') {
      return true;
    }

    return false;
  }

  public isEmployeeLoggedIn() {
    let designation = localStorage.getItem('designation');
    if (designation && designation === 'Employee') {
      return true;
    }

    return false;
  }

  public isCustomerLoggedIn() {
    let designation = localStorage.getItem('designation');
    if (designation && designation === 'Customer') {
      return true;
    }

    return false;
  }

  public logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('designation');
    this.router.navigate(['/login']);
  }
}
