import { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { TPaymentTypeEnum } from "./../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";

export interface ITeacherPaymentConfiguration extends IEntity {
  paymentType: TPaymentTypeEnum;
  contractType: string;
  attachment: { public_id: any; url: string; name: string }[];
  bankAccountId: string | null;
  teacher: ObjectId;
  amount: number;
}

export const teacherPaymentConfigurationSchema = createSchema<ITeacherPaymentConfiguration>({
  paymentType: String,
  contractType: String,
  amount: Number,
  bankAccountId: { type: String, default: null },
  teacher: { type: Types.ObjectId, ref: "teacher", unique: true },
  attachment: [{ public_id: String, url: String, name: String }],
});
