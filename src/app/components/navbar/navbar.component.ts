import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenUserModel } from 'src/app/models/tokenUserModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  @Output() onLogout = new EventEmitter<void>();
  @Output() onLogoutWithValue = new EventEmitter<string>();
  tokenUserModel$: Observable<TokenUserModel | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.tokenUserModel$ = this.authService.tokenUserModel$;
  }

  ngOnInit(): void {
    this.handleOnLogin();
  }

  logout() {
    this.authService.logout();
    this.isLogin = this.authService.isAuthenticated;
    this.onLogout.emit();
    this.onLogoutWithValue.emit('Hoşçakal, tekrar bekleriz...');

    this.router.navigate(['login']);
  }

  handleOnLogin(): void {
    this.authService.onLogin.subscribe({
      next: () => {
        this.isLogin = this.authService.isAuthenticated;
      },
    });
  }
}
