import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'telco-frontend12';
  isLoading: boolean = false;
  today: Date = new Date();
  overlayTitleText: string = '';
  // tokenUserModel: TokenUserModel | null = null;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribeToLoading();
    this.handleOnLogin();
    this.setTokenUserModel();
  }

  setTokenUserModel() {
    const tokenUserModel = this.authService.tokenUserModel;
    if (tokenUserModel)
      this.authService.setTokenUserModelStoreState(tokenUserModel);
  }

  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    // console.log(result);
    return result;
  }

  btnClick() {
    alert('Butona tıklandı');
  }

  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
      console.log(`Is Loading değeri: ${isLoading}`);
    });
  }

  startLoading() {
    this.loadingService.startLoading();
  }
  stopLoading() {
    this.loadingService.stopLoading();
  }

  handleOnLogout() {
    this.overlayTitleText = 'Hoşçakal, tekrar bekleriz...';
  }
  handleOnLogoutWithValue(eventValue: string) {
    this.overlayTitleText = eventValue;
  }
  handleOnLogin(): void {
    //* onLogin event'ine (subject) abone olduk, dolayısıyla her tetiklendiğinde ilgili event fonksiyonu çalışır.
    this.authService.onLogin.subscribe({
      next: (eventValue) => {
        this.overlayTitleText = eventValue;
      },
    });
  }
}
