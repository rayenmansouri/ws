import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { INVOICE_TYPE_ENUM, InvoiceType } from "./Invoice.schema";

type BaseService = IEntity & {
  name: string;
  description?: string | null;
  month: number;
  showByDefault: boolean;
};

export type ExtraService = BaseService & {
  amount?: number | null;
  invoiceType: typeof INVOICE_TYPE_ENUM.EXTRA;
};

export type StudentInvoiceService = BaseService & {
  amount: number;
  invoiceType: PickFromEnum<InvoiceType, "monthly" | "oneTime">;
};

export type IService = ExtraService | StudentInvoiceService;

export const serviceSchema = createSchema<IService>({
  name: String,
  description: String,
  amount: Number,
  month: Number,
  invoiceType: String,
  showByDefault: {
    type: Boolean,
    default: false,
  },
});

serviceSchema.index({ name: 1, invoiceType: 1 }, { unique: true });
