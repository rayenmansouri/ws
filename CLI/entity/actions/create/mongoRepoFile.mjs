import { DATABASE_DIRECTORY, FEATURE_DIRECTORY } from "../../../constants.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const createMongoRepoFile = (entityName, featureName) => {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  const content = `
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ${entityNameCapitalized}MetaData } from "../../../feature/${featureName}/domain/${entityName}.entity";
import { ${entityNameCapitalized}Repo } from "../../../feature/${featureName}/domain/${entityNameCapitalized}.repo";
import { MongoBaseRepo } from "./MongoBase.repo";

export class Mongo${entityNameCapitalized}Repo extends MongoBaseRepo<${entityNameCapitalized}MetaData> implements ${entityNameCapitalized}Repo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "${entityName}", session);
  }
}
  `;

  fs.writeFileSync(
    path.join(DATABASE_DIRECTORY, "repositories", `Mongo${entityNameCapitalized}.repo.ts`),
    content,
  );
};
