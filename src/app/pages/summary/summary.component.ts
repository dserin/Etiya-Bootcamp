import { Component, OnInit } from '@angular/core';

import { CatalogService } from 'src/app/services/catalog.service';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  isIndividual!: boolean;
  individualCustomer!: any;
  corporateCustomer!: any;
  checkedCatalogs!: any;
  searchName: string = '';
  searchSurName: string = '';
  individualCustomersPipe!: IndividualCustomers[];

  constructor(
    private individualCustomerService: IndividualCustomersService,
    private corporateCustomerService: CorporateCustomersService,
    private customerService: CustomerService,
    private catalogService: CatalogService,
    private subscriptionService: SubscriptionsService,
    private invoiceService: InvoicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.storeData();
  }

  storeData() {
    this.individualCustomerService.individualInfoModel$.subscribe((res) => {
      if (res) {
        this.individualCustomer = res;
        this.isIndividual = true;
      }
    });
    this.corporateCustomerService.corporateCustomerModel$.subscribe((res) => {
      if (res) {
        this.corporateCustomer = res;
        this.isIndividual = false;
      }
    });
    this.catalogService.catalogModel$.subscribe((res) => {
      this.checkedCatalogs = res;
    });
  }

  saveCustomer() {
    const newCustomer: Customer = {
      customerNumber: Math.floor(10000000 + Math.random() * 90000000),
    };
    this.customerService.createCustomer(newCustomer).subscribe({
      next: (res) => {
        if (this.isIndividual) {
          const addToIndividual = {
            id: res.id,
            customerId: res.id,
            ...this.individualCustomer,
          };
          console.log(addToIndividual);

          this.individualCustomerService
            .createCustomer(addToIndividual)
            .subscribe({
              next: (res) => {
                this.addInvoice(res);
              },
            });
        } else {
          const addToCorporate = {
            id: res.id,
            customerId: res.id,
            ...this.corporateCustomer,
          };
          console.log(addToCorporate);

          this.corporateCustomerService
            .createCustomer(addToCorporate)
            .subscribe({
              next: (res) => {
                this.addInvoice(res);
              },
            });
        }
        this.toastr.success('Save Successful');
        this.router.navigateByUrl('/customers');
      },
    });
  }

  addInvoice(customer: any) {
    this.checkedCatalogs.map((catalog: any) => {
      //seçilen servisler
      const subscription: Subscription = {
        customerId: customer.customerId,
        serviceId: catalog.serviceId,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionService.postSubscription(subscription).subscribe({
        //service post işlemi
        next: (response) => {
          let date = new Date(response.dateStarted);
          date.setDate(date.getDate());
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoice = {
            subscriptionId: response.id,
            dateCreated: response.dateStarted,
            dateDue: dateDue,
          };
          this.invoiceService.postInvoices(invoice).subscribe();
        },
        error: () => {
          this.toastr.error('Error');
        },
        complete: () => {
          this.toastr.success('Succesful');
          this.router.navigateByUrl('/customers');
        },
      });
    });
  }
}
