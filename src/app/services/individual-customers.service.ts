import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { IndividualCustomers } from '../models/individualCustomers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setIndividualInfoModel } from '../store/customer/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class IndividualCustomersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  individualInfoModel$!: Observable<IndividualCustomers | null>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.individualInfoModel$ = this.store.select(
     
      (state) => state.customer.individualInfo
    );
  }
  saveIndividualCustomer(individualInfoModel: IndividualCustomers) {
    this.store.dispatch(setIndividualInfoModel({ individualInfoModel }));
  }
  getAllCustomers(): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(this.controllerUrl);
  }
  getInvidualCustDetail(id: number): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(
      `${this.controllerUrl}?customerId=${id}`
    );
  }
  createCustomer(individualCustomer: IndividualCustomers) {
    return this.httpClient.post<IndividualCustomers>(
      this.controllerUrl,
      individualCustomer
    );
  }
}
