import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "../domains/ClassType.service";
import { SubjectOfClassType } from "../repo/classType.entity";

@injectable()
export class ReorderSubjectInClassTypeUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string, oldRank: number, newRank: number): Promise<void> {
    if (oldRank === newRank) return;

    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    if (newRank >= classType.subjects.length) throw new BadRequestError("invalid.newRank");

    const subject = classType.subjects[oldRank] as SubjectOfClassType | undefined;

    if (!subject) throw new NotFoundError("notFound.subject");

    const newClassTypeSubjects = ClassTypeService.reorderArray(
      classType.subjects,
      oldRank,
      newRank,
    );

    await this.classTypeRepo.updateOneById(classType._id, { subjects: newClassTypeSubjects });
  }
}
