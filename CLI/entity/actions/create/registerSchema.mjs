import { readFileSync, writeFileSync } from "fs";
import { DATABASE_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";
import { join } from "path";

export const registerSchema = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = readFileSync(join(DATABASE_DIRECTORY, "schemas", "allMongoSchemas.ts"), "utf8");

  const newContent = content.replace(
    "} as const;",
    `  ${entityName}: mongo${entityNameCapitalized}Schema,
} as const;`,
  );

  writeFileSync(
    join(DATABASE_DIRECTORY, "schemas", "allMongoSchemas.ts"),
    `import { mongo${entityNameCapitalized}Schema } from "./${entityName}.schema";
${newContent}`,
  );
};
