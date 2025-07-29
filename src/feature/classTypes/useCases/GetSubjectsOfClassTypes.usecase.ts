import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassTypeMapper } from "../mappers/classType.mapper";
import { SubjectOfClassTypeDTO } from "../dtos/classType.dto";

@injectable()
export class GetSubjectsOfClassTypesUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string): Promise<SubjectOfClassTypeDTO[]> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      {
        populate: ["subjects.subjectType", "subjects.subSubjects.subSubjectType"],
      },
    );

    const subjects = classType.subjects.map((subject, i) => ({ ...subject, rank: i }));

    return subjects.map(subject => ClassTypeMapper.toSubjectOfClassTypeDTO(subject));
  }
}
