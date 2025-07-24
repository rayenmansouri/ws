import { injectable } from "inversify/lib/inversify";
import _ from "lodash";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { Student } from "../../students/domain/student.entity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";
import { ClassGroupRepo } from "../domain/classGroup.repo";

type AssignStudentToClassParams = {
  classNewId: string;
  studentIds: ID[];
};

@injectable()
export class AssignStudentToClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(data: AssignStudentToClassParams): Promise<void> {
    const { classNewId, studentIds } = data;

    const students = await this.studentRepo.findManyByIdsOrThrow(studentIds, "notFound.student");

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["classType"],
    });

    ClassService.checkClassCapacity(classDoc.classType, classDoc, students);

    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      studentIds,
      classDoc.schoolYear,
    );

    const [studentGroup1, studentGroup2] = _.chunk(students, Math.ceil(students.length / 2)) as [
      Student[],
      Student[] | undefined,
    ];

    ClassService.checkStudentNotIncludeInClass(studentProfiles);
    ClassService.validateStudentsClassType(students, { classType: classDoc.classType._id });

    const classGroupIds = classDoc.classGroups;

    const firstGroupId = classGroupIds.at(0);
    const secondGroupId = classGroupIds.at(1);
    if (!firstGroupId || !secondGroupId) throw new InternalError("Class groups not found");

    const studentProfileGroup1 = studentProfiles.filter(studentProfile =>
      studentGroup1.some(student => student._id === studentProfile.student),
    );
    const studentProfileOfGroup2 = studentProfiles.filter(studentProfile =>
      studentGroup2?.some(student => student._id === studentProfile.student),
    );

    const studentProfileIdsOfGroup1 = studentProfileGroup1.map(
      studentProfile => studentProfile._id,
    );
    const studentIdsOfGroup1 = studentProfileGroup1.map(studentProfile => studentProfile.student);

    await this.studentProfileRepo.updateManyByIds(studentProfileIdsOfGroup1, {
      class: classDoc._id,
      classGroup: firstGroupId,
    });
    await this.classGroupRepo.addStudentsToClassGroup(firstGroupId, studentIdsOfGroup1);

    if (studentProfileOfGroup2?.length) {
      const studentIdsOfGroup2 = studentProfileOfGroup2.map(
        studentProfile => studentProfile.student,
      );
      const studentProfileGroup2Ids = studentProfileOfGroup2.map(
        studentProfile => studentProfile._id,
      );
      await this.studentProfileRepo.updateManyByIds(studentProfileGroup2Ids, {
        class: classDoc._id,
        classGroup: secondGroupId,
      });
      await this.classGroupRepo.addStudentsToClassGroup(secondGroupId, studentIdsOfGroup2);
    }

    await this.classRepo.updateOneById(classDoc._id, {
      students: classDoc.students.concat(studentIds),
    });

    return;
  }
}
