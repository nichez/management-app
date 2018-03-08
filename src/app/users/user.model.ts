import { Role } from '../roles/role.model';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  activationKey: string;
  password: string;
  image: string;
  usersRole: Role;
}
