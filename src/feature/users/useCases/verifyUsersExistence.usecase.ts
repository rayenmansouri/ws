import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { END_USER_WITHOUT_MASTER_ENUM, TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { VerifyUserExistenceDTO } from "./../dtos/verifyUsersExistence.dto";
import { VerifyUserExistenceResponseDTO } from "./../dtos/verifyUsersExistenceResponse.dto";
import { UserMapper } from "../mappers/User.mapper";

@injectable()
export class VerifyAndFetchUsersUseCase {
  constructor(
    @inject("AdminRepo") private readonly adminRepo: AdminRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("ParentRepo") private readonly parentRepo: ParentRepo,
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
  ) {}

  async execute(
    verifyUserExistenceDTO: VerifyUserExistenceDTO[],
  ): Promise<VerifyUserExistenceResponseDTO[]> {
    const categorizedUsers = this.categorizeUsers(verifyUserExistenceDTO);
    const users = this.fetchAndValidateParticipants(categorizedUsers);
    return users;
  }

  public categorizeUsers(
    users: { user: ID; userType: TEndUserEnum }[],
  ): Record<TEndUserEnum, ID[]> {
    return users.reduce((acc, participant) => {
      const { user, userType } = participant;

      if (!acc[userType]) {
        acc[userType] = [];
      }

      acc[userType].push(user);

      return acc;
    }, {} as Record<TEndUserEnum, ID[]>);
  }

  public async fetchAndValidateParticipants(
    categorizedUsers: Record<TEndUserEnum, ID[]>,
  ): Promise<VerifyUserExistenceResponseDTO[]> {
    const users: VerifyUserExistenceResponseDTO[] = [];
    for (const [userType, ids] of Object.entries(categorizedUsers)) {
      switch (userType) {
        case END_USER_WITHOUT_MASTER_ENUM.ADMIN: {
          const admins = await this.adminRepo.findManyByIdsOrThrow(ids, "notFound.admin");
          admins.forEach(admin =>
            users.push({
              ...UserMapper.toUserProfileDTO(admin),
              userType: userType,
            }),
          );
          break;
        }

        case END_USER_WITHOUT_MASTER_ENUM.STUDENT: {
          const students = await this.studentRepo.findManyByIdsOrThrow(ids, "notFound.student");
          students.forEach(student =>
            users.push({
              ...UserMapper.toUserProfileDTO(student),
              userType: userType,
            }),
          );
          break;
        }

        case END_USER_WITHOUT_MASTER_ENUM.PARENT: {
          const parents = await this.parentRepo.findManyByIdsOrThrow(ids, "notFound.parent");
          parents.forEach(parent =>
            users.push({
              ...UserMapper.toUserProfileDTO(parent),
              userType: userType,
            }),
          );
          break;
        }

        case END_USER_WITHOUT_MASTER_ENUM.TEACHER: {
          const teachers = await this.teacherRepo.findManyByIdsOrThrow(ids, "notFound.teacher");
          teachers.forEach(teacher =>
            users.push({
              ...UserMapper.toUserProfileDTO(teacher),
              userType: userType,
            }),
          );
          break;
        }
      }
    }
    return users;
  }
}
