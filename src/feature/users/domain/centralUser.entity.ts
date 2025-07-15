import { ID } from "../../../types/BaseEntity";

export type CentralUser = {
  email?: string;
  phoneNumber?: string;
  newId: string;
  userId: ID;
  tenantId: string;
};
