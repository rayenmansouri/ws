import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { CONTAINER_REGISTRY_PATH, PROJECT_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const registerRepoToContainerRegistry = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = readFileSync(CONTAINER_REGISTRY_PATH, "utf8");

  const newContent = content.replace(
    "//repos",
    `//repos  
  ${entityNameCapitalized}Repo: ${entityNameCapitalized}Repo;`,
  );

  writeFileSync(
    join(PROJECT_DIRECTORY, "src", "core", "container", "containerRegistry.ts"),
    `import { ${entityNameCapitalized}Repo } from "../../feature/${featureName}/domain/${entityNameCapitalized}.repo";
${newContent}`,
  );
};
