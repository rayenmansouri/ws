import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubjectTypeRepo } from "../domains/SubjectType.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { SubjectType } from "../domains/subjectType.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteSubjectTypeUseCase {
  constructor(
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {}

  async execute(subjectTypeNewId: string): Promise<void> {
    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    await this.ensureSubjectTypeIsNotUsedInClassTypes(subjectType);
    await this.ensureSubjectTypeIsNotTaughtByTeachers(subjectType);

    await this.subjectTypesRepo.deleteOneById(subjectType._id);
  }

  private async ensureSubjectTypeIsNotUsedInClassTypes(subjectType: SubjectType): Promise<void> {
    const classTypeUsingSubjectType = await this.classTypeRepo.findManyBySubjectType(
      subjectType._id,
    );

    if (classTypeUsingSubjectType.length > 0) throw new BadRequestError("subjectType.isUsed");
  }

  private async ensureSubjectTypeIsNotTaughtByTeachers(subjectType: SubjectType): Promise<void> {
    const teacher = await this.teacherRepo.findManyBySubjectType(subjectType._id);

    if (teacher.length > 0) throw new BadRequestError("subjectType.isTaughtByTeacher");
  }
}
