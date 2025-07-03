/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from "zod";
import { HelperValidation } from "./helper.validation";
import { FILE_EXPORT_EXTENSION_ENUM } from "../../constants/fileExportExtension.constant";

export class CustomValidation extends HelperValidation {
  static validateEmail() {
    return z.string().email().toLowerCase();
  }

  static validatePhoneNumber() {
    return z.string().refine(value => this.isMobilePhone(value), "invalid phone number");
  }

  static validateNewId() {
    return z.string().refine(value => !isNaN(+value), "Invalid NewId");
  }

  static validateStringAsNumber() {
    return z.string().refine(val => !isNaN(Number(val)), { message: "Invalid Number" });
  }

  static validateDate() {
    return z.date().or(z.string()).refine(value => this.isValidDate(value), "the date is invalid format").transform(value => new Date(value)); //prettier-ignore
  }

  static validateEnum<T extends object>(obj: T) {
    return z.custom<T[keyof T]>().refine(value => Object.values(obj).includes(value), {
      message: `Value must be one of ${Object.values(obj).join(", ")}`,
    });
  }

  static validateHTML() {
    return z.custom<string>().transform(value => this.sanitizeHTML(value));
  }

  static newIdWithTenantIdValidation() {
    return z.string().regex(/^\d+\.\d+$/, "Invalid format. Expected '00003.00001' pattern.");
  }

  static validateExportOption() {
    return z.object({
      export: z.nativeEnum(FILE_EXPORT_EXTENSION_ENUM).optional(),
    });
  }
}
