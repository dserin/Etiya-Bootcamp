import { Pipe, PipeTransform } from '@angular/core';

import { IndividualCustomers } from '../models/individualCustomers';

@Pipe({
  name: 'individualFilter',
})
export class IndividualFilterPipe implements PipeTransform {
  transform(
    value: IndividualCustomers[],
    firstName: string,
    lastName: string
  ): IndividualCustomers[] {
    return value.filter((customer) => {
      customer.firstName
        .toLocaleLowerCase()
        .includes(firstName.toLocaleLowerCase()) &&
        customer.lastName
          .toLocaleLowerCase()
          .includes(lastName.toLocaleLowerCase());
    });
  }
}
