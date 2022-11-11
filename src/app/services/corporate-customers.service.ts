import { AppStoreState } from '../store/app.state';
import { CorporateCustomers } from '../models/corporateCustomers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setCorporateInfoModel } from '../store/customer/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class CorporateCustomersService {
  private controllerUrl = `${environment.apiUrl}/corporateCustomers`;
  corporateCustomerModel$: Observable<CorporateCustomers | null>;
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.corporateCustomerModel$ = this.store.select(
      (state) => state.customer.corporateInfo
    );
  }

  getAllCustomers(): Observable<CorporateCustomers[]> {
    return this.httpClient.get<CorporateCustomers[]>(this.controllerUrl);
  }
  getCorporateDetail(id: number): Observable<CorporateCustomers[]> {
    return this.httpClient.get<CorporateCustomers[]>(
      `${this.controllerUrl}?customerId=${id}`
    );
  }
  createCustomer(
    corporateCustomer: CorporateCustomers
  ): Observable<CorporateCustomers> {
    return this.httpClient.post<CorporateCustomers>(
      this.controllerUrl,
      corporateCustomer
    );
  }
  saveCorporateCustomer(corporateInfoModel: CorporateCustomers) {
    this.store.dispatch(setCorporateInfoModel({ corporateInfoModel }));
  }
}
