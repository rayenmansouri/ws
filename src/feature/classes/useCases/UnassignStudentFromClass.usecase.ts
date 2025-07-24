import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";
import { ClassGroupRepo } from "../domain/classGroup.repo";

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
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
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

    return;
  }
}
