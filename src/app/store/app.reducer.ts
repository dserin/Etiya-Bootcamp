import { authReducer } from './auth/auth.reducer';
import { customerReducer } from './customer/customer.reducer';

export const appReducers = {
  auth: authReducer,
  customer: customerReducer,
  // customerToRegister: customerToRegisterReducer,
};
