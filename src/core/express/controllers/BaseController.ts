import { Response } from "express";
import { APIResponse } from "../../responseAPI/APIResponse";
import { TypedRequest, TypedRequestOptions } from "../types";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController<Options extends TypedRequestOptions> {
  async handle(req: TypedRequest<Options>, res: Response): Promise<void | APIResponse> {
    const response = await this.main(req, res);

    return response;
  }

  abstract main(req: TypedRequest<Options>, res: Response): Promise<void | APIResponse>;
}
