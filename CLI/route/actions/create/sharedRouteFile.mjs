import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createSharedRouteFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `
  import { END_USER_ENUM } from "../../../../../constants/globalEnums";
  import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
  import { ${routeNameCapitalized}Controller } from "./${routeName}.controller";
  import { ${routeNameCapitalized}RouteConfig } from "./${routeName}.types";
  import { ${routeName}Validation } from "./${routeName}.validation";

  registerSharedRoute<${routeNameCapitalized}RouteConfig>()({
    path: "/path",
    method: "post",
    bodySchema: ${routeName}Validation.body,
    querySchema: ${routeName}Validation.query,
    paramSchema: ${routeName}Validation.params,
    controller: ${routeNameCapitalized}Controller,
    isTransactionEnabled: false,
  },
  [
  {
    endUser : END_USER_ENUM.ADMIN,
    platforms: ["web"]
  }
  ]);
  `;

  fs.writeFileSync(path.join(routePath, `${routeName}.route.ts`), content);
};
