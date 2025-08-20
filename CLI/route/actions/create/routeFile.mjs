import fs from "fs";
import path from "path";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createRouteFile = (routeName, userType, platform, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { ${routeNameCapitalized}Controller } from "./${routeName}.controller";
import { ${routeNameCapitalized}RouteConfig } from "./${routeName}.types";
import { ${routeName}Validation } from "./${routeName}.validation";

registerRoute<${routeNameCapitalized}RouteConfig>()({
    path: "/${routeName}",
    method: "post", 
    endUser: END_USER_ENUM.${userType.toUpperCase()},
    bodySchema: ${routeName}Validation.${routeName},
    authorization: {
        action: ACTION_ENUM.ADD,
        resource: RESOURCES_ENUM.USER
    },
    controller: ${routeNameCapitalized}Controller,
    isTransactionEnabled: false,
    platform: "${platform}",
    middlewaresClasses: getAuthorizedMiddlewares()
});`;

  fs.writeFileSync(path.join(routePath, `${routeName}.route.ts`), content);
};
