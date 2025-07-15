import { PostDTO } from "../../announcements/dtos/posts.dto";
import { HomeworkDTO } from "../../homeworks/dtos/homework.dto";
import { ObservationDTO } from "../../observations/dtos/observation.dto";
import { SessionDTO } from "../../sessionManagement/dtos/Session.dto";

export type UserDashboardDTO = {
  homeworks: HomeworkDTO[];
  observations: ObservationDTO[];
  schedule: SessionDTO[];
  posts: PostDTO[];
};
