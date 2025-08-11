import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassGroupRepo } from "../domain/classGroup.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ClassRepo } from "../domain/Class.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

type UpdateStudentGroupUseCaseParams = {
  classNewId: string;
  studentNewId: string;
  classGroupNewId: string;
};

@injectable()
export class UpdateStudentGroupUseCase {
  constructor(
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async execute(params: UpdateStudentGroupUseCaseParams): Promise<void> {
    const { classNewId, studentNewId, classGroupNewId } = params;
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student", {
      populate: ["level"],
    });
    const classGroupDoc = await this.classGroupRepo.findOneByNewIdOrThrow(
      classGroupNewId,
      "notFound.group",
    );
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      student.level.currentSchoolYear._id,
    );

    const currentStudentGroupId = studentProfile.classGroup;

    if (!studentProfile.class) throw new BadRequestError("student.notEnrolled");
    if (studentProfile.class !== classDoc._id) {
      throw new BadRequestError("studentRule.notBelongToThisClass");
    }

    if (classGroupDoc.class !== classDoc._id) {
      throw new BadRequestError("classGroup.notBelongToThisClass");
    }

    await this.studentProfileRepo.updateOneById(studentProfile._id, {
      classGroup: classGroupDoc._id,
    });

    if (currentStudentGroupId) {
      await this.classGroupRepo.removeStudentsFromClassGroup(currentStudentGroupId, [student._id]);
    }

    await this.classGroupRepo.addStudentsToClassGroup(classGroupDoc._id, [student._id]);
  }
}
