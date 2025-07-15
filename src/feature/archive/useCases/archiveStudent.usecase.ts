import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { School } from "../../schools/domain/school.entity";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { Student } from "../../students/domain/student.entity";

@injectable()
export class ArchiveStudentUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService") private studentService: StudentApplicationService,
    @inject("School") private school: School,
  ) {}

  async executeWithNewId(studentNewIds: string[]): Promise<void> {
    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );

    if (students.some(student => student.isArchived))
      throw new BadRequestError("student.alreadyArchived");

    await this.archiveStudent(students);
  }

  private async archiveStudent(students: Student[]): Promise<void> {
    for (const student of students) {
      const { classId, groupIds } = await this.studentService.getCurrentAcademicDetails(student);

      if (classId) throw new BadRequestError("student.cannotArchiveStudentAssignedToClass");

      if (groupIds.length > 0) {
        throw new BadRequestError("student.cannotArchiveStudentAssignedToGroups");
      }

      await this.studentRepo.updateOneById(student._id, {
        isArchived: true,
        archivedAt: getCurrentTimeOfSchool(this.school._id),
      });
    }
  }
}
