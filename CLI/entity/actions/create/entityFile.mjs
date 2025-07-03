import { FEATURE_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createEntityFile = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = `
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type ${entityNameCapitalized} = {} & BaseEntity;

export type ${entityNameCapitalized}MetaData = GenerateMetaData<${entityNameCapitalized}>;
  `;

  fs.writeFileSync(
    path.join(FEATURE_DIRECTORY, featureName, "domain", `${entityName}.entity.ts`),
    content,
  );
};
