import { createAction, props } from '@ngrx/store';

import { Catalog } from 'src/app/models/catalog';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { Service } from 'src/app/models/service';

export const setIndividualInfoModel = createAction(
  '[Customer] Set Customer  Individual Info',
  props<{ individualInfoModel: IndividualCustomers }>()
);

export const setCorporateInfoModel = createAction(
  '[Customer] Set Create Corporate Info',
  props<{ corporateInfoModel: CorporateCustomers }>()
);

export const setServiceInfoModel = createAction(
  '[Customer] Set Create Service Info',
  props<{ serviceInfoModel: Service }>()
);
export const setCatalogsModel = createAction(
  '[Customer] Set Catalogs For Selected Customer',
  props<{ catalogs: Catalog }>()
);
