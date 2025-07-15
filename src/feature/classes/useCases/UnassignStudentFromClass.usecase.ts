import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ID } from "../../../types/BaseEntity";
import { ClassService } from "../domain/Class.service";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { ClassGroupRepo } from "../domain/classGroup.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";

type UnassignStudentFromClassInput = {
  classNewId: string;
  studentIds: ID[];
};

@injectable()
export class UnassignStudentFromClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(params: UnassignStudentFromClassInput): Promise<void> {
    const { classNewId, studentIds } = params;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const students = await this.studentRepo.findUnArchivedStudentsByIds(studentIds);

    ClassService.ensureStudentsInClass(students, classDoc);

    const studentToRemoveIds = students.map(student => student._id);

    await Promise.all(
      classDoc.classGroups.map(classGroupId =>
        this.classGroupRepo.removeStudentsFromClassGroup(classGroupId, studentToRemoveIds),
      ),
    );

    const newStudentIdsOfClass = ClassService.excludeRemovedStudents({
      studentIds: classDoc.students,
      studentToRemoveIds,
    });
    await this.classRepo.updateOneById(classDoc._id, { students: newStudentIdsOfClass });

    await this.studentProfileRepo.updateManyByStudentsAndSchoolYear(
      studentToRemoveIds,
      classDoc.schoolYear,
      { classGroup: null, class: null },
    );

    await this.examGradeRepo.removeStudentsFromExamGradeOfClass(classDoc._id, studentToRemoveIds);
    await this.gradeBookObservationRepo.removeStudentsFromGradeBookObservationOfClass(
      classDoc._id,
      studentToRemoveIds,
    );

    return;
  }
}
