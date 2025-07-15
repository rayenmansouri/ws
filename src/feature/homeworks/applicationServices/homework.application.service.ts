import { injectable } from "inversify";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { HomeworkService } from "../domain/Homework.service";
import { inject } from "../../../core/container/TypedContainer";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { Parent } from "../../parents/domain/parent.entity";
import { Role } from "../../authorization/domain/role.entity";

@injectable()
export class HomeworkApplicationService {
  constructor(@inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo) {}

  async isUserAllowedToViewHomework(
    userDetails: { user: Omit<BaseUser, "roles"> & { roles: Role[] }; type: TEndUserEnum },
    homework: { class: ID | null; group: ID | null; teacher: ID | null },
    schoolYears: ID[],
  ): Promise<boolean> {
    switch (userDetails.type) {
      case END_USER_ENUM.ADMIN:
        return HomeworkService.isAdminAllowedToViewHomework();

      case END_USER_ENUM.TEACHER:
        return HomeworkService.isTeacherAllowedToViewHomework(userDetails.user._id, homework);

      case END_USER_ENUM.STUDENT:
        const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
          [userDetails.user._id],
          schoolYears,
        );
        return studentProfiles.some(studentProfile =>
          HomeworkService.isStudentAllowedToViewHomework(studentProfile, homework),
        );

      case END_USER_ENUM.PARENT:
        const parent = userDetails.user as unknown as Parent;
        const parentStudentProfiles =
          await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
            parent.students,
            schoolYears,
          );
        return HomeworkService.isParentAllowedToViewHomework(parentStudentProfiles, homework);

      default:
        return false;
    }
  }
}
