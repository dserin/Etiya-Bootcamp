import { RouterModule, Routes } from '@angular/router';

import { CatalogListComponent } from './pages/catalog-list/catalog-list.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [LoginGuard],
  },
  { path: 'detail/:id', component: CustomerDetailComponent },
  { path: 'service-selection', component: ServiceSelectionComponent },
  {
    path: 'catalog-list',
    component: CatalogListComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
