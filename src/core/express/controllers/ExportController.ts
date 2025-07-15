import { Response } from "express";
import { FilesInRequest } from "../../../types/app-request";
import { ExportTableContext } from "../../export/export.context";
import { getExportStrategy } from "../../export/getExportStrategy";
import { APIResponse } from "../../responseAPI/APIResponse";
import { TypedRequest } from "../types";
import { BaseController } from "./BaseController";

export type ExportTypeRequestOptions = {
  body: unknown;
  params: unknown;
  query: { export?: string; page?: number; limit?: number };
  files: FilesInRequest<string> | never;
};

export abstract class BaseExportController<
  Options extends ExportTypeRequestOptions,
  ResponseType extends APIResponse["data"],
> extends BaseController<Options> {
  async handle(req: TypedRequest<Options>, res: Response): Promise<APIResponse | void> {
    if (req.query.export) {
      delete req.query.page;
      delete req.query.limit;
      const response = await this.main(req, res);

      const strategy = getExportStrategy(req.query.export);

      const context = new ExportTableContext(strategy);

      const data = this.formatDataBeforeExport(response.data);

      const buffer = await context.exportData(data);

      const ContentType = context.getContentType();

      const extension = context.getFileExtension();

      res.setHeader("Content-Type", ContentType);
      res.setHeader("Content-Disposition", `attachment; file=file.${extension}`);
      res.send(buffer);
      return;
    }

    const response = await this.main(req, res);
    return response;
  }

  abstract formatDataBeforeExport(data: ResponseType): Array<Record<string, string>>;

  abstract main(req: TypedRequest<Options>, res: Response): Promise<APIResponse>;
}
