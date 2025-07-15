import { Section } from "../../../../../feature/sections/domain/section.entity";
import { SectionDto } from "../../../../../feature/sections/dtos/section.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSectionsValidation } from "./listSections.validation";

export type ListSectionsRouteConfig = ListSectionsValidation & { files: never };
export type ListSectionsResponse = ResponseWithPagination<SectionDto>;
