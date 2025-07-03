import { readFileSync, writeFileSync } from "fs";
import { CONTAINER_REGISTRY_PATH } from "../../constants.mjs";
import { capitalizeFirstLetter } from "../../helpers/string.mjs";

export const addUseCaseToContainerRegistry = (useCaseName, useCasePath) => {
  const useCaseCapitalized = capitalizeFirstLetter(useCaseName);
  const useCaseVariable = `${useCaseCapitalized}UseCase`;

  const content = readFileSync(CONTAINER_REGISTRY_PATH, "utf8");

  let newContent = content.replace(
    "// use cases",
    `// use cases  
  ${useCaseVariable}: ${useCaseVariable};`,
  );

  newContent = newContent.replace(
    `import "reflect-metadata";`,
    `import "reflect-metadata";
import { ${useCaseVariable} } from "${useCasePath}"`,
  );

  writeFileSync(CONTAINER_REGISTRY_PATH, newContent);
};
