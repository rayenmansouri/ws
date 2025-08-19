import { ReplaceDatesWithStrings } from "./utils";
import { OrganizationSystemType as OrganizationSystemTypeEnum } from "../src/feature/organization-magement/enums";
export * from "./routes";

export type OrganizationSystemType = ReplaceDatesWithStrings<OrganizationSystemTypeEnum>;
