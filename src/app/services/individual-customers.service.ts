import { HttpClient } from '@angular/common/http';
import { IndividualCustomers } from '../models/individualCustomers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndividualCustomersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;
  individualInfoModel$!: Observable<IndividualCustomers | null>;
  constructor(private httpClient: HttpClient) {}

  getAllCustomers(): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(this.controllerUrl);
  }
  getInvidualCustDetail(id: number): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(
      `${this.controllerUrl}?customerId=${id}`
    );
  }
}
