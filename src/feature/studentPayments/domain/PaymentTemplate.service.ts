import { ID } from "../../../types/BaseEntity";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { PaymentTemplate } from "./paymentTemplate.entity";

export class PaymentTemplateService {
  static removeServices(paymentTemplates: PaymentTemplate[], serviceIds: ID[]): PaymentTemplate[] {
    return paymentTemplates.map(paymentTemplate => {
      const updatedServices = paymentTemplate.services.filter(
        service => !serviceIds.includes(service._id),
      );

      const totalAmount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
        updatedServices,
        paymentTemplate.discount,
      );
      return { ...paymentTemplate, services: updatedServices, totalAmount };
    });
  }
}
