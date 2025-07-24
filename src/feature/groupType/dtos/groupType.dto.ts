import { EntityDto } from "../../entity/dto/entity.dto";

export type GroupTypeDto = EntityDto & {
  coefficient: number | null;
  illustration: string;
};
