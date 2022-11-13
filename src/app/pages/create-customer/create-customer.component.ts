import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  servicesForm: boolean = false;
  isIndividual: boolean = true;
  individualCustomer!: IndividualCustomers | null;
  corporateCustomer!: CorporateCustomers | null;
  individualCustomerModel$: Observable<IndividualCustomers | null>;
  corporateCustomerModel$: Observable<CorporateCustomers | null>;

  constructor(
    private formBuilder: FormBuilder,
    private individualCustomerService: IndividualCustomersService,
    private corporateCustomerService: CorporateCustomersService,
    private store: Store<AppStoreState>,
    private router: Router
  ) {
    this.individualCustomerModel$ = this.store.select(
      (state) => state.customer.individualInfo
    );
    this.corporateCustomerModel$ = this.store.select(
      (state) => state.customer.corporateInfo
    );
  }

  ngOnInit(): void {
    this.individualCustomerModel$.subscribe((res) => {
      if (res != null) this.individualCustomer = res;
      this.createIndividualCustomerForm();
    });
    this.corporateCustomerService.corporateCustomerModel$.subscribe((res) => {
      if (res != null) this.corporateCustomer = res;
      this.createCorporateCustomerForm();
    });
  }

  createIndividualCustomerForm() {
    this.createIndividualCustomer = this.formBuilder.group({
      firstName: [
        this.individualCustomer?.firstName ?? '',
        Validators.required,
      ],
      lastName: [this.individualCustomer?.lastName ?? '', Validators.required],
      nationalIdentity: [
        this.individualCustomer?.nationalIdentity ?? '',
        [Validators.required, Validators.minLength(11)],
      ],
      dateOfBirth: [
        this.individualCustomer?.dateOfBirth ?? '',
        Validators.required,
      ],
    });
  }
  createCorporateCustomerForm() {
    this.createCorporateCustomer = this.formBuilder.group({
      companyName: [
        this.corporateCustomer?.companyName ?? '',
        Validators.required,
      ],
      taxNumber: [
        this.corporateCustomer?.taxNumber ?? '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  clickCustomerOption(selectedChoice: boolean) {
    this.isIndividual = selectedChoice;
  }

  goNextForm() {
    if (this.isIndividual && this.createIndividualCustomer.valid) {
      this.servicesForm = true;
      this.saveIndividualStore(this.createIndividualCustomer.value);
      this.router.navigateByUrl('/catalog-list');
    } else if (!this.isIndividual && this.createCorporateCustomer.valid) {
      this.servicesForm = true;
      this.saveCorporateStore(this.createCorporateCustomer.value);
      this.router.navigateByUrl('/catalog-list');
    } else {
    }
  }

  saveIndividualStore(customer: IndividualCustomers) {
    this.individualCustomerService.saveIndividualCustomer(customer);
  }

  saveCorporateStore(customer: CorporateCustomers) {
    this.corporateCustomerService.saveCorporateCustomer(customer);
  }
}
