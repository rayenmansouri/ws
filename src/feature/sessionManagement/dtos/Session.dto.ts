import {
  TAttendanceEnum,
  TSessionStatusEnum,
} from "../../../database/schema/pedagogy/session/session.schema";
import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";

export type SessionDTO = {
  _id: ID;
  newId: string;
  status: TSessionStatusEnum;
  topicName: string;
  topicNewId: string;
  className: string;
  classroom: EntityDto;
  startTime: Date;
  endTime: Date;
  classGroup: EntityDto | null;
  //attendance: TAttendanceEnum | null;
  //TODO need to rename it to attendance
  attendence: TAttendanceEnum | null;
  sessionType: EntityDto;
};
