import { NotFoundError } from "../core/ApplicationErrors";
import { NextFunction, Response } from "express";
import {
  END_USER_ENUM,
  TEndUserWithoutMasterEnums,
} from "../constants/globalEnums";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { container } from "../core/container/container";
import { AuthFailureError } from "../core/ApplicationErrors";
import { Middleware } from "../core/Routes/createRoutes";
import { BaseUser } from "../feature/users/domain/baseUser.entity";
import { MongoAdminRepo } from "../database/mongo/repositories/MongoAdmin.repo";
import { MongoParentRepo } from "../database/mongo/repositories/MongoParent.repo";
import { MongoStudentRepo } from "../database/mongo/repositories/MongoStudent.repo";
import { MongoTeacherRepo } from "../database/mongo/repositories/MongoTeacher.repo";
import { ProtectedRequest } from "../types/app-request";
import { Role } from "../feature/authorization/domain/role.entity";

export const verifyJWT = (entity: TEndUserWithoutMasterEnums): Middleware =>
  AsyncHandlerForMiddleware(
    async (req: ProtectedRequest, _: Response, next: NextFunction) => {
      let user: Omit<BaseUser, "roles"> & { roles: Role[] };

      const connection = req.newConnection;

      switch (entity) {
        case END_USER_ENUM.ADMIN: {
          const adminRepo = new MongoAdminRepo(connection, null);
          const roleRepo = container.get("RoleRepo");

          const admin = await adminRepo.findOneById(req.userId);
          if (!admin) throw new AuthFailureError();

          const roles = await roleRepo.findManyByIds(admin.roles);

          user = { ...admin, roles };
          break;
        }
        case END_USER_ENUM.TEACHER: {
          const teacherRepo = new MongoTeacherRepo(connection, null);
          const roleRepo = container.get("RoleRepo");

          const teacher = await teacherRepo.findOneById(req.userId);
          if (!teacher) throw new AuthFailureError();

          const roles = await roleRepo.findManyByIds(teacher.roles);

          user = { ...teacher, roles };
          break;
        }
        case END_USER_ENUM.PARENT: {
          const parentRepo = new MongoParentRepo(connection, null);

          const parent = await parentRepo.findOneById(req.userId);
          if (!parent) throw new AuthFailureError();

          user = { ...parent, roles: [] };
          break;
        }
        case END_USER_ENUM.STUDENT: {
          const studentRepo = new MongoStudentRepo(connection, null);

          const student = await studentRepo.findOneById(req.userId);
          if (!student) throw new AuthFailureError();

          user = { ...student, roles: [] };
          break;
        }
      }

      if (
        user.passwordChangedAt &&
        Math.floor(user.passwordChangedAt.getTime() / 1000) > req.tokenExpires
      )
        throw new AuthFailureError("Invalid token");

      if (user.isArchived) throw new NotFoundError("global.userArchived");

      req.user = user;
      next();
    }
  );
