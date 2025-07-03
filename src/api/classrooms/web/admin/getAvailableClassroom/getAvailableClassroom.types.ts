import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { GetAvailableClassroomValidation } from "./getAvailableClassroom.validation";

export type GetAvailableClassroomRouteConfig = GetAvailableClassroomValidation & { files: never };
export type GetAvailableClassroomResponse = EntityDto[];
