import { inject, injectable } from "inversify/lib/inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { ParentRepo } from "../domain/Parent.repo";
import { ParentDetailsDTO } from "../dtos/Parent.dto";
import { ParentMapper } from "../mappers/Parent.mapper";

@injectable()
export class GetParentByNewIdUseCase {
  constructor(
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(parentNewId: string): Promise<ParentDetailsDTO> {
    const parent = await this.parentRepo.findOneByNewIdOrThrow(parentNewId, "notFound.parent", {
      populate: ["students"],
    });
    const studentIds = parent.students.map(student => student._id);

    const studentProfiles = await Promise.all(
      studentIds.map(id => this.studentProfileRepo.getAllStudentProfileOfStudent(id)),
    );
    const schoolYearIds = studentProfiles.flatMap(profile => profile.map(p => p.schoolYear));

    const schoolYearDocs = await this.schoolYearRepo.findManyByIds(schoolYearIds);

    const studentWithSchoolYear = studentProfiles.map(profile => {
      const studentId = profile.at(0)?.student;
      const student = parent.students.find(s => s._id === studentId);
      const schoolYears = profile.map(p => {
        const schoolYear = schoolYearDocs.find(sy => sy._id === p.schoolYear);
        if (!schoolYear) throw new InternalError("School year not found in student profile");
        return schoolYear;
      });
      if (!student) throw new InternalError("Student not found in parent data");
      return { ...student, schoolYears };
    });

    return ParentMapper.toParentDetailsDTO({ ...parent, students: studentWithSchoolYear });
  }
}
