import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class AddSubjectToClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    data: {
      subjectTypeNewId: string;
      exams?: { examTypeNewId: string; coefficient: number }[];
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
      data.subjectTypeNewId,
      "notFound.subjectType",
    );

    const subjectOfClassTypeIds = classType.subjects.map(subject => subject.subjectType);

    const isSubjectAlreadyUsed = subjectOfClassTypeIds.includes(subjectType._id);

    if (isSubjectAlreadyUsed) throw new BadRequestError("classType.subjectTypeAlreadyUsed");

    const subjectToClassTypePayload = {
      subjectType: subjectType._id,
      coefficient: data.coefficient,
      subSubjects: [],
      exams: [],
    };

    if (!data.exams) {
      await this.classTypeRepo.addSubjectToClassType(classType._id, subjectToClassTypePayload);
      return;
    }

    await this.classTypeRepo.addSubjectToClassType(classType._id, {
      ...subjectToClassTypePayload,
    });

    await this.classRepo.addSubjectType(classType._id, subjectType._id);
  }
}
