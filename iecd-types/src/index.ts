export {
  ACTION_ENUM,
  RESOURCES_ENUM,
  TActionsEnum,
  TResourcesEnum,
} from "../../src/constants/ActionsResource";
export type { PaginationMeta } from "../../src/newDatabase/mongo/types";
export type { TEndUserEnum } from "../../src/constants/globalEnums";
export * from "./autoExport/index";
// Export all types from old-types.ts
export * from "./old-types";

export type ID = string & { _isID: true };

export { FileDTO } from "../../src/core/valueObjects/File.vo";
