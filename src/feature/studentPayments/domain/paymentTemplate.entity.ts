import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";

export type PaymentTemplate = {
  name: string;
  services: {
    _id: ID;
    name: string;
    amount: number;
    newId: string;
    discount: number;
  }[];
  discount: number;
  totalAmount: number;
} & BaseEntity;

export type PaymentTemplateMetaData = GenerateMetaData<PaymentTemplate, never>;
