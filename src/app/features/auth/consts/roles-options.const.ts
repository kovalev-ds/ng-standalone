import { RoleEnum } from '../enums/role.enum';

export const rolesOptions: Array<{
  name: keyof typeof RoleEnum;
  value: RoleEnum;
}> = [
  { name: 'Admin', value: RoleEnum.Admin },
  { name: 'Employee', value: RoleEnum.Employee },
  { name: 'Guest', value: RoleEnum.Guest },
];
