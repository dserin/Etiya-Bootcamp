import { AuthStoreState } from './auth/auth.state';
import { CustomerState } from './customer/customer.state';

export interface AppStoreState {
  auth: AuthStoreState;
  customer: CustomerState;
  // customerToRegister: CustomerToRegister;
}
