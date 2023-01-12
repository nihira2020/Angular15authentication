import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
