import moment from "moment";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TInvoiceTypeEnum } from "../../../database/schema/finance/Invoice.schema";
import { Service, SERVICE_TYPE_ENUM } from "../../studentPayments/domain/service.entity";

export class SchoolServicesService {
  static readonly MAX_DEFAULT_SERVICES = 10;
  static ensureServicesHasAmount(
    services: { amount: number | null; invoiceType: TInvoiceTypeEnum }[],
  ): void {
    const isAnyServiceAmountUndefined = services.some(
      service => service.invoiceType != SERVICE_TYPE_ENUM.EXTRA && service.amount === null,
    );

    if (!isAnyServiceAmountUndefined) {
      throw new BadRequestError("services.doesNotHaveAmount");
    }
  }

  static ensureMaxVisibleServices(
    data: { showByDefault?: boolean },
    service: Service,
    totalVisibleServices: number,
  ): void {
    const isVisibilityChanged =
      data.showByDefault === true && data.showByDefault !== service.showByDefault;
    const hasReachedMaxVisibleServices =
      totalVisibleServices >= SchoolServicesService.MAX_DEFAULT_SERVICES;

    if (isVisibilityChanged && hasReachedMaxVisibleServices) {
      throw new BadRequestError("service.maxDefaultServicesReached");
    }
  }

  static applyDiscount(amount: number, discount: number): number {
    if (discount > 100) {
      throw new BadRequestError("Discount cannot be more than 100%");
    }
    return amount * (1 - discount / 100);
  }

  static calculateTotalAmountService(services: { amount: number; discount: number }[]): number {
    return services.reduce((total, service) => {
      const discountedAmount = this.applyDiscount(service.amount, service.discount);
      return total + discountedAmount;
    }, 0);
  }

  static calculateServicesTotalAmountWithDiscount(
    services: { amount: number; discount: number }[],
    totalDiscount: number,
  ): number {
    const amountWithEveryDiscount = this.calculateTotalAmountService(services);
    const finalAmount = this.applyDiscount(amountWithEveryDiscount, totalDiscount);
    return finalAmount;
  }

  static calculateOneTimeDueDate(date: Date): Date {
    return moment(date).add(1, "day").toDate();
  }
  static calculateMonthlyDueDate(date: Date, schoolDueDate: number): Date {
    return moment(date).add(schoolDueDate, "day").toDate();
  }

  static validateNonExtraServicesForStudentPayment(
    services: { invoiceType: TInvoiceTypeEnum }[],
  ): void {
    const doesAllServicesAreNotExtra = services.every(
      service => service.invoiceType !== SERVICE_TYPE_ENUM.EXTRA,
    );
    if (!doesAllServicesAreNotExtra) throw new BadRequestError("services.containsExtra");
  }

  static attachServicesWithDiscount<T extends Service>(
    serviceIdDiscounts: { id: string; discount: number }[],
    services: T[],
  ): (T & { discount: number })[] {
    return serviceIdDiscounts.map(service => {
      const matchedService = services.find(s => s._id.toString() === service.id);
      if (!matchedService) throw new BadRequestError(`Service with ID ${service.id} not found`);
      return { ...matchedService, discount: service.discount };
    });
  }
}
