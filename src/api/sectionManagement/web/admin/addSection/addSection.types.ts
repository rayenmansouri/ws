import { Section } from "../../../../../feature/sections/domain/section.entity";
import { AddSectionValidation } from "./addSection.validation";

export type AddSectionRouteConfig = AddSectionValidation & { files: never };
export type AddSectionResponse = Section;
