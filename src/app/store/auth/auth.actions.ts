import { createAction, props } from '@ngrx/store';

import { TokenUserModel } from 'src/app/models/tokenUserModel';

export const setTokenUserModel = createAction(
  '[Auth] Set Token User Model', //: Benzersiz key verdik. Bu action type/id olucak.
  props<{ tokenUserModel: TokenUserModel }>() //: inline bir interface yazdık.
  //: Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const deleteTokenUserModel = createAction(
  '[Auth] Delete Token User Model'
);
