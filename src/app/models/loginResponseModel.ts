import { ResponseModel } from './responseModel';

export interface LoginResponseModel extends ResponseModel {
  access_token: string;
}
