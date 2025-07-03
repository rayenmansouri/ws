import { omit, startCase } from "lodash";
import mongoose, { isObjectIdOrHexString, Mongoose } from "mongoose";
import { ExportTableManager } from "./export-table-strategy.interface";

export class ExportTableContext {
  constructor(private strategy: ExportTableManager) {}

  public async exportData(data: object[]): Promise<Buffer> {
    const filteredData = data.map(data => {
      const formatData = this.formatData(omit(data, ["isDeleted"]));
      return formatData;
    });

    return await this.strategy.export(filteredData);
  }
  public getContentType(): string {
    return this.strategy.getContentType();
  }
  public getFileExtension(): string {
    return this.strategy.getFileExtension();
  }

  private formatData(data: object): object {
    const dataRecord = {} as Record<string, string | string[]>;
    Object.entries(data).forEach(([key, value]) => {
      if (isPrimitive(value) && !(value instanceof mongoose.Types.ObjectId)) {
        dataRecord[startCase(key)] = value;
      }
    });

    return dataRecord;
  }
}

const isPrimitive = (value: any): boolean => {
  return (
    (typeof value !== "object" && typeof value !== "function") ||
    value === null ||
    value === undefined
  );
};
