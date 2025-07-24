import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassType } from "../repo/classType.entity";

@injectable()
export class UpdateSubSubjectOfClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypesRepo: SubSubjectTypesRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subSubjectNewId: string,
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

    const classGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );
    if (classGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subSubjectType = await this.subSubjectTypesRepo.findOneByNewIdOrThrow(
      subSubjectNewId,
      "notFound.subSubjectType",
    );
    const subject = classType.subjects.find(subject =>
      subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectType._id),
    );
    if (!subject) throw new BadRequestError("notFound.subject");
    const subSubject = subject.subSubjects.find(
      subSubject => subSubject.subSubjectType === subSubjectType._id,
    );
    if (!subSubject) throw new BadRequestError("notFound.subSubject");

    if (!data.exams) {
      if (data.coefficient != undefined)
        await this.updateSubjectCoefficient(classType, subSubjectType, data.coefficient);
      return;
    }

    const subjects = classType.subjects.map(subject => {
      const subSubjects = subject.subSubjects.map(subSubject => {
        if (subSubject.subSubjectType != subSubjectType._id) return subSubject;

        return {
          ...subSubject,
          coefficient: data.coefficient ?? subSubject.coefficient,
        };
      });
      return { ...subject, subSubjects, coefficient: data.coefficient ?? subject.coefficient };
    });

    await this.classTypeRepo.updateOneById(classType._id, {
      subjects,
    });
  }

  private async updateSubjectCoefficient(
    classType: Pick<ClassType, "subjects" | "_id">,
    subSubjectType: SubSubjectType,
    coefficient: number,
  ): Promise<void> {
    const subjects = classType.subjects.map(subject => {
      const subSubjects = subject.subSubjects.map(subSubject => {
        if (subSubject.subSubjectType === subSubjectType._id) {
          return { ...subSubject, coefficient };
        }
        return subSubject;
      });
      return { ...subject, subSubjects };
    });
    await this.classTypeRepo.updateOneById(classType._id, {
      subjects,
    });
  }
}
