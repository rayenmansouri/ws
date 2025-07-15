import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";
import { Parent } from "../../parents/domain/parent.entity";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { Student } from "../domain/student.entity";
import { StudentRepo } from "../domain/Student.repo";
import { StudentService } from "../domain/Student.service";
import { StudentProfile } from "../domain/studentProfile.entity";
import { StudentProfileRepo } from "../domain/StudentProfile.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";

type AcademicDetailsResponse = {
  classId: ID | null;
  groupIds: ID[];
  classGroup: ID | null;
  studentProfile: StudentProfile;
  level: Level;
};

@injectable()
export class StudentApplicationService {
  constructor(
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async getAcademicDetailsOfSchoolYear(
    studentId: ID,
    schoolYearId: ID,
  ): Promise<AcademicDetailsResponse> {
    const schoolYear = await this.schoolYearRepo.findOneByIdOrThrow(
      schoolYearId,
      "notFound.schoolYear",
      {
        populate: ["level"],
      },
    );

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      studentId,
      schoolYearId,
    );

    return {
      classId: studentProfile.class,
      groupIds: studentProfile.groups,
      classGroup: studentProfile.classGroup,
      studentProfile,
      level: schoolYear.level,
    };
  }

  async getCurrentAcademicDetails(student: {
    _id: ID;
    level: ID;
  }): Promise<AcademicDetailsResponse> {
    const level = await this.levelRepo.findOneByIdOrThrow(student.level, "notFound.schoolYear");

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      level.currentSchoolYear._id,
    );

    return {
      classId: studentProfile.class,
      groupIds: studentProfile.groups,
      classGroup: studentProfile.classGroup,
      studentProfile,
      level,
    };
  }

  async assignStudentsToParents(students: Student[], parents: Parent[]): Promise<void> {
    students.forEach(student => {
      parents.forEach(parent => {
        StudentService.ensureStudentIsNotAssignedToParent(student, parent);
        StudentService.ensureParentIsNotAssignedToStudent(parent, student);
      });
    });

    const studentIds = students.map(student => student._id);
    const parentIds = parents.map(parent => parent._id);

    await this.studentRepo.addParentsToStudents(parentIds, studentIds);

    await this.parentRepo.addStudentsToParents(studentIds, parentIds);
  }

  async unassignStudentsFromParents(students: Student[], parents: Parent[]): Promise<void> {
    students.forEach(student => {
      parents.forEach(parent => {
        StudentService.ensureStudentIsAssignedToParent(student._id, parent);
        StudentService.ensureParentIsAssignedToStudent(parent, student);
      });
    });

    const studentIds = students.map(student => student._id);
    const parentIds = parents.map(parent => parent._id);

    await this.studentRepo.removeParentsFromStudents(parentIds, studentIds);
    await this.parentRepo.removeStudentsFromParents(studentIds, parentIds);
  }
}
