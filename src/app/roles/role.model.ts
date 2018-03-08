import { User } from '../users/user.model';

export interface Role {
  id: number;
  name: string;
  description: string;
  sendEmail: boolean;
  users: User;
}
