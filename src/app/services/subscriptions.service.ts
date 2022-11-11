import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private controllerUrl = `${environment.apiUrl}/subscriptions`;
  private sub: Subscription[] = [];
  constructor(private httpClient: HttpClient) {}

  getSubscription(id: number) {
    return this.httpClient.get<Subscription>(`${this.controllerUrl}/${id}`);
  }

  getToSubscriptions(customerId: number): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>(
      `${this.controllerUrl}?customerId=${customerId}`
    );
  }
  postSubscription(subscription: Subscription) {
    return this.httpClient.post<Subscription>(this.controllerUrl, subscription);
  }
}
