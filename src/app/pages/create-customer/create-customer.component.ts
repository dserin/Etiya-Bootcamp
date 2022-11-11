import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  setCorporateInfoModel,
  setIndividualInfoModel,
} from 'src/app/store/customer/customer.actions';

import { AppStoreState } from 'src/app/store/app.state';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  corporateCustomerForm!: FormGroup;
  individualCustomerForm!: FormGroup;
  individualInfoModel$!: Observable<IndividualCustomers | null>;
  corporateInfoModel$!: Observable<CorporateCustomers | null>;
  individualInfo!: IndividualCustomers;
  corporateInfo!: CorporateCustomers;
  isIndividualCustomer: boolean = true;
  constructor(
    private store: Store<AppStoreState>,
    private formBuilder: FormBuilder,
    private individualCustomerService: IndividualCustomersService,
    private corporateCustomerService: CorporateCustomersService
  ) {
    this.individualInfoModel$ = this.store.select(
      (s) => s.customer.individualInfo
    );
    this.corporateInfoModel$ = this.store.select(
      (x) => x.customer.corporateInfo
    );
  }

  ngOnInit(): void {
    this.individualInfoModel$.subscribe((response) => {
      if (response != null) this.individualInfo = response;
      this.createIndividualCustomerForm();
    });
    this.corporateInfoModel$.subscribe((response) => {
      if (response != null) this.corporateInfo = response;
      this.createCorporateCustomerForm();
    });
  }

  createIndividualCustomerForm() {
    this.individualCustomerForm = this.formBuilder.group({
      firstName: [this.individualInfo?.firstName ?? '', Validators.required],
      lastName: [this.individualInfo?.lastName ?? '', Validators.required],
      nationalIdentity: [
        this.individualInfo?.nationalIdentity ?? '',
        Validators.required,
      ],
    });
  }
  createCorporateCustomerForm() {
    this.corporateCustomerForm = this.formBuilder.group({
      componayName: [
        this.corporateInfo?.companyName ?? '',
        Validators.required,
      ],
      taxNumber: [this.corporateInfo?.taxNumber ?? '', Validators.required],
    });
  }
  selectedType(selected: any) {
    if (selected === 'individual') this.isIndividualCustomer = true;
    else {
      this.isIndividualCustomer = false;
    }
  }

  saveIndividualState() {
    // STATE değişecek.. dispatch!!
    if (!this.individualCustomerForm.valid) return;

    // dispatch
    this.store.dispatch(
      setIndividualInfoModel({
        individualInfoModel: this.individualCustomerForm.value,
      })
    );
  }

  saveCorporateState() {
    if (!this.corporateCustomerForm.valid) return;
    this.store.dispatch(
      setCorporateInfoModel({
        corporateInfoModel: this.corporateCustomerForm.value,
      })
    );
  }
}
