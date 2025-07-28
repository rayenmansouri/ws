import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { School } from "../../schools/domain/school.entity";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import {
  BaseUpdateUserUseCase,
  UpdateBaseUserRequest,
} from "../../users/useCases/BaseUpdateUser.usecase";
import { Parent } from "../domain/parent.entity";
import { ParentRepo } from "../domain/Parent.repo";

export type UpdateParentRequest = {
  students?: ID[];
  nationalCardId?: string | null;
} & UpdateBaseUserRequest;

@injectable()
export class UpdateParentUseCase extends BaseUpdateUserUseCase<UpdateParentRequest, Parent> {
  constructor(
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
  ) {
    super(fileManager, END_USER_ENUM.PARENT, school);
  }

  protected async findUserByNewId(newId: string): Promise<Parent> {
    return await this.parentRepo.findOneByNewIdOrThrow(newId, "notFound.parent");
  }

  protected async updateUserInDB(parent: Parent, updatePayload: Partial<Parent>): Promise<Parent> {
    const updatedParent = (await this.parentRepo.updateOneById(parent._id, updatePayload))!;
    return updatedParent;
  }

  protected async preUpdateUser(parent: Parent, userDetails: UpdateParentRequest): Promise<void> {
    if (userDetails.nationalCardId && userDetails.nationalCardId !== parent.nationalCardId)
      await this.parentRepo.ensureFieldUniqueness(
        "nationalCardId",
        userDetails.nationalCardId,
        "alreadyUsed.nationalCardId",
      );

    if (userDetails.students) {
      const newStudentIds = userDetails.students;

      const studentIdsToAdd = newStudentIds.filter(
        studentId => !parent.students.includes(studentId),
      );

      const studentIdsToRemove = parent.students.filter(
        studentId => !newStudentIds.includes(studentId),
      );

      if (studentIdsToAdd.length > 0) {
        const students = await this.studentRepo.findManyByIdsOrThrow(
          studentIdsToAdd,
          "notFound.student",
        );
        await this.studentApplicationService.assignStudentsToParents(students, [parent]);
      }

      if (studentIdsToRemove.length > 0) {
        const students = await this.studentRepo.findManyByIdsOrThrow(
          studentIdsToRemove,
          "notFound.student",
        );
        await this.studentApplicationService.unassignStudentsFromParents(students, [parent]);
      }
    }
  }

  protected async postUpdateUser(): Promise<void> {}
}
