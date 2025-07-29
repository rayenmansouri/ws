import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class AddSubSubjectToClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subjectTypeNewId: string,
    data: {
      subSubjectTypeNewId: string;
      exams: { examTypeNewId: string; coefficient: number }[];
      coefficient: number;
    },
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const classAlreadyGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classAlreadyGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new BadRequestError("classType.subjectTypeNotFound");

    const subSubjectType = await this.subSubjectTypeRepo.findOneByNewIdOrThrow(
      data.subSubjectTypeNewId,
      "notFound.subSubjectType",
    );

    const subSubjectIds = classType.subjects.flatMap(subject =>
      subject.subSubjects.map(subject => subject.subSubjectType),
    );

    const isSubSubjectAlreadyUsed = subSubjectIds.includes(subSubjectType._id);

    if (isSubSubjectAlreadyUsed) throw new BadRequestError("classType.subSubjectTypeAlreadyUsed");

    const subSubjectToClassTypeToAdd: (typeof classType.subjects)[0]["subSubjects"][0] = {
      subSubjectType: subSubjectType._id,
      coefficient: data.coefficient,
    };

    if (data.exams.length === 0) {
      await this.classTypeRepo.addSubSubjectToClassType(
        classType._id,
        subject.subjectType,
        subSubjectToClassTypeToAdd,
      );
      return;
    }

    await this.classTypeRepo.addSubSubjectToClassType(classType._id, subject.subjectType, {
      ...subSubjectToClassTypeToAdd,
    });
  }
}
