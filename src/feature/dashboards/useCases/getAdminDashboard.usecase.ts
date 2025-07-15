import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Level } from "../../levels/domains/level.entity";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { SessionApplicationService } from "../../sessionManagement/applicationServices/Session.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { AdminDashboardDTO } from "../dtos/AdminDashboard.dto";

export type TabName = "attendance" | "observationGiven" | "sessionCanceled";

export type GetAdminDashboardRequest = {
  levels?: ID[];
  dateInterval: {
    from: Date;
    to: Date;
  };
  search?: string;
  tabName: TabName;
  page: number;
  limit: number;
  language: TLanguageEnum;
};

@injectable()
export class GetAdminDashboardUseCase {
  constructor(
    @inject("LevelRepo") private readonly levelRepo: LevelRepo,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private readonly studentProfileRepo: StudentProfileRepo,
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("ParentRepo") private readonly parentRepo: ParentRepo,
    @inject("AdminRepo") private readonly adminRepo: AdminRepo,
    @inject("SubLevelRepo") private readonly subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private readonly classTypeRepo: ClassTypeRepo,
    @inject("SessionApplicationService")
    private readonly sessionAppService: SessionApplicationService,
  ) {}

  async execute(dto: GetAdminDashboardRequest): Promise<AdminDashboardDTO> {
    const allLevels = await this.levelRepo.getLevelsSortedByRank();

    let levels: Level[];

    if (dto.levels && dto.levels.length > 0) {
      const foundedLevels = await this.levelRepo.findManyByIdsOrThrow(dto.levels, "notFound.level");
      levels = foundedLevels;
    } else {
      levels = [allLevels[0]];
    }

    const allSchoolYears = allLevels.map(level => level.currentSchoolYear._id);
    const levelIds = levels.map(level => level._id);
    const currentSchoolYearsIds = allLevels.map(level => level.currentSchoolYear._id);

    const [students, subLevels, classesOfLevel, teachersCount, parentsCount, adminCount] =
      await Promise.all([
        this.studentRepo.getAllUnArchivedStudent(),
        this.subLevelRepo.findSubLevelsByLevelIdsOrderedByRank(levelIds),
        this.classRepo.getClassesCountOfSchoolYear(allSchoolYears),
        this.teacherRepo.getNotArchivedTeachersCount(),
        this.parentRepo.getNotArchivedParentsCount(),
        this.adminRepo.getAdminsCountExcludingArchivedAndImpersonated(),
      ]);

    const studentIds = students.map(student => student._id);

    const [studentAssignedToClassCount, studentNotAssignedToClassCount, classTypes] =
      await Promise.all([
        this.studentProfileRepo.countStudentsAssignedToClass(currentSchoolYearsIds, studentIds),
        this.studentProfileRepo.countStudentsNotAssignedToClass(currentSchoolYearsIds, studentIds),
        this.classTypeRepo.findManyBySublevels(subLevels.map(subLevel => subLevel._id)),
      ]);

    const commonResponse: Omit<AdminDashboardDTO, "tabStats"> = {
      totalClasses: classesOfLevel.length,
      staffCount: adminCount,
      totalStudentsCount: studentAssignedToClassCount + studentNotAssignedToClassCount,
      unaffectedStudentsCount: studentNotAssignedToClassCount,
      affectedStudentsCount: studentAssignedToClassCount,
      totalParents: parentsCount,
      totalTeachers: teachersCount,
      levels: allLevels.map(level => ({ _id: level._id, name: level.name })),
      subLevels: [],
    };

    for (const subLevel of subLevels) {
      const classTypesIdsOfSublevel = classTypes
        .filter(classType => classType.subLevel === subLevel._id)
        .map(classType => classType._id);

      const [classesCountOfSublevel, studentsInSubLevel] = await Promise.all([
        this.classRepo.getClassesCountOfSchoolYearAndClassTypes(
          subLevel.level.currentSchoolYear._id,
          classTypesIdsOfSublevel,
        ),
        this.studentRepo.findManyByClassTypes(classTypesIdsOfSublevel),
      ]);

      const studentIdsOfSublevel = studentsInSubLevel.map(student => student._id);

      const unAffectedStudentsCount = await this.studentProfileRepo.countStudentsNotAssignedToClass(
        [subLevel.level.currentSchoolYear._id],
        studentIdsOfSublevel,
      );

      commonResponse.subLevels.push({
        name: subLevel.name,
        newId: subLevel.newId,
        totalClasses: classesCountOfSublevel,
        totalStudents: studentsInSubLevel.length,
        affectedStudents: studentIdsOfSublevel.length - unAffectedStudentsCount,
        unaffectedStudents: unAffectedStudentsCount,
      });
    }

    const classesIds = classesOfLevel.map(classDoc => classDoc._id);

    switch (dto.tabName) {
      case "attendance": {
        const attendanceStats = await this.sessionAppService.getDashboardAttendanceStats(
          {
            classIds: classesIds,
            dateInterval: dto.dateInterval,
          },
          dto.language,
        );

        return { ...commonResponse, tabStats: attendanceStats };
      }

      case "observationGiven": {
        const observationStats = await this.sessionAppService.getDashboardObservationStats(
          classesIds,
          dto.language,
          dto.dateInterval,
        );

        return {
          ...commonResponse,
          tabStats: observationStats,
        };
      }

      case "sessionCanceled": {
        const sessionCanceledStats = await this.sessionAppService.getDashboardSessionCanceledStats(
          classesIds,
          dto.dateInterval,
        );
        return { ...commonResponse, tabStats: sessionCanceledStats };
      }

      default:
        throw new Error("invalid tab name");
    }
  }
}
