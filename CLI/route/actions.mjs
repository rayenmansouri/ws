import { Logger } from "../helpers/logger.mjs";
import { createRoute } from "./actions/create/create.mjs";
import { exportAllRoutes } from "./actions/export/exportAllRoutes.mjs";
import { renameRoute } from "./actions/rename/renameRoute.mjs";

export const executeRouteAction = async args => {
  const action = args.shift();

  switch (action) {
    case "create":
      createRoute(args);
      break;
    case "move":
      deleteRoute(args);
      break;
    case "rename":
      await renameRoute(args);
      break;
    case "export":
      exportAllRoutes();
      break;
    default:
      Logger.error(`Unknown action: ${action}`);
      process.exit(1);
  }
};
