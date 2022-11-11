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
    return this.httpClient.get<Catalog[]>(this.controllerUrl);
  }

  saveCatalogs(catalogs: Catalog) {
    this.store.dispatch(setCatalogsModel( {catalogs}));
  }

 
}
