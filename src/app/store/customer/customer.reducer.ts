import { CustomerState, initialCustomerState } from './customer.state';
import { createReducer, on } from '@ngrx/store';
import {
  setCorporateInfoModel,
  setIndividualInfoModel,
  setServiceInfoModel,
} from './customer.actions';

export const customerReducer = createReducer<CustomerState>(
  initialCustomerState,
  on(setIndividualInfoModel, (currentState, action) => {
    console.log(action);

    return { ...currentState, individualInfo: action.individualInfoModel };
  }),
  on(setCorporateInfoModel, (currentState, action) => {
    console.log(action);
    return {
      ...currentState,
      corporateInfo: action.corporateInfoModel,
    };
  }),
  on(setServiceInfoModel, (currentState, action) => {
    console.log(action);
    return {
      ...currentState,
      serviceInfo: action.serviceInfoModel,
    };
  })
);
