import { Workbook } from "exceljs";
import { ExportTableManager } from "../export-table-strategy.interface";

export class XLSXExportStrategy implements ExportTableManager {
  async export(data: object[]): Promise<Buffer> {
    const buffer = await this.getXLSXBuffer(data);
    const xlsxBuffer = Buffer.from(buffer);
    return xlsxBuffer;
  }

  public getContentType(): string {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
  public getFileExtension(): string {
    return "xlsx";
  }

  private async getXLSXBuffer(data: object[]): Promise<Buffer> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet();

    const columns = data.reduce(
      (acc: string[], obj: object) => (acc = Object.getOwnPropertyNames(obj)),
      [],
    );

    worksheet.columns = columns.map(el => {
      const columValuesLength = (data as Record<string, string | undefined>[]).map(
        value => value[el]?.length || 0,
      );

      const width = Math.max(...columValuesLength, 10);
      return { header: el, key: el, width };
    });

    worksheet.addRows(data);

    const xlsxBuffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(xlsxBuffer);
  }
}
