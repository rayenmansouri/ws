import { TutorialDto } from "../../../../../feature/tutorial/dtos/tutorial.dto";
import { GetTutorialValidation } from "./getTutorials.validation";

export type GetTutorialsRouteConfig = GetTutorialValidation & { files: never };
export type GetTutorialsResponse = TutorialDto[];
