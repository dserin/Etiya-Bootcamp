import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  deleteTokenUserModel,
  setTokenUserModel,
} from '../store/auth/auth.actions';

import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDto } from '../models/loginDto';
import { LoginResponseModel } from '../models/loginResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Store } from '@ngrx/store';
import { TokenUserModel } from '../models/tokenUserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private controllerUrl = `${environment.apiUrl}/auth`;
  // private, protected, public(default)
  //* Events, bir event'in tetiklendiğini, bir event'in tetiklendiğini dinleyen bir sınıflardır.
  //* - EventEmitter:  component.html tarafında, @Output() ile kullanılır.
  //* - Subject: component.ts arası kullanılır.
  //* - BehaviorSubject: Subject'ın bir türüdür. Subject'ın ilk değerini alır.
  onLogin = new BehaviorSubject<string>('Hoşgeldiniz!');
  tokenUserModel$: Observable<TokenUserModel | null>;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppStoreState>
  ) {
    //: Store'dan tokenUserModel'ı alıyoruz. Select, redux design pattern'indeki selector'a karşılık geliyor.
    this.tokenUserModel$ = this.store.select(
      (state) => state.auth.tokenUserModel
    );
  }

  login(loginDto: LoginDto): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      `${this.controllerUrl}/login`,
      loginDto
    );
  }

  saveToken(loginResponseModel: LoginResponseModel) {
    this.localStorage.set('token', loginResponseModel.access_token);
    const tokenUserModel = this.tokenUserModel;
    if (tokenUserModel) this.setTokenUserModelStoreState(tokenUserModel);
  }

  logout() {
    this.localStorage.remove('token');
    this.deleteTokenUserModelStoreState();
  }

  get isAuthenticated(): boolean {
    // varsa süresi geçmişse yine false
    let token = this.localStorage.get('token');
    if (!token) return false;
    if (this.jwtHelperService.isTokenExpired()) return false;
    return true;
  }

  get jwtToken(): string | null {
    return this.localStorage.get('token');
  }

  get tokenUserModel(): TokenUserModel | null {
    const token = this.jwtToken;
    if (!token) return null;
    if (this.jwtHelperService.isTokenExpired()) return null;

    return this.jwtHelperService.decodeToken(token) as TokenUserModel;
  }

  emitOnLoginEvent(eventValue: string) {
    this.onLogin.next(eventValue);
    // this.onLogin.error(new Error("Bir hata oluştu"));
    // this.onLogin.complete(); // Subject artık complete oldu.
    // this.onLogin = new Subject<string>(); // Subject'i yeniden oluşturduk., Yeni bir referans aldık.
    // //* Fakat subscribe olmuş olanlar, bu event'i yakalayamayacaklar. Çünkü önceki referansa subscribe oldular.
  }

  setTokenUserModelStoreState(tokenUserModel: TokenUserModel) {
    //: dispatch, redux design pattern'indeki action'ları gönderdiğimiz method'a karşılık geliyor.
    this.store.dispatch(setTokenUserModel({ tokenUserModel }));
  }
  deleteTokenUserModelStoreState() {
    this.store.dispatch(deleteTokenUserModel());
  }
}
