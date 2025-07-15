import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { School } from "../../schools/domain/school.entity";
import { CentralUserRepo } from "../../users/domain/CentralUser.repo";
import {
  BaseUpdateUserUseCase,
  UpdateBaseUserRequest,
} from "../../users/useCases/BaseUpdateUser.usecase";
import { StudentApplicationService } from "../application/Student.application.service";
import { Student } from "../domain/student.entity";
import { StudentRepo } from "../domain/Student.repo";
import { StudentProfileRepo } from "../domain/StudentProfile.repo";

export type UpdateStudentRequest = {
  nextClassType?: ID;
  level?: ID;
  classType?: ID;
  parents?: ID[];
  uniqueId?: string | null;
} & UpdateBaseUserRequest;

@injectable()
export class UpdateStudentUseCase extends BaseUpdateUserUseCase<UpdateStudentRequest, Student> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("CentralUserRepo") centralUserRepo: CentralUserRepo,
  ) {
    super(fileManager, END_USER_ENUM.STUDENT, school, centralUserRepo);
  }

  protected async findUserByNewId(newId: string): Promise<Student> {
    return await this.studentRepo.findOneByNewIdOrThrow(newId, "notFound.student");
  }

  protected async updateUserInDB(
    student: Student,
    updatePayload: Partial<Student>,
  ): Promise<Student> {
    const updatedStudent = (await this.studentRepo.updateOneById(student._id, updatePayload))!;

    return updatedStudent;
  }

  protected async preUpdateUser(
    student: Student,
    userDetails: UpdateStudentRequest,
  ): Promise<void> {
    if (userDetails.uniqueId && userDetails.uniqueId !== student.uniqueId)
      await this.studentRepo.ensureFieldUniqueness(
        "uniqueId",
        userDetails.uniqueId,
        "alreadyUsed.uniqueId",
      );

    const { classId, studentProfile } =
      await this.studentApplicationService.getCurrentAcademicDetails(student);

    if (userDetails.level && userDetails.level.toString() !== student.level.toString()) {
      const level = await this.levelRepo.findOneByIdOrThrow(userDetails.level, "notFound.level");

      if (
        !userDetails.classType ||
        userDetails.classType.toString() === student.classType.toString()
      )
        throw new BadRequestError("classTypeRules.classTypeAndLevelAreNotValid");

      if (classId) throw new BadRequestError("student.cannotChangeLevelWhenAssignedToClass");

      await this.studentProfileRepo.updateOneById(studentProfile._id, {
        schoolYear: level.currentSchoolYear._id,
      });
    }

    if (
      userDetails.classType &&
      userDetails.classType.toString() !== student.classType.toString()
    ) {
      const classType = await this.classTypeRepo.findOneByIdOrThrow(
        userDetails.classType,
        "notFound.classType",
        { populate: ["subLevel"] },
      );

      if (classId) throw new BadRequestError("student.cannotChangeClassTypeWhenAssignedToClass");

      const level = await this.levelRepo.findOneByIdOrThrow(
        userDetails.level || student.level,
        "notFound.level",
      );

      if (classType.subLevel.level._id !== level._id)
        throw new BadRequestError("classTypeRules.classTypeAndLevelAreNotValid");
    }

    if (userDetails.parents) {
      const newParentIds = userDetails.parents;

      const parentIdsToAdd = newParentIds.filter(parentId => !student.parents.includes(parentId));

      const parentIdsToRemove = student.parents.filter(
        parentId => !newParentIds.includes(parentId),
      );

      if (parentIdsToAdd.length > 0) {
        const parents = await this.parentRepo.findManyByIdsOrThrow(
          parentIdsToAdd,
          "notFound.parent",
        );
        await this.studentApplicationService.assignStudentsToParents([student], parents);
      }

      if (parentIdsToRemove.length > 0) {
        const parents = await this.parentRepo.findManyByIdsOrThrow(
          parentIdsToRemove,
          "notFound.parent",
        );
        await this.studentApplicationService.unassignStudentsFromParents([student], parents);
      }
    }
  }

  protected async postUpdateUser(): Promise<void> {}
}
