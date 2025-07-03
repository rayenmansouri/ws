import { DATABASE_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createSchemaFile = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = `
import { ${entityNameCapitalized} } from "../../../feature/${featureName}/domain/${entityName}.entity";
import { createMongoSchema } from "../createSchema";

export const mongo${entityNameCapitalized}Schema = createMongoSchema<${entityNameCapitalized}>({});
  `;

  fs.writeFileSync(path.join(DATABASE_DIRECTORY, "schemas", `${entityName}.schema.ts`), content);
};
