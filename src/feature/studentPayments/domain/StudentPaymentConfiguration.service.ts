import { ID } from "../../../types/BaseEntity";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { StudentPaymentConfiguration } from "./studentPaymentConfiguration.entity";

export class StudentPaymentConfigurationService {
  static removeServices(
    studentPaymentConfigurations: StudentPaymentConfiguration[],
    serviceIds: ID[],
  ): StudentPaymentConfiguration[] {
    return studentPaymentConfigurations.map(studentPaymentConfiguration => {
      const updatedServices = studentPaymentConfiguration.services.filter(
        service => !serviceIds.includes(service._id),
      );

      const totalAmount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
        updatedServices,
        studentPaymentConfiguration.discount,
      );
      return { ...studentPaymentConfiguration, services: updatedServices, totalAmount };
    });
  }
}
