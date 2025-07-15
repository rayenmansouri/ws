import { ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { ObservationReasonDTO } from "./observationReason.dto";

export type ObservationDTO = {
  _id: ID;
  newId: string;
  students: UserProfileDTO[];
  teacher: UserProfileDTO | null;
  admin: UserProfileDTO | null;
  reason: ObservationReasonDTO;
  note: string;
  files: IFile[];
  issueDate: Date;
  topicName: string | null;
};
