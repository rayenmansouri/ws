import { FileDetails } from "../../../core/fileManager/FileManager";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { ObservationReason } from "../../observationsReason/domains/observationReason.entity";
import { Session } from "../../sessionManagement/domain/session.entity";
import { Student } from "../../students/domain/student.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Observation = {
  observationReason: ObservationReason;
  issuer: ID;
  issuerType: "teacher" | "admin";
  note: string;
  students: ID[];
  class: ID | null;
  group: ID | null;
  files: FileDetails[];
  session: ID | null;
} & BaseEntity;

export type ObservationMetaData = GenerateMetaData<
  Observation,
  {
    issuer: BaseUser;
    students: Student[];
    class: Class;
    group: Group;
    session: Session;
  }
>;
