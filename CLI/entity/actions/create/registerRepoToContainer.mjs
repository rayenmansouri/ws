import { readFileSync, writeFileSync } from "fs";
import { REPO_CONTAINER_PATH } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const registerRepoToContainer = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = readFileSync(REPO_CONTAINER_PATH, "utf8");

  let newContent = content.replace(
    "export const registerUseRepos = (): void => {",
    `export const registerUseRepos = (): void => {  
container.bind("${entityNameCapitalized}Repo").to(Mongo${entityNameCapitalized}Repo);`
  );

  newContent = newContent.replace(
    `import { container } from "./container";`,
    `import { container } from "./container";
import { Mongo${entityNameCapitalized}Repo } from "../../database/mongo/repositories/Mongo${entityNameCapitalized}.repo";`
  );

  writeFileSync(REPO_CONTAINER_PATH, newContent);
};
