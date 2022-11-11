import { Component, OnInit } from '@angular/core';

import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  individualCus!: IndividualCustomers[];
  corporateCus!: CorporateCustomers[];
  selectedCustomer: boolean = true;
  searchName: string = '';
  searchSurName: string = '';

  constructor(
    private router: Router,
    private individualCustomers: IndividualCustomersService,
    private corporateCustomers: CorporateCustomersService
  ) {}

  ngOnInit(): void {
    this.getIndividualCustomers();
    this.getCorporateCustomers();
  }

  getIndividualCustomers() {
    this.individualCustomers.getAllCustomers().subscribe((res) => {
      this.individualCus = res;
    });
    this.selectedCustomer = true;
  }
  getCorporateCustomers() {
    this.corporateCustomers.getAllCustomers().subscribe((res) => {
      this.corporateCus = res;
    });
    this.selectedCustomer = false;
  }

  goDetail(item: any) {
    this.router.navigate(['/detail', item.customerId]);
  }
}
