export class User {
  user_id: any;
  id?: number;
  name: string;
  username: string;
  password?: string;
  email: string;
  last_login_on: any;
  PageNo: number;
  PageSize: number;
  SortItem: String;
  SortOrder: String;
  SearchText: String;
  SearchText2: String;
}

export class UserAuth {
  username: string;
  password: string;
}
