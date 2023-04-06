import { AuthUserInterface } from './auth-user.interface';

export interface AuthResponseInterface {
  token: string;
  user: AuthUserInterface;
}
