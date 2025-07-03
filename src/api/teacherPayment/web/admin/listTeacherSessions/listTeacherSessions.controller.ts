import moment from "moment";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { Populate } from "../../../../../core/populateTypes";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SESSION_STATUS_ENUM } from "../../../../../database/schema/pedagogy/session/session.schema";
import {
  SessionMetaData,
  TEACHER_ATTENDANCE_STATUS_ENUM,
} from "../../../../../feature/sessionManagement/domain/session.entity";
import { MongoTeacherRepo } from "../../../../../newDatabase/mongo/repositories/MongoTeacher.repo";
import {
  ListTeacherSessionsResponse,
  ListTeacherSessionsRouteConfig,
} from "./listTeacherSessions.types";
import { SessionRepo } from "../../../../../feature/sessionManagement/domain/Session.repo";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";

@Controller()
export class ListTeacherSessionsController extends BaseController<ListTeacherSessionsRouteConfig> {
  constructor(
    @inject("TeacherRepo") private teacherRepo: MongoTeacherRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListTeacherSessionsRouteConfig>): Promise<void | APIResponse> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      req.params.teacherNewId,
      "notFound.teacher",
    );

    const startTime = moment({ year: req.query.year, month: req.query.month })
      .startOf("month")
      .toDate();

    const endTime = moment({ year: req.query.year, month: req.query.month })
      .endOf("month")
      .toDate();

    const data = await this.sessionRepo.listTeacherSessions(
      {
        teacherId: teacher._id,
        startTime,
        endTime,
        attendanceStatus: req.query.attendanceStatus,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    const response = this.formatResponse(data);

    return new SuccessResponse<ListTeacherSessionsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }

  formatResponse(
    data: ResponseWithPagination<Populate<SessionMetaData, "class" | "group">>,
  ): ListTeacherSessionsResponse {
    const docs = data.docs.map(doc => {
      return {
        sessionDate: moment(doc.endTime).startOf("day").toDate().toISOString(),
        className: (doc.class?.name || doc.group?.name) as string,
        status:
          doc.status === SESSION_STATUS_ENUM.CANCELED
            ? TEACHER_ATTENDANCE_STATUS_ENUM.ABSENT
            : TEACHER_ATTENDANCE_STATUS_ENUM.PRESENT,
        _id: doc._id,
        newId: doc.newId,
        sessionType: doc.sessionType.name,
      };
    });
    return { docs, meta: data.meta };
  }
}
