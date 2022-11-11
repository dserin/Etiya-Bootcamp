import { TokenUserModel } from 'src/app/models/tokenUserModel';

export interface AuthStoreState {
  tokenUserModel: TokenUserModel | null;
}

export const initialAuthStoreState: AuthStoreState = {
  tokenUserModel: null,
};
