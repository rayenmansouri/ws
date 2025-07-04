import { container } from "./container";
import { MongoCounterRepo } from "../../database/mongo/repositories/MongoCounter.repo";
import { MongoAdminRepo } from "../../database/mongo/repositories/MongoAdmin.repo";

export const registerUseRepos = (): void => {
  container.bind("CounterRepo").to(MongoCounterRepo);
  container.bind("AdminRepo").to(MongoAdminRepo);
};
