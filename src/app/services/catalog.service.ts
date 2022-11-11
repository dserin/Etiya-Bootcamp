import { AppStoreState } from '../store/app.state';
import { Catalog } from '../models/catalog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setCatalogsModel } from '../store/customer/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private controllerUrl = `${environment.apiUrl}/catalog`;

  catalogModel$:Observable<Catalog | null>;

  constructor(private httpClient: HttpClient,private store: Store<AppStoreState>) {
    this.catalogModel$ = this.store.select(
      (state) => state.customer.catalogModel
    );
  }

  getCatalog(): Observable<Catalog[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Catalog[]>(this.controllerUrl);
  }

  saveCatalogs(catalogs: Catalog) {
    this.store.dispatch(setCatalogsModel( {catalogs}));
  }

  // add(catalog: Catalog): Observable<Catalog> {
  //   return this.httpClient.post<Catalog>(this.controllerUrl, catalog);
  // }

  // update(catalog: Catalog): Observable<Catalog> {
  //   return this.httpClient.put<Catalog>(
  //     `${this.controllerUrl}/${catalog.serviceId}`,
  //     catalog
  //   );
  // }

  // delete(id: number): Observable<void> {
  //   return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  // }

}
