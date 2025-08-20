import fs from "fs";
import path from "path";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createValidationFile = (routeName, routePath) => {
  const routeNameCapitalized = capitalizeFirstLetter(routeName);

  const content = `import { z } from "zod";

const ${routeName} = z.object({
    // TODO: Add your validation schema here
    // Example: name: z.string().min(1, "Name is required"),
});

type T${routeNameCapitalized} = z.infer<typeof ${routeName}>;

export type ${routeNameCapitalized}Validation = {
    body: T${routeNameCapitalized};
    params: never;
    query: never;
};

export const ${routeName}Validation = {
    ${routeName},
};`;

  fs.writeFileSync(path.join(routePath, `${routeName}.validation.ts`), content);
};
