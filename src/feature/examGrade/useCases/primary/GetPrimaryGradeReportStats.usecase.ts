import { injectable } from "inversify";
import { PrimaryGradeReportStatsDTO } from "../../dto/primary/PrimaryGradeReportStats.dto";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { School } from "../../../schools/domain/school.entity";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { GradingEntity } from "../../domain/tunisian/Grading.entity";
import { ESTABLISHMENT_TITLE_ENUM } from "../../../levels/domains/level.entity";

@injectable()
export class GetPrimaryGradeReportStatsUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("School") private school: School,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("PrimaryClassGradesRepo")
    private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<PrimaryGradeReportStatsDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "students"],
    });
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );
    const allDiplomas = await this.diplomaRepo.findAll();

    const diplomaNumbers: { name: string; number: number }[] = [];

    const classGrades = await this.primaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      term._id,
    );

    const headers: PrimaryGradeReportStatsDTO["headers"] = classGrades.fields.map(field => {
      const topics: { name: string }[] = [];
      field.subTopics.forEach(subject => {
        if (subject.subTopics.length === 0) topics.push({ name: subject.name });

        if (subject.subTopics.length > 0)
          subject.subTopics.forEach(subSubject => topics.push({ name: subSubject.name }));
      });

      return {
        fieldName: field.name,
        topics,
      };
    });

    const studentStats: PrimaryGradeReportStatsDTO["studentStats"] = classDoc.students
      .map(student => {
        const studentAverage = classGrades.calculateStudentAverage(student._id);
        const diploma = allDiplomas.find(
          diploma =>
            studentAverage.mark !== null &&
            studentAverage.mark >= diploma.minAverage &&
            studentAverage.mark <= diploma.maxAverage,
        );

        if (diploma) {
          const diplomaIndex = diplomaNumbers.findIndex(d => d.name === diploma.name);
          if (diplomaIndex === -1) {
            diplomaNumbers.push({ name: diploma.name, number: 1 });
          } else {
            diplomaNumbers[diplomaIndex].number++;
          }
        }

        return {
          rank: classGrades.calculateStudentRank(student._id),
          average: studentAverage.format(),
          fullName: student.fullName,
          diploma: diploma ? { name: diploma.name } : null,
          fields: classGrades.fields.map(field => {
            const fieldInfo: PrimaryGradeReportStatsDTO["studentStats"][number]["fields"][number] =
              {
                rank: field.calculateStudentRank(student._id),
                average: field.calculateStudentAverage(student._id).format(),
                name: field.name,
              };

            field.subTopics.forEach(subject => {
              if (subject.subTopics.length === 0)
                fieldInfo[subject.name] = subject.calculateStudentAverage(student._id).format();

              if (subject.subTopics.length > 0)
                subject.subTopics.forEach(
                  subSubject =>
                    (fieldInfo[subSubject.name] = subSubject
                      .calculateStudentAverage(student._id)
                      .format()),
                );
            });

            return fieldInfo;
          }),
        };
      })
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

    const fields: PrimaryGradeReportStatsDTO["fields"] = classGrades.fields.map(field => {
      const fieldSubjects: GradingEntity[] = [];

      field.subTopics.forEach(subject => {
        if (subject.subTopics.length === 0) fieldSubjects.push(subject);

        if (subject.subTopics.length > 0)
          subject.subTopics.forEach(subSubject => fieldSubjects.push(subSubject));
      });

      return {
        name: field.name,
        subjects: fieldSubjects.map(subject => ({
          name: subject.name,
          highestGrade: subject.calculateHighestAverage().format(),
          lowestGrade: subject.calculateLowestAverage().format(),
          averageOfClass: subject.getTotalAverage().format(),
          studentBelowAverage: `${subject.calculateAvgBelow10().number} (${
            subject.calculateAvgBelow10().percentage
          })`,
          studentAboveAverage: `${subject.calculateAvgAbove10().number} (${
            subject.calculateAvgAbove10().percentage
          })`,
        })),
        fieldStats: {
          highestGrade: field.calculateHighestAverage().format(),
          lowestGrade: field.calculateLowestAverage().format(),
          averageOfClass: field.getTotalAverage().format(),
          studentBelowAverage: `${field.calculateAvgBelow10().number} (${
            field.calculateAvgBelow10().percentage
          })`,
          studentAboveAverage: `${field.calculateAvgAbove10().number} (${
            field.calculateAvgAbove10().percentage
          })`,
        },
      };
    });

    const globalStats: PrimaryGradeReportStatsDTO["globalStats"] = {
      studentBelowAverageNumber: classGrades.calculateAvgBelow10().number,
      studentBelowAveragePercentage: classGrades.calculateAvgBelow10().percentage,
      studentAboveAverageNumber: classGrades.calculateAvgAbove10().number,
      studentAboveAveragePercentage: classGrades.calculateAvgAbove10().percentage,
      fieldAverages: classGrades.fields.map(field => ({
        name: field.name,
        average: field.getTotalAverage().format(),
      })),
      termAverage: classGrades.getTotalAverage().format(),
      diplomaNumbers: diplomaNumbers.sort((a, b) => b.number - a.number),
    };

    return {
      class: {
        name: classDoc.name,
      },
      level: {
        name: level.name,
      },
      school: {
        _id: this.school._id,
        name: this.school.name,
        educationDepartment: this.school.educationDepartment,
        establishmentTitle: level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
      },
      schoolYear: {
        name: classDoc.schoolYear.name,
      },
      term: {
        name: term.name,
      },
      studentNumber: classDoc.students.length,
      headers,
      studentStats,
      fields,
      globalStats,
    };
  }
}
