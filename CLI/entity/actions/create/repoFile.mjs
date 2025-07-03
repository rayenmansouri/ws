import { FEATURE_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createRepoFile = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = `
import { BaseRepo } from "../../../core/BaseRepo";
import { ${entityNameCapitalized}MetaData } from "./${entityName}.entity";

export abstract class ${entityNameCapitalized}Repo extends BaseRepo<${entityNameCapitalized}MetaData> {}
  `;

  fs.writeFileSync(
    path.join(FEATURE_DIRECTORY, featureName, "domain", `${entityNameCapitalized}.repo.ts`),
    content,
  );
};
