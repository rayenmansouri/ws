import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassRepo } from "../domain/Class.repo";
import {
  ClassOverviewDashboardDTO,
  CurrentSessionClassDashboardDTO,
} from "../dto/ClassDashboard.dto";
import { ClassDashboardMapper } from "../mappers/ClassDashboard.mapper";
import {
  AttendanceTable,
  ObservationGivenTable,
  SessionCanceledTable,
} from "../../dashboards/dtos/AdminDashboard.dto";
import { TabName } from "../../dashboards/useCases/getAdminDashboard.usecase";
import { SessionApplicationService } from "./../../sessionManagement/applicationServices/Session.application.service";

type getClassDashboardRequestDto = {
  classNewId: string;
  tabName: TabName;
  language: TLanguageEnum;
  dateInterval: {
    from: Date;
    to: Date;
  };
};

type TGetClassDashboardResponse = {
  classOverView: ClassOverviewDashboardDTO;
  currentSession: CurrentSessionClassDashboardDTO | null;
  tabStats: {
    tabName: TabName;
    chartData: { tag: string; percentage: number }[];
    tableData: (AttendanceTable | ObservationGivenTable | SessionCanceledTable)[];
  };
};
@injectable()
export class GetClassDashboardUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("SessionApplicationService") private sessionAppService: SessionApplicationService,
  ) {}

  async execute(dto: getClassDashboardRequestDto): Promise<TGetClassDashboardResponse> {
    const { classNewId } = dto;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "classType"],
    });

    const subLevel = await this.subLevelRepo.findOneByIdOrThrow(
      classDoc.classType.subLevel,
      "global.internalError",
    );

    const classOverview = ClassDashboardMapper.toClassOverviewDto({
      classDoc,
      level: subLevel.level,
    });

    const onGoingSession = await this.sessionRepo.findOnGoingSessionByClassId(classDoc._id, {
      populate: ["subjectType", "subSubjectType", "classroom", "teacher"],
    });

    const onGoingSessionDto = onGoingSession
      ? ClassDashboardMapper.toCurrentSessionDto(onGoingSession)
      : null;

    const commonResponse = {
      classOverView: classOverview,
      currentSession: onGoingSessionDto,
    };

    switch (dto.tabName) {
      case "attendance": {
        const attendanceStats = await this.sessionAppService.getDashboardAttendanceStats(
          {
            classIds: [classDoc._id],
            dateInterval: dto.dateInterval,
          },
          dto.language,
        );
        return {
          ...commonResponse,
          tabStats: attendanceStats,
        };
      }

      case "observationGiven": {
        const observationStats = await this.sessionAppService.getDashboardObservationStats(
          [classDoc._id],
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
          [classDoc._id],
          dto.dateInterval,
        );
        return {
          ...commonResponse,
          tabStats: sessionCanceledStats,
        };
      }

      default:
        throw new Error("invalid tab name");
    }
  }
}
