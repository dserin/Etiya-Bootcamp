import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
  customerId!: number;
  subscription!: Subscription[];
  service!: Service[];
  serviceId!: number[];
  corporate!: CorporateCustomers[];
  individual!: IndividualCustomers[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService,
    private subscriptionsService: SubscriptionsService,
    private individualCustomersService: IndividualCustomersService,
    private corporateCustomersService: CorporateCustomersService
  ) {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.getSubscriptions();
    this.getServices();
  }
  getCustomer() {
    this.individualCustomersService
      .getInvidualCustDetail(this.customerId)
      .subscribe((res) => {
        this.individual = res;
      });
    this.corporateCustomersService
      .getCorporateDetail(this.customerId)
      .subscribe((res) => {
        this.corporate = res;
      });
  }

  getSubscriptions() {
    this.subscriptionsService
      .getToSubscriptions(this.customerId)
      .subscribe((res) => {
        this.subscription = res;
      });
  }
  getServices() {
    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        this.service = res.filter(
          (x) => x.id == this.subscription[0].serviceId
        );
      },
    });
  }
}
