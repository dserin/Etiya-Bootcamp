// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {
//   setCorporateInfoModel,
//   setIndividualInfoModel,
// } from 'src/app/store/customer/customer.actions';

// import { AppStoreState } from 'src/app/store/app.state';
// import { CorporateCustomers } from 'src/app/models/corporateCustomers';
// import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
// import { IndividualCustomers } from 'src/app/models/individualCustomers';
// import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
// import { Observable } from 'rxjs';
// import { Service } from 'src/app/models/service';
// import { ServicesService } from 'src/app/services/services.service';
// import { Store } from '@ngrx/store';

// @Component({
//   templateUrl: './create-customer.component.html',
//   styleUrls: ['./create-customer.component.css'],
// })
// export class CreateCustomerComponent implements OnInit {
//   corporateCustomerForm!: FormGroup;
//   individualCustomerForm!: FormGroup;
//   individualInfoModel$!: Observable<IndividualCustomers | null>;
//   corporateInfoModel$!: Observable<CorporateCustomers | null>;
//   individualInfo!: IndividualCustomers;
//   corporateInfo!: CorporateCustomers;
//   isIndividualCustomer: boolean = true;
//   constructor(
//     private store: Store<AppStoreState>,
//     private formBuilder: FormBuilder,
//     private individualCustomerService: IndividualCustomersService,
//     private corporateCustomerService: CorporateCustomersService
//   ) {
//     this.individualInfoModel$ = this.store.select(
//       (s) => s.customer.individualInfo
//     );
//     this.corporateInfoModel$ = this.store.select(
//       (x) => x.customer.corporateInfo
//     );
//   }

//   ngOnInit(): void {
//     this.individualInfoModel$.subscribe((response) => {
//       if (response != null) this.individualInfo = response;
//       this.createIndividualCustomerForm();
//     });
//     this.corporateInfoModel$.subscribe((response) => {
//       if (response != null) this.corporateInfo = response;
//       this.createCorporateCustomerForm();
//     });
//   }

//   createIndividualCustomerForm() {
//     this.individualCustomerForm = this.formBuilder.group({
//       firstName: [this.individualInfo?.firstName ?? '', Validators.required],
//       lastName: [this.individualInfo?.lastName ?? '', Validators.required],
//       nationalIdentity: [
//         this.individualInfo?.nationalIdentity ?? '',
//         Validators.required,
//       ],
//     });
//   }
//   createCorporateCustomerForm() {
//     this.corporateCustomerForm = this.formBuilder.group({
//       componayName: [
//         this.corporateInfo?.companyName ?? '',
//         Validators.required,
//       ],
//       taxNumber: [this.corporateInfo?.taxNumber ?? '', Validators.required],
//     });
//   }
//   selectedType(selected: any) {
//     if (selected === 'individual') this.isIndividualCustomer = true;
//     else {
//       this.isIndividualCustomer = false;
//     }
//   }

//   saveIndividualState() {
//     // STATE değişecek.. dispatch!!
//     if (!this.individualCustomerForm.valid) return;

//     // dispatch
//     this.store.dispatch(
//       setIndividualInfoModel({
//         individualInfoModel: this.individualCustomerForm.value,
//       })
//     );
//   }

//   saveCorporateState() {
//     if (!this.corporateCustomerForm.valid) return;
//     this.store.dispatch(
//       setCorporateInfoModel({
//         corporateInfoModel: this.corporateCustomerForm.value,
//       })
//     );
//   }
// }

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
