import { injectable } from "inversify/lib/inversify";
import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TeacherRepo } from "../domain/Teacher.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { UserMapper } from "../../users/mappers/User.mapper";

//TODO use this use case is issue feature when getting teachers of student
@injectable()
export class GetTeachersOfStudentUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {}

  async execute(studentId: ID): Promise<UserProfileDTO[]> {
    const student = await this.studentRepo.findOneByIdOrThrow(studentId, "notFound.student");

    const { classId } = await this.studentApplicationService.getCurrentAcademicDetails(student);
    if (!classId) return [];

    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class");

    const teacherIds = [
      ...Object.values(classDoc.subjectTeacherMap),
      ...Object.values(classDoc.subSubjectTeacherMap),
    ].filter(teacher => teacher != null);

    const teachers = await this.teacherRepo.findManyByIds(teacherIds);

    const teacherDtos = teachers.map(UserMapper.toUserProfileDTO);

    return teacherDtos;
  }
}
