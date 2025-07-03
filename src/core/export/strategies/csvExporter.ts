import { Parser } from "@json2csv/plainjs";
import { ExportTableManager } from "../export-table-strategy.interface";

export class CsvExportStrategy implements ExportTableManager {
  async export(data: object[]): Promise<Buffer> {
    const parser = new Parser({
      defaultValue: "-",
    });

    const csv = parser.parse(data);
    const csvBuffer = Buffer.from(csv);

    return csvBuffer;
  }

  public getContentType(): string {
    return "text/csv";
  }

  public getFileExtension(): string {
    return "csv";
  }
}
