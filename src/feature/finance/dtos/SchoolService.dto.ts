import { ID } from "../../../types/BaseEntity";

export type StudentServiceDto = {
  _id: ID;
  uuid: string;
  name: string;
  amountBeforeDiscount: number;
  discount: number;
  amountAfterDiscount: number;
  newId: string;
  index: number;
};
