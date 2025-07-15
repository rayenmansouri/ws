import { EntityDto } from "../../entity/dto/entity.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type SubjectOfClassDto = {
  subjectType: EntityDto;
  coefficient: number;
  hasSubSubjects: boolean;
  teacher: UserProfileDTO | null;
  subSubjects: {
    subSubjectType: EntityDto;
    coefficient: number;
    teacher: UserProfileDTO | null;
  }[];
};
