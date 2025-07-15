import { injectable } from "inversify";
import { SecondaryGradeReportStatsDTO } from "../../dto/secondary/ScondaryGradeReportStats.dto";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { inject } from "../../../../core/container/TypedContainer";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { School } from "../../../schools/domain/school.entity";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { ESTABLISHMENT_TITLE_ENUM } from "../../../levels/domains/level.entity";

@injectable()
export class GetSecondaryGradeReportStatsUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("School") private school: School,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<SecondaryGradeReportStatsDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "students"],
    });
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );

    const classGrades = await this.secondaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      term._id,
    );

    const headers: SecondaryGradeReportStatsDTO["headers"] = [];
    classGrades.subjects.forEach(subject => {
      headers.push({
        topic: {
          name: subject.name,
        },
        coefficient: subject.coefficient,
      });
    });
    classGrades.groups.forEach(group => {
      headers.push({
        topic: { name: group.name },
        coefficient: group.coefficient,
      });
    });

    const topicsStats: SecondaryGradeReportStatsDTO["topicsStats"] = [];
    classGrades.subjects.forEach(subject => {
      topicsStats.push({
        topicName: subject.name,
        avgRateAbove10: subject.calculateAvgAbove10().percentage.toString(),
        maxAverage: subject.calculateHighestAverage().format(),
        minAverage: subject.calculateLowestAverage().format(),
        topicAverage: subject.getTotalAverage().format(),
        teacher: subject.teacher ? subject.teacher.fullName : null,
      });
    });

    const studentStats: SecondaryGradeReportStatsDTO["studentStats"] = [];
    classDoc.students.forEach(student => {
      const studentStat: SecondaryGradeReportStatsDTO["studentStats"][number] = {
        average: classGrades.calculateStudentAverage(student._id).format(),
        fullName: student.fullName,
        rank: classGrades.calculateStudentRank(student._id),
      };

      classGrades.subjects.forEach(subject => {
        studentStat[subject.name] = subject.calculateStudentAverage(student._id).format();
      });

      const groups = classGrades.findGroupsOfStudent(student._id);
      groups.forEach(group => {
        studentStat[group.name] = group.calculateStudentAverage(student._id).format();
      });

      studentStats.push(studentStat);
    });

    return {
      class: {
        name: classDoc.name,
      },
      school: {
        _id: this.school._id,
        name: this.school.name,
        educationDepartment: this.school.educationDepartment,
        establishmentTitle: level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_SECONDARY,
      },
      studentNumber: classDoc.students.length,
      term: {
        name: term.name,
      },
      schoolYear: {
        name: classDoc.schoolYear.name,
      },
      totalAverage: {
        classAverage: classGrades.getTotalAverage().format(),
        maxAverage: classGrades.calculateHighestAverage().format(),
        minAverage: classGrades.calculateLowestAverage().format(),
        avgRateAbove10: classGrades.calculateAvgRateAbove10(),
      },
      headers,
      topicsStats,
      studentStats,
    };
  }
}
