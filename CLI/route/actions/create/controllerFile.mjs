import fs from "fs";
import path from "path";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createControllerFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { ${routeNameCapitalized}Response, ${routeNameCapitalized}RouteConfig } from "./${routeName}.types";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";

@Injectable({
  identifier: "${routeNameCapitalized}Controller",
})
export class ${routeNameCapitalized}Controller extends BaseController<${routeNameCapitalized}RouteConfig> {
  constructor(
    // Add your repository injections here
    // Example: @inject(REPOSITORY_IDENTIFIER) private repo: Repository,
  ) {
    super();
  }

  async main(req: TypedRequest<${routeNameCapitalized}RouteConfig>): Promise<void | APIResponse> {
    // TODO: Implement your logic here
    
    return new SuccessResponse<${routeNameCapitalized}Response>("global.success", {});
  }
}`;

  fs.writeFileSync(path.join(routePath, `${routeName}.controller.ts`), content);
};
