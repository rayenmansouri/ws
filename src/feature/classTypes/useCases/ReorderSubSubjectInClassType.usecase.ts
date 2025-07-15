import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeService } from "../domains/ClassType.service";
import { SubjectOfClassType, SubSubjectOfClassType } from "../repo/classType.entity";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class ReorderSubSubjectInClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypRepo: SubjectTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subjectTypeNewId: string,
    oldRank: number,
    newRank: number,
  ): Promise<void> {
    if (oldRank === newRank) return;

    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    const subjectType = await this.subjectTypRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new NotFoundError("notFound.subject");
    const hasSubSubjects = subject.subSubjects.length > 0;
    if (!hasSubSubjects) throw new NotFoundError("invalid.subjectType");

    const subSubjects = subject.subSubjects[oldRank] as SubSubjectOfClassType | undefined;
    if (newRank >= subject.subSubjects.length) throw new BadRequestError("invalid.newRank");
    if (!subSubjects) throw new NotFoundError("notFound.subSubjectType");

    const newClassTypeSubSubjects = ClassTypeService.reorderArray(
      subject.subSubjects,
      oldRank,
      newRank,
    );

    const newSubjectToBeUpdate = {
      ...subject,
      subSubjects: newClassTypeSubSubjects,
    };
    const updatedSubjects = classType.subjects.map(subject => {
      if (subject.subjectType === subjectType._id) return newSubjectToBeUpdate;
      return subject;
    });

    await this.classTypeRepo.updateOneById(classType._id, { subjects: updatedSubjects });
  }
}
