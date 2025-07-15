import { BadRequestError } from "../../../core/ApplicationErrors";
import { fetProcessManager } from "../server";

export class CancelGenerationUsecase {
  constructor() {}

  static execute(scheduleId: string): void {
    const fetProcess = fetProcessManager.findByScheduleId(scheduleId);
    if (!fetProcess) throw new BadRequestError("notFound.schedule");

    fetProcess.kill();
    fetProcessManager.remove(fetProcess);
  }
}
