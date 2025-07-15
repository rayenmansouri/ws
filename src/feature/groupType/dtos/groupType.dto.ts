import { ExamDTO } from "./../../classTypes/dtos/classType.dto";
import { EntityDto } from "../../entity/dto/entity.dto";

export type GroupTypeDto = EntityDto & {
  coefficient: number | null;
  exams: ExamDTO[];
  illustration: string;
};
