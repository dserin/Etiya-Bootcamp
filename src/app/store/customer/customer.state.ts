import { Catalog } from 'src/app/models/catalog';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { Service } from 'src/app/models/service';

export interface CustomerState {
  individualInfo: IndividualCustomers | null;
  corporateInfo: CorporateCustomers | null;
  serviceInfo: Service | null;
  catalogModel: Catalog | null;
}

export const initialCustomerState: CustomerState = {
  individualInfo: null,
  corporateInfo: null,
  serviceInfo: null,
  catalogModel: null,
};
