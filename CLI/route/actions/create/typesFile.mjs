import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createTypesFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `
import { ${routeNameCapitalized}Validation } from "./${routeName}.validation";

export type ${routeNameCapitalized}RouteConfig = ${routeNameCapitalized}Validation & {files : never}
export type ${routeNameCapitalized}Response = void

  `;

  fs.writeFileSync(path.join(routePath, `${routeName}.types.ts`), content);
};
