import moment from "moment";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export class HelperValidation {
  static isValidISO8601Date(dateString: Date | string): boolean {
    return moment(dateString, moment.ISO_8601, true).isValid();
  }
  static isValidDate(dateString: Date | string): boolean {
    return moment(dateString, "YYYY-MM-DD:HH:mm:ss", true).isValid();
  }

  static isMobilePhone(str: string): boolean {
    const phones = {
      "ar-TN": /^(\+?216)?[2459]\d{7}$/,
    };
    for (const key in phones) {
      const phone = phones[key as keyof typeof phones];
      if (phone.test(str)) return true;
    }
    return false;
  }

  static sanitizeHTML(dirty: string): string {
    const window = new JSDOM(dirty).window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(dirty);
  }
}
