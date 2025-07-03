import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createValidationFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `
import { z } from 'zod';

const body = z.object({});
type TBody = z.infer<typeof body>;

const params = z.object({});
type TParams = z.infer<typeof params>;

const query = z.object({});
type TQuery = z.infer<typeof query>;

export type ${routeNameCapitalized}Validation = {
  body: TBody;
  params: TParams;
  query: TQuery;
};

export const ${routeName}Validation = {
  body,
  params,
  query,
};
  `;

  fs.writeFileSync(path.join(routePath, `${routeName}.validation.ts`), content);
};
