import axios from "axios";
import { ChildProcess, exec } from "child_process";
import { readFile } from "fs/promises";
import { parse } from "papaparse";
import path from "path";
import { internalBaseUrl } from "../../config";
import { BadRequestError } from "../../core/ApplicationErrors";
import logger from "../../core/Logger";
import { SmartCalendarConfigDTO } from "../../feature/smartCalendar/dtos/SmartCalendarConfig.dto";
import { SendSolutionUsecase } from "./usecases/SendSolution.usecase";
import { fetProcessManager } from "./server";
import { kill } from "process";

export class FetProcess {
  private childProcess: ChildProcess | null = null;

  constructor(public readonly scheduleId: string, public readonly config: SmartCalendarConfigDTO) {}

  start(): void {
    const fetFilePath = path.resolve(process.cwd(), "fetFiles", `${this.scheduleId}.fet`);

    const resultDir = path.resolve(process.cwd(), "fetResults", this.scheduleId);

    const command = `fet-cl --inputfile="${fetFilePath}" --exportcsv=true --overwritecsv=true --outputdir="${resultDir}"`;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const childProcess = exec(command, async (error, stdout, stderr) => {
      logger.info(stdout);

      if (stderr || error !== null) {
        if (error?.signal === "SIGKILL") return;

        if (stderr) logger.error(stderr);
        if (error) logger.error(error);

        await axios.post(
          `${internalBaseUrl}/schedules/${this.scheduleId}/mark-as-errored?JSON={"schoolSubdomain":"${this.config.schoolSubdomain}"}`,
        );
        return;
      }

      fetProcessManager.remove(this);
      await SendSolutionUsecase.execute(this);
    });

    this.childProcess = childProcess;
  }

  kill(): void {
    if (!this.childProcess) throw new BadRequestError("Fet process not started");

    const pid = this.childProcess.pid!;
    kill(pid, "SIGKILL");
    kill(pid + 1, "SIGKILL");

    this.childProcess = null;
  }

  async readResults(): Promise<FetActivity[]> {
    const csvFilePath = path.resolve(
      process.cwd(),
      "fetResults",
      this.scheduleId,
      "csv",
      this.scheduleId,
      `${this.scheduleId}_timetable.csv`,
    );

    const csv = await readFile(csvFilePath, "utf-8");

    const obj = parse(csv, { header: true });
    obj.data.pop();

    return obj.data as FetActivity[];
  }
}

type FetActivity = {
  "Activity Id": string;
  Day: string;
  Hour: string;
  "Students Sets": string;
  Subject: string;
  Teachers: string;
  "Activity Tags": string;
  Room: string;
  Comments: string;
};
