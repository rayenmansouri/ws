import { ID } from "../../../types/BaseEntity";

export type StudentPaymentConfigurationDto = {
  newId: string;
  _id: ID;
  emailReminder: boolean;
  email: string | null;
  smsReminder: boolean;
  phoneNumber: string | null;
  discount: number;
  studentId: ID;
  totalAmount: number;
  services: { amount: number; discount: number; name: string; newId: string; _id: ID }[];
};
