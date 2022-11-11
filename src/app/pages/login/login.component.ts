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
      next: (response) => {
        //* next: event sonucunda, ara katmanda değeri işlemek istiyorsak, kullanılan event metodudur.
        this.authService.saveToken(response); //= token'ı localStorage'a kaydettik ve store'a da kaydettik.
      },
      error: (errorResponse) => {
        //* error: bir hata olduğunda yakaladığımız event metodudur.
        this.toastr.error(errorResponse.error.message);
      },
      complete: () => {
        //* next'ten sonra son kısımda çalışan event metodudur. Event'in artık comlete olduğu gösteriyor.
        this.router.navigateByUrl('/homepage');
        this.authService.emitOnLoginEvent(
          `Hoşgeldiniz, ${this.loginForm.value.userName}`
        );
      },
    });
  }
}
