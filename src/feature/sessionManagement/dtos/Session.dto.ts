import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { TAttendanceEnum, TSessionStatusEnum } from "../domain/session.entity";

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
