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
  createIndividualCustomer!: FormGroup; // individual form tanımlandı
  createCorporateCustomer!: FormGroup; //corporate form tanımlandı
  servicesForm: boolean = false; //ilgili service next butonuna basılmadan gösterilmesin...
  isIndividual: boolean = true; // burada müşteri tipine göre form göstermek için değişken tanımlandı
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
      //Store'dan individualCustomerModel'ı alıyoruz
      (state) => state.customer.individualInfo
    );
    this.corporateCustomerModel$ = this.store.select(
      (state) => state.customer.corporateInfo
    );
  }

  ngOnInit(): void {
    this.individualCustomerModel$.subscribe((res) => {
      if (res != null) this.individualCustomer = res;
      this.createIndividualCustomerForm(); // individual Formgroup oluşturacak metot
    });
    this.corporateCustomerService.corporateCustomerModel$.subscribe((res) => {
      if (res != null) this.corporateCustomer = res; //store'dan alınan corporateCustomer ilgili değişkene atandı...
      this.createCorporateCustomerForm(); // corporate  Formgroup oluşturacak metot
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
    //radio buttondan gelen değer control değerine atar
    this.isIndividual = selectedChoice;
  }

  goNextForm() {
    // next butonuna basıldığında koşullara göre form gösterir
    if (this.isIndividual && this.createIndividualCustomer.valid) {
      // müşteri tipine göre gösterilecek form alanı (individual)
      this.servicesForm = true;
      this.saveIndividualStore(this.createIndividualCustomer.value);
      this.router.navigateByUrl('/catalog-list');
    } else if (!this.isIndividual && this.createCorporateCustomer.valid) {
      // müşteri tipine göre gösterilecek form alanı (corporate)
      this.servicesForm = true;
      this.saveCorporateStore(this.createCorporateCustomer.value);
      this.router.navigateByUrl('/catalog-list');
    } else {
    }
  }

  saveIndividualStore(customer: IndividualCustomers) {
    //individual form değerleri oluşturulan store'a kayıt edilir..
    this.individualCustomerService.saveIndividualCustomer(customer);
  }

  saveCorporateStore(customer: CorporateCustomers) {
    //corporate form değerleri oluşturulan store'a kayıt edilir..
    this.corporateCustomerService.saveCorporateCustomer(customer);
  }
}
