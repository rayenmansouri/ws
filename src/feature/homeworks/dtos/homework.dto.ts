import { THomeworkStatusEnum } from "../../../features/homework/constants/shared/addHomework.constants";
import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type HomeworkDTO = {
  _id: ID;
  newId: string;
  name: string;
  description: string | null;
  teacher: UserProfileDTO | null;
  subjectType: EntityDto | null;
  subSubjectType: EntityDto | null;
  group: EntityDto | null;
  groupType: EntityDto | null;
  class: EntityDto | null;
  classGroup: EntityDto | null;
  files: IFile[];
  status: THomeworkStatusEnum;
  dueDate: Date;
  createdAt: Date;
};
