import { AuthStoreState, initialAuthStoreState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { deleteTokenUserModel, setTokenUserModel } from './auth.actions';

export const authReducer = createReducer<AuthStoreState>(
  initialAuthStoreState,
  on(
    setTokenUserModel, //: yakalamak istediğim action
    (currentState, action) => {
      //: yakaladığım action ile ne yapacağımı belirliyorum. store'taki ilgili state'i güncelliyorum
      //: store'daki state'i güncellemek için referansının değişmesi gerekir.
      //! currentState.tokenUserModel = action.tokenUserModel;
      //: Çünkü componentler state'lerin stack adreslerini izliyorlar. Referans değişmediği sürece, componentler state'i günellenmiş olarak görmeyecektir.
      return {
        ...currentState,
        tokenUserModel: action.tokenUserModel,
      };
    }
  ),
  on(deleteTokenUserModel, (currentState) => {
    return {
      ...currentState,
      tokenUserModel: null, // 0x1234 (hexadecimal) -> 0
    };
  })
  // on(addRole, (state, action) => {
  //! currentState.roles.push(action.role);
  // return { ...currentState, roles: [...currentState.roles, action.role] };
  // }),
);
