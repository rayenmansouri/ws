import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { CambridgeAveragesOfClassDTO } from "../../dto/cambridge/CambridgeAveragesOfClass.dto";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";

@injectable()
export class GetCambridgeAveragesOfClassUsecase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<CambridgeAveragesOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const classes = await this.classRepo.findManyByClassTypeInSchoolYear(
      classDoc.classType,
      classDoc.schoolYear,
    );

    const diplomas = await this.diplomaRepo.findAll();

    const classesGrades = await Promise.all(
      classes.map(currentClass =>
        this.cambridgeClassGradesRepo.loadTermClassGrades(currentClass._id, termDoc._id),
      ),
    );
    const currentClassGrades = classesGrades.find(
      currentClassGrades => currentClassGrades.class.newId === classDoc.newId,
    )!;

    const classAverages: CambridgeAveragesOfClassDTO["classAverages"] = classesGrades
      .map(currentClassGrades => {
        return {
          className: currentClassGrades.class.name,
          rank: null,
          average: currentClassGrades.getTotalAverage().format(),
          numberOfStudents: currentClassGrades.studentIds.length,
        };
      })
      .sort((a, b) => {
        if (!a.average) return 1;
        if (!b.average) return -1;

        return +b.average - +a.average;
      })
      .map((currentClassAverage, index) => {
        return {
          ...currentClassAverage,
          rank: index + 1,
        };
      });

    if (classDoc.students.length === 0) {
      return {
        stats: {
          studentWithHighestAverage: {
            student: null,
            average: null,
          },
          studentWithLowestAverage: {
            student: null,
            average: null,
          },
          numberOfStudents: 0,
        },
        classAverages: classAverages,
        studentAverages: [],
      };
    }

    const studentAverages: CambridgeAveragesOfClassDTO["studentAverages"] = classDoc.students
      .map(student => {
        const studentAverage = currentClassGrades.calculateStudentAverage(student._id);
        const diploma = diplomas.find(diploma =>
          studentAverage.mark !== null
            ? studentAverage.mark >= diploma.minAverage && studentAverage.mark <= diploma.maxAverage
            : null,
        );

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: studentAverage.format(),
          averageEquivalence: studentAverage.getEquivalence(),
          letterGrade: studentAverage.getLetterGrade(),
          rank: currentClassGrades.calculateStudentRank(student._id),
          diplomaName: diploma?.name ?? null,
        };
      })
      .sort((a, b) => {
        if (!a.average) return 1;
        if (!b.average) return -1;

        return +b.average - +a.average;
      })
      .map((currentStudentAverage, index) => {
        return {
          ...currentStudentAverage,
          rank: index + 1,
        };
      });

    return {
      stats: {
        studentWithHighestAverage: {
          student: studentAverages[0].student,
          average: studentAverages[0].average,
        },
        studentWithLowestAverage: {
          student: studentAverages[studentAverages.length - 1].student,
          average: studentAverages[studentAverages.length - 1].average,
        },
        numberOfStudents: classDoc.students.length,
      },
      classAverages,
      studentAverages,
    };
  }
}
