import { readFileSync, writeFileSync } from "fs";
import { USE_CASE_CONTAINER_PATH } from "../../constants.mjs";
import { capitalizeFirstLetter } from "../../helpers/string.mjs";

export const addUseCaseToContainer = (useCaseName, useCasePath) => {
  const useCaseCapitalized = capitalizeFirstLetter(useCaseName);
  const useCaseVariable = `${useCaseCapitalized}UseCase`;

  const content = readFileSync(USE_CASE_CONTAINER_PATH, "utf8");

  let newContent = content.replace(
    "export const registerUseCases = (): void => {",
    `export const registerUseCases = (): void => {  
  container.bind("${useCaseVariable}").to(${useCaseVariable});`,
  );

  newContent = newContent.replace(
    `import { container } from './container';`,
    `import { container } from './container';
import { ${useCaseVariable} } from "${useCasePath}"`,
  );

  writeFileSync(USE_CASE_CONTAINER_PATH, newContent);
};
