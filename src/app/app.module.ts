import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreState } from './store/app.state';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogListComponent } from './pages/catalog-list/catalog-list.component';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { SummaryComponent } from './pages/summary/summary.component';
import { ToastrModule } from 'ngx-toastr';
import { appReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    CreateCustomerComponent,
    CustomersComponent,
    CustomerDetailComponent,
    FooterComponent,
    ServiceSelectionComponent,
    CatalogListComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers),
    StoreDevtoolsModule.instrument({
      autoPause: false,
    }),
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
