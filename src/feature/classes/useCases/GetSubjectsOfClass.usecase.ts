import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GetSubjectsOfClassTypesUseCase } from "../../classTypes/useCases/GetSubjectsOfClassTypes.usecase";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { ClassRepo } from "../domain/Class.repo";
import { SubjectOfClassDto } from "../dto/SubjectOfClass.dto";
import { SubjectOfClassMapper } from "../mappers/SubjectOfClass.mapper";

type GetSubjectsOfClassUseCaseParams = {
  classNewId: string;
};

@injectable()
export class GetSubjectsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GetSubjectsOfClassTypesUseCase")
    private getSubjectsOfClassTypesUseCase: GetSubjectsOfClassTypesUseCase,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {}

  async execute(params: GetSubjectsOfClassUseCaseParams): Promise<SubjectOfClassDto[]> {
    const { classNewId } = params;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["classType"],
    });

    const subjectsOfClassType = await this.getSubjectsOfClassTypesUseCase.execute(
      classDoc.classType.newId,
    );

    const topicTeacherMap = { ...classDoc.subjectTeacherMap, ...classDoc.subSubjectTeacherMap };
    const teacherIds = Object.values(topicTeacherMap).filter(teacherId => teacherId != null);
    const teacherDocs = await this.teacherRepo.findManyByIds(teacherIds);

    const teacherSubjects = subjectsOfClassType.map(subject => {
      return SubjectOfClassMapper.toSubjectOfClassDto(subject, topicTeacherMap, teacherDocs);
    });

    return teacherSubjects;
  }
}
