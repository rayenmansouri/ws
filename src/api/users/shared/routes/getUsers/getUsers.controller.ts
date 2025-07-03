import { Connection } from "mongoose";
import { END_USER_ENUM, TEndUserWithoutMasterEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AdminRepo } from "../../../../../feature/admins/domain/Admin.repo";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { ParentRepo } from "../../../../../feature/parents/domain/Parent.repo";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { TeacherRepo } from "../../../../../feature/teachers/domain/Teacher.repo";
import { AudienceStrategyFactory } from "../../../../../features/schoolAnnouncement/audienceStrategies/AudienceStrategiesFactory";
import { policyDetails } from "../../../../../features/schoolAnnouncement/audienceStrategies/types";
import { mergeArrayMaps } from "../../../../../features/schoolAnnouncement/helpers/mergeMaps";
import { isIdsEqual } from "../../../../../helpers/functionsUtils";
import { ID } from "../../../../../types/BaseEntity";
import { GetUsersResponse, GetUsersRouteConfig } from "./getUsers.types";
import { BaseUser } from "../../../../../feature/users/domain/baseUser.entity";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { Post } from "../../../../../feature/announcements/domain/post.entity";
import { PostRepo } from "../../../../../feature/announcements/repos/Post.repo";

@Controller()
export class GetUsersController extends BaseController<GetUsersRouteConfig> {
  constructor(
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("Connection") private connection: Connection,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetUsersRouteConfig>): Promise<void | APIResponse> {
    if (!req.query.search) return new SuccessResponse<GetUsersResponse>("global.success", []);

    const MAX_USERS = 40;
    const search = req.query.search;
    const post = await this.postRepo.findOneByNewIdOrThrow(req.query.postNewId, "notFound.post");
    const policyDetails: policyDetails = await this.extractPolicyDetails(post);

    const userIdsByTypePromises = post.audiences.map(audience => {
      const strategy = AudienceStrategyFactory.getStrategy(audience.type, policyDetails);

      return strategy.getUsersIds(this.connection);
    });
    const userIdsByTypes = await Promise.all(userIdsByTypePromises);

    const userIdsByType = mergeArrayMaps(userIdsByTypes) as Map<TEndUserWithoutMasterEnums, ID[]>;

    const adminIds = userIdsByType.get(END_USER_ENUM.ADMIN) || [];
    const teacherIds = userIdsByType.get(END_USER_ENUM.TEACHER) || [];
    const parentIds = userIdsByType.get(END_USER_ENUM.PARENT) || [];
    const studentIds = userIdsByType.get(END_USER_ENUM.STUDENT) || [];

    const adminPromises = this.adminRepo.findManyByFullNameAndIds(search, adminIds);
    const teacherPromises = this.teacherRepo.findManyByFullNameAndIds(search, teacherIds);
    const studentPromises = this.studentRepo.findManyByFullNameAndIds(search, studentIds);
    const parentPromises = this.parentRepo.findManyByFullNameAndIds(search, parentIds);

    const [admins, teachers, students, parents] = await Promise.all([
      adminPromises,
      teacherPromises,
      studentPromises,
      parentPromises,
    ]);

    const response = [
      ...this.formatUser(admins, END_USER_ENUM.ADMIN),
      ...this.formatUser(teachers, END_USER_ENUM.TEACHER),
      ...this.formatUser(students, END_USER_ENUM.STUDENT),
      ...this.formatUser(parents, END_USER_ENUM.PARENT),
    ]
      .filter(user => !isIdsEqual(user._id, req.user._id))
      .slice(0, MAX_USERS);

    return new SuccessResponse<GetUsersResponse>("global.success", response);
  }

  private async extractPolicyDetails(post: Post): Promise<policyDetails> {
    if (post.levels) {
      const levelPromise = this.levelRepo.findManyByIds(post.levels);
      const classPromise = post.classes ? this.classRepo.findManyByIds(post.classes) : null;

      const groupPromise = post.groups ? this.groupRepo.findManyByIds(post.groups) : null;

      const [levels, classes, groups] = await Promise.all([
        levelPromise,
        classPromise,
        groupPromise,
      ]);

      const levelNewIds = levels.map(level => level.newId);
      const classNewIds = classes ? classes.map(classDoc => classDoc.newId) : null;
      const groupNewIds = groups ? groups.map(subject => subject.newId) : null;

      return {
        policy: "custom",
        levels: levelNewIds,
        classes: classNewIds || [],
        groups: groupNewIds || [],
      };
    } else {
      return {
        policy: "all",
        levels: null,
        classes: null,
        groups: null,
      };
    }
  }

  private formatUser(user: BaseUser[], userType: TEndUserWithoutMasterEnums): GetUsersResponse {
    return user.map(user => ({
      fullName: user.fullName,
      type: userType,
      newId: user.newId,
      avatar: user.avatar,
      _id: user._id,
    }));
  }
}
