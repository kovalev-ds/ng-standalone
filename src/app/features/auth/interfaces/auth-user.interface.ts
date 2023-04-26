import { RoleEnum } from '../enums/role.enum';

export interface AuthUserInterface {
  username: string;
  email: string;
  avatar: string;
  roles: (keyof typeof RoleEnum)[];
}
