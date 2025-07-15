import { PaymentTemplate } from "../../../../../feature/studentPayments/domain/paymentTemplate.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListPaymentTemplatesValidation } from "./listPaymentTemplates.validation";

export type ListPaymentTemplatesRouteConfig = ListPaymentTemplatesValidation & { files: never };
export type ListPaymentTemplatesResponse = ResponseWithPagination<PaymentTemplate>;
