import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createRouteFile = (routeName, userType, platform, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `
  import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
  import { END_USER_ENUM } from "../../../../../constants/globalEnums";
  import { registerRoute } from "../../../../../core/express/registerRoute";
  import { ${routeNameCapitalized}Controller } from "./${routeName}.controller";
  import { ${routeNameCapitalized}RouteConfig } from "./${routeName}.types";
  import { ${routeName}Validation } from "./${routeName}.validation";

  registerRoute<${routeNameCapitalized}RouteConfig>()({
    path: "/path",
    method: "post",
    endUser: END_USER_ENUM.${userType.toUpperCase()},
    bodySchema: ${routeName}Validation.body,
    querySchema: ${routeName}Validation.query,
    paramSchema: ${routeName}Validation.params,
    authorization: { action: ACTION_ENUM.CHANGE_ME, resource: RESOURCES_ENUM.CHANGE_ME },
    controller: ${routeNameCapitalized}Controller,
    isTransactionEnabled: false,
    platform: "${platform}",
  });
  `;

  fs.writeFileSync(path.join(routePath, `${routeName}.route.ts`), content);
};
