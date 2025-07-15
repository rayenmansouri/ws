import { EntityDto } from "../../entity/dto/entity.dto";
import { BaseListUserDTO } from "../../users/dtos/BaseListUser.dto";

export type TeacherDTO = BaseListUserDTO & {
  levels: EntityDto[];
  groupTypes: EntityDto[];
  subjectTypes: EntityDto[];
  roles: EntityDto[];
  topics: EntityDto[];
};
