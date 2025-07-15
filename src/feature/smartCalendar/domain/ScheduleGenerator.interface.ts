import { ID } from "../../../types/BaseEntity";
import { SmartCalendarConfigDTO } from "../dtos/SmartCalendarConfig.dto";

export interface ScheduleGenerator {
  startGeneration(config: SmartCalendarConfigDTO): Promise<void>;
  stopGeneration(id: ID): Promise<void>;
}
