import { API_DIRECTORY } from "../../../constants.mjs";
import { findDirectoriesByName } from "../../../helpers/fileSystem.mjs";
import * as fs from "fs";
import { Logger } from "../../../helpers/logger.mjs";
import pkg from "lodash";
const { upperFirst } = pkg;

export const renameRoute = async args => {
  const oldRouteName = args.shift();
  const newRouteName = args.shift();

  if (!oldRouteName) {
    Logger.error("Old route name is required");
    process.exit(1);
  }

  if (!newRouteName) {
    Logger.error("New route name is required");
    process.exit(1);
  }
  const isNewRouteNameExist = findDirectoriesByName(API_DIRECTORY, newRouteName).length > 0;

  if (isNewRouteNameExist) {
    Logger.error(`Route with name "${newRouteName}" already exists`);
    process.exit(1);
  }

  const paths = findDirectoriesByName(API_DIRECTORY, oldRouteName);

  const path = paths[0];

  if (!path) {
    Logger.error(`Route with name "${oldRouteName}" does not exist`);
    process.exit(1);
  }

  const dirFiles = fs.readdirSync(path);

  const newPath = path.replace(oldRouteName, newRouteName);

  const newFiles = dirFiles.map(file => {
    return file.replace(oldRouteName, newRouteName);
  });

  const newFilesPaths = newFiles.map(file => {
    return newPath + "/" + file;
  });

  await fs.promises.rename(path, newPath);

  const currentFilesPaths = dirFiles.map(file => {
    return newPath + "/" + file;
  });

  await Promise.all(
    currentFilesPaths.map((oldFilePath, index) =>
      fs.promises.rename(oldFilePath, newFilesPaths[index]),
    ),
  );

  const routeRenameMappings = {
    [`${oldRouteName}Response`]: `${newRouteName}Response`,
    [`${upperFirst(oldRouteName)}Response`]: `${upperFirst(newRouteName)}Response`,
    [`${upperFirst(oldRouteName)}RouteConfig`]: `${upperFirst(newRouteName)}RouteConfig`,
    [`${upperFirst(oldRouteName)}Controller`]: `${upperFirst(newRouteName)}Controller`,
    [`${oldRouteName}Validation`]: `${newRouteName}Validation`,
    [`${oldRouteName}Validation.query`]: `${newRouteName}Validation.query`,
    [`${oldRouteName}Validation.body`]: `${newRouteName}Validation.body`,
    [`${oldRouteName}Validation.params`]: `${newRouteName}Validation.params`,
    [`${upperFirst(oldRouteName)}Validation`]: `${upperFirst(newRouteName)}Validation`,
    [`${oldRouteName}.controller`]: `${newRouteName}.controller`,
    [`${oldRouteName}.validation`]: `${newRouteName}.validation`,
    [`${oldRouteName}.types`]: `${newRouteName}.types`,
  };

  for (const file of newFilesPaths) {
    let content = await fs.promises.readFile(file, "utf8");

    for (const [oldName, newName] of Object.entries(routeRenameMappings)) {
      content = content.replaceAll(oldName, newName);
    }

    await fs.promises.writeFile(file, content, "utf8");
  }
};
