import { Logger } from "../helpers/logger.mjs";
import { createEntity } from "./actions/create/create.mjs";

export const executeEntityActions = async args => {
  const action = args.shift();

  switch (action) {
    case "create":
      await createEntity(args);
      break;
    default:
      Logger.error(`Unknown action: ${action}`);
      process.exit(1);
  }
};
