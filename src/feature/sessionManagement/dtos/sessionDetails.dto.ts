import { FileDTO } from "../../../core/valueObjects/File.vo.js";
import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TSessionStatusEnum, TSessionWeekEnum } from "../domain/session.entity";
import { SessionAttendanceDTO } from "./sessionAttendance.dto";

export type SessionDetailsDTO = {
  _id: ID;
  newId: string;
  status: TSessionStatusEnum;
  reasonForCanceling: string | null;
  isAttendanceConfirmationAllowed: boolean;
  startTime: Date;
  endTime: Date;
  sessionType: EntityDto;
  week: TSessionWeekEnum | null;
  classGroup: EntityDto | null;
  classroom: EntityDto;
  class: EntityDto | null;
  group: EntityDto | null;
  subjectType: EntityDto | null;
  subSubjectType: EntityDto | null;
  teacher: UserProfileDTO | null;
  sessionSummary: string | null;
  files: FileDTO[];
  notes: {
    title: string;
    text: string;
    index: number;
  }[];
  sessionAttendance: SessionAttendanceDTO;
  attendanceStats: {
    present: { percentage: string; count: number };
    absent: { percentage: string; count: number };
    late: { percentage: string; count: number };
    expelled: { percentage: string; count: number };
  } | null;
  launchedAt: Date | null;
};
