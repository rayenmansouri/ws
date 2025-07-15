import { FILE_EXPORT_EXTENSION_ENUM } from "../../constants/fileExportExtension.constant";
import { BadRequestError } from "../ApplicationErrors";
import { ExportTableManager } from "./export-table-strategy.interface";
import { CsvExportStrategy } from "./strategies/csvExporter";
import { XLSXExportStrategy } from "./strategies/xlsxExporter";

export const getExportStrategy = (strategyType: string): ExportTableManager => {
  switch (strategyType) {
    case FILE_EXPORT_EXTENSION_ENUM.XLSX:
      return new XLSXExportStrategy();
    case FILE_EXPORT_EXTENSION_ENUM.CSV:
      return new CsvExportStrategy();
    default:
      throw new BadRequestError("Unknown strategy type");
  }
};
