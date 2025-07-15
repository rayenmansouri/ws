import { SmartCalendarConfigDTO } from "../../../feature/smartCalendar/dtos/SmartCalendarConfig.dto";
import { FetFileGenerator } from "../FetFileGenerator";
import { FetProcess } from "../FetProcess";
import { fetProcessManager } from "../server";

export class StartGenerationUsecase {
  constructor() {}

  static async execute(config: SmartCalendarConfigDTO): Promise<void> {
    await FetFileGenerator.createFile(config);

    const fetProcess = new FetProcess(config.id, config);
    fetProcessManager.add(fetProcess);

    fetProcess.start();
  }
}
