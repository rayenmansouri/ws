import { PaymentTemplate } from "./../../../../../feature/studentPayments/paymentTemplate.entity";

import { GetPaymentTemplateValidation } from "./getPaymentTemplate.validation";

export type GetPaymentTemplateRouteConfig = GetPaymentTemplateValidation & { files: never };
export type GetPaymentTemplateResponse = PaymentTemplate;
