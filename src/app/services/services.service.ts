import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setServiceInfoModel } from '../store/customer/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  getServices() {
    throw new Error('Method not implemented.');
  }
  private controllerUrl = `${environment.apiUrl}/services`;
  serviceModel$: Observable<Service | null>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.serviceModel$ = this.store.select(
      (state) => state.customer.serviceInfo
    );
  }

  getAllServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.controllerUrl);
  }
  add(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(this.controllerUrl, service);
  }
  update(service: Service, id: number): Observable<Service> {
    return this.httpClient.put<Service>(`${this.controllerUrl}/${id}`, service);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
  saveServices(serviceInfoModel: Service) {
    this.store.dispatch(setServiceInfoModel({ serviceInfoModel }));
  }
}
