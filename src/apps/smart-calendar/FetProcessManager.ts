import { FetProcess } from "./FetProcess";

export class FetProcessManager {
  private fetProcesses: FetProcess[] = [];

  add(fetProcess: FetProcess): void {
    this.fetProcesses.push(fetProcess);
  }

  remove(fetProcess: FetProcess): void {
    this.fetProcesses = this.fetProcesses.filter(
      process => process.scheduleId !== fetProcess.scheduleId,
    );
  }

  findByScheduleId(scheduleId: string): FetProcess | null {
    return this.fetProcesses.find(process => process.scheduleId === scheduleId) ?? null;
  }
}
