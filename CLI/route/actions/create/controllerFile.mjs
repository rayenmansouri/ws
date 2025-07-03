import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createControllerFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ${routeNameCapitalized}RouteConfig , ${routeNameCapitalized}Response } from "./${routeName}.types";

@Controller()
export class ${routeNameCapitalized}Controller extends BaseController<${routeNameCapitalized}RouteConfig> {
  constructor(
  ) {
    super();
  }

  async main(req: TypedRequest<${routeNameCapitalized}RouteConfig>): Promise<void | APIResponse> {
    return new SuccessResponse<${routeNameCapitalized}Response>("");
  }
}

  `;

  fs.writeFileSync(path.join(routePath, `${routeName}.controller.ts`), content);
};
