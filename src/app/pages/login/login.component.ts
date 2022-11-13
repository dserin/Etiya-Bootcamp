import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  login() {
    if (!this.loginForm.valid) {
      this.toastr.error('Lütfen tüm alanları kontrol ediniz..');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {},
      error: (errorResponse) => {
        this.toastr.error(errorResponse.error.message);
      },
      complete: () => {
        this.router.navigateByUrl('/homepage');
        this.authService.emitOnLoginEvent(
          `Hoşgeldiniz, ${this.loginForm.value.userName}`
        );
      },
    });
  }
}
