import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidDetails?: boolean;
  login?: Login;
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    designation: ['Customer', Validators.required]
  });;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  // Function to handle login form submission
  onSubmit() {
    if (this.loginForm?.valid) {
      let login: Login = {};
      login.emailID = this.loginForm.get('username')?.value;
      login.password = this.loginForm.get('password')?.value;
      login.designation = this.loginForm.get('designation')?.value;
      this.loginService.login(login).subscribe({
        next: ((response: Login) => {
          if (response === null) {
            this.invalidDetails = true;
          } else {
            this.login = response;
            sessionStorage.setItem('user', response.emailID!.toString());
            sessionStorage.setItem('designation', response.designation!);
            this.navigate();
          }
        }),
        error: (err: HttpErrorResponse) => {
          this.invalidDetails = true;
        }
      });
      
    } else {
      // Mark form fields as touched to display validation messages
      this.loginForm?.markAllAsTouched();
    }
  }

  navigate() {
    const designation = sessionStorage.getItem('designation');
    if (designation === 'Employee') {
      this.router.navigate([`/orders`], { relativeTo: this.activatedRoute });
    } else if (designation === 'Manager') {
      this.router.navigate([`/customers`], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([`/home`], { relativeTo: this.activatedRoute });
    }
  }
}
