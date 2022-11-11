import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private controllerUrl = `${environment.apiUrl}/invoices`;

  constructor(private httpClient: HttpClient) {}

  getInvoices(id:number|null){
    return this.httpClient.get<Invoice[]>(`${this.controllerUrl}?subscriptionId=${id}`);
  }

  postInvoices(invoice: Invoice) {
    return this.httpClient.post<Invoice>(this.controllerUrl, invoice);
  }
}
