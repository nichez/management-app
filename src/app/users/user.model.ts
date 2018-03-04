import { Role } from '../roles/role.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  activationKey: string;
  password: string;
  image: string;
  role: Role;
}
