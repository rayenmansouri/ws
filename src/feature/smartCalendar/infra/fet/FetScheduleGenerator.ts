import axios from "axios";
import { injectable } from "inversify/lib/inversify";
import { ScheduleGenerator } from "../../domain/ScheduleGenerator.interface";
import { ID } from "../../../../types/BaseEntity";
import { SmartCalendarConfigDTO } from "../../dtos/SmartCalendarConfig.dto";
import { fetSmartCalendarUrl } from "../../../../config";

@injectable()
export class FetScheduleGenerator implements ScheduleGenerator {
  async startGeneration(config: SmartCalendarConfigDTO): Promise<void> {
    await axios.post(`${fetSmartCalendarUrl}/start-generation`, config);
  }

  async stopGeneration(id: ID): Promise<void> {
    await axios.post(`${fetSmartCalendarUrl}/cancel-generation`, {
      scheduleId: id,
    });
  }
}
