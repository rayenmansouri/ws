import fs from "fs";
import path from "path";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createTypesFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `import { TypedRequestOptions } from "../../core/express/types";

export type ${routeNameCapitalized}RouteConfig = TypedRequestOptions & {
  body: {
    // TODO: Add your request body types here
  };
  params: never;
  query: never;
  files: never;
};

export type ${routeNameCapitalized}Response = {
  // TODO: Add your response type here
};`;

  fs.writeFileSync(path.join(routePath, `${routeName}.types.ts`), content);
};
