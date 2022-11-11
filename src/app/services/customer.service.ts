import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private controllerUrl = `${environment.apiUrl}/customers`;

  constructor(private httpClient: HttpClient) {}

  getCustomerDetail(id:string|null){
    return this.httpClient.get<Customer>(`${this.controllerUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.controllerUrl, customer);
  }

}
