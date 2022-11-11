// json2ts CTRL+ALT+V
export interface Role {
  id: number;
  userId: number;
  roleId: number;
}

export interface TokenUserModel {
  id: number;
  userName: string;
  roles: Role[];
}
