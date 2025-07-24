import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class UpdateSubjectFromClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subjectNewId: string,
    data: Partial<{
      coefficient: number;
      exams: { examTypeNewId: string; coefficient: number }[];
    }>,
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectNewId,
      "notFound.subjectType",
    );

    const classGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new BadRequestError("notFound.subject");

    const updateSubject = classType.subjects.map(subject => {
      if (subject.subjectType != subjectType._id) return subject;
      return {
        ...subject,
        coefficient: data.coefficient ?? subject.coefficient,
      };
    });

    await this.classTypeRepo.updateOneById(classType._id, { subjects: updateSubject });
  }
}
