import { inject, injectable } from "inversify/lib/inversify";
import { GetSubjectTypesOfClassUseCase } from "../../classes/useCases/GetSubjectTypesOfClass.usecase";
import { GetGroupsOfStudentUseCase } from "../../groupManagement/useCases/GetGroupsOfStudent.usecase";
import { GetTeachersOfStudentUseCase } from "../../teachers/useCases/GetTeachersOfStudent.usecase";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { DocumentFilterDto } from "../dtos/document.dto";
import { DocumentMapper } from "../mappers/document.mapper";

@injectable()
export class GetStudentDocumentsQueryUseCase {
  constructor(
    @inject("GetGroupsOfStudentUseCase")
    private getGroupsOfStudentUseCase: GetGroupsOfStudentUseCase,
    @inject("GetTeachersOfStudentUseCase")
    private getTeachersOfStudentUseCase: GetTeachersOfStudentUseCase,
    @inject("GetSubjectTypesOfClassUseCase")
    private GetSubjectTypesOfClassUseCase: GetSubjectTypesOfClassUseCase,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
  ) {}

  async execute(studentNewId: string): Promise<DocumentFilterDto> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { classId } = await this.studentApplicationService.getCurrentAcademicDetails(student);
    const [groups, teachers, subjectTypes] = await Promise.all([
      this.getGroupsOfStudentUseCase.execute(student.newId),
      this.getTeachersOfStudentUseCase.execute(student._id),
      classId ? this.GetSubjectTypesOfClassUseCase.execute(classId) : [],
    ]);

    return DocumentMapper.toDocumentFilterDto({ groups, teachers, subjectTypes });
  }
}
