import { UserTypeEnum } from '../enums';

export type CreateBaseUser = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  schoolSubdomain: string;
  type: UserTypeEnum;
  roles: string[];
};

export type BaseUser = CreateBaseUser & {
  id: string
  passwordChangedAt: Date;
};