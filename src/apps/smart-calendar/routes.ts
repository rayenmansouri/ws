import express from "express";
import { SmartCalendarConfigDTO } from "../../feature/smartCalendar/dtos/SmartCalendarConfig.dto";
import { StartGenerationUsecase } from "./usecases/StartGeneration.usecase";
import { CancelGenerationUsecase } from "./usecases/CancelGeneration.usecase";
import { ID } from "../../types/BaseEntity";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/start-generation", async (req, res) => {
  const config = req.body as SmartCalendarConfigDTO;

  await StartGenerationUsecase.execute(config);

  res.status(200).json({ message: "Schedule generation started" });
});

router.post("/cancel-generation", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const scheduleId = req.body.scheduleId as ID;

  CancelGenerationUsecase.execute(scheduleId);

  res.status(200).json({ message: "Schedule generation cancelled" });
});

export default router;
