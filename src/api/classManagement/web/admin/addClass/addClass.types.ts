import { ClassDTO } from "../../../../../feature/classes/dto/Classes.dto";
import { AddClassValidation } from "./addClass.validation";

export type AddClassRouteConfig = AddClassValidation & { files: never };
export type AddClassResponse = ClassDTO;
