import { SmartCalendarPdfDTO } from "../../../../../feature/smartCalendar/dtos/SmartCalendarPDF.dto";
import { GetSmartSchedulePDFValidation } from "./getSmartSchedulePDF.validation";

export type GetSmartSchedulePDFRouteConfig = GetSmartSchedulePDFValidation & {
  files: never;
};
export type GetSmartSchedulePDFResponse = SmartCalendarPdfDTO;
