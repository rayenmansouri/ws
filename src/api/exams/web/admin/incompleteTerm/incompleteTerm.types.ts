import { IncompleteTermValidation } from "./incompleteTerm.validation";

export type IncompleteTermRouteConfig = IncompleteTermValidation & { files: never };
export type IncompleteTermResponse = void;
