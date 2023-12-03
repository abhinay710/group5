import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login';
import { LoginService } from 'src/app/shared/service/login.service';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal,
    private fb: FormBuilder, private loginService: LoginService, private customerService: CustomerService,
    private toastr: ToastrService) { }

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
          this.toastr.success('Login Successful', 'Success');

          if (response === null) {
            this.invalidDetails = true;
          } else {
            this.login = response;
            localStorage.setItem('user', response.emailID!.toString());
            localStorage.setItem('designation', response.designation!);
            localStorage.setItem('userId', response.userId!.toString());
            this.navigate();
          }
        }),
        error: (err: HttpErrorResponse) => {
          this.invalidDetails = true;
          this.toastr.error('Invalid Details', 'Error');
        }
      });
      
    } else {
      // Mark form fields as touched to display validation messages
      this.loginForm?.markAllAsTouched();
    }
  }

  navigate() {
    const designation = localStorage.getItem('designation');
    if (designation === 'Employee') {
      this.router.navigate([`/orders`], { relativeTo: this.activatedRoute });
    } else if (designation === 'Manager') {
      this.router.navigate([`/customers`], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([`/home`], { relativeTo: this.activatedRoute });
    }
  }

  onRegisterClick(){
    const modalRef = this.modalService.open(CustomerDialogComponent);
    modalRef.componentInstance.modalTitle = 'Register';
    modalRef.componentInstance.submitButtonLabel = 'register';

    modalRef.result.then((result: Customer) => {
      if (result) {
        this.customerService.saveCust(result).subscribe({
          next: ((resp: Customer) => {
            this.toastr.success('Registered Successfully', 'Success');
          }),
          error: (err: HttpErrorResponse) => {
            this.toastr.error(err.message, 'Error');
          }
        });
      }
    });
  }
}
