import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Student } from "../../students/domain/student.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Observation, ObservationMetaData } from "./observation.entity";

export type classObservation = {
  _id: ID;
  newId: string;
  students: Student[];
  issuer?: BaseUser;
  topicName: string | null;
  urgency: string;
  reason: string;
};

export abstract class ObservationRepo extends BaseRepo<ObservationMetaData> {
  abstract deleteManyByClass(classId: ID): Promise<void>;

  abstract deleteManyByGroup(groupId: ID): Promise<void>;

  abstract list<FieldsToPopulate extends keyof ObservationMetaData["populatedFields"] = never>(
    filter: {
      classId?: ID;
      groupIds?: ID[];
      studentId?: ID;
      teacherIds?: ID[];
      observationReasonId?: ID;
      search?: string;
      excludeEmptyFiles?: boolean;
      subjectTypeIds?: ID[];
    },
    options: ListOptions & { populate?: FieldsToPopulate[] },
  ): Promise<ResponseWithPagination<Populate<ObservationMetaData, FieldsToPopulate>>>;

  abstract findManyBySessionId(
    sessionId: ID,
  ): Promise<Populate<ObservationMetaData, "issuer" | "students">[]>;

  abstract updateManyByObservationReason(
    observationReasonId: string,
    data: Partial<Observation>,
  ): Promise<void>;

  abstract findManyByObservationReason(observationReasonId: ID): Promise<Observation[]>;
  abstract removeSession(sessionId: ID): Promise<void>;

  abstract getObservationsByClassInRange(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<classObservation[]>;

  abstract getObservationsUrgencyStatsOfClasses(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<{ tag: string; percentage: number }[]>;
}
