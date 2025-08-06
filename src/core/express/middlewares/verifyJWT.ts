import { NextFunction, Response } from "express";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { BaseUser } from "../../../feature/users/domain/baseUser.entity";
import { MongoAdminRepo } from "../../../newDatabase/mongo/repositories/MongoAdmin.repo";
import { MongoParentRepo } from "../../../newDatabase/mongo/repositories/MongoParent.repo";
import { MongoStudentRepo } from "../../../newDatabase/mongo/repositories/MongoStudent.repo";
import { MongoTeacherRepo } from "../../../newDatabase/mongo/repositories/MongoTeacher.repo";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { AuthFailureError } from "../../ApplicationErrors";
import { Middleware, TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { container } from "../../container/container";
import { Role } from "../../../feature/authorization/domain/role.entity";

export const verifyJWT = (entity: OmitFromEnum<TEndUserEnum, "master">): Middleware =>
  asyncHandlerForMiddleware(async (req: TypedRequest, _: Response, next: NextFunction) => {
    let user: Omit<BaseUser, "roles"> & { roles: Role[] };
    const connection = req.DBConnection;

    switch (entity) {
      case END_USER_ENUM.ADMIN: {
        const adminRepo = container.get("MongoAdminRepo");
        const roleRepo = container.get("RoleRepo");

        const admin = await adminRepo.findOneById(req.userId);
        if (!admin) throw new AuthFailureError();

        const roles = await roleRepo.findManyByIds(admin.roles);

        user = { ...admin, roles };
        break;
      }
      case END_USER_ENUM.TEACHER: {
        const teacherRepo = container.get("MongoTeacherRepo");
        const roleRepo = container.get("RoleRepo");

        const teacher = await teacherRepo.findOneById(req.userId);
        if (!teacher) throw new AuthFailureError();

        const roles = await roleRepo.findManyByIds(teacher.roles);

        user = { ...teacher, roles };
        break;
      }
      case END_USER_ENUM.PARENT: {
        const parentRepo = container.get("MongoParentRepo");

        const parent = await parentRepo.findOneById(req.userId);
        if (!parent) throw new AuthFailureError();

        user = { ...parent, roles: [] };
        break;
      }
      case END_USER_ENUM.STUDENT: {
        const studentRepo = container.get("MongoStudentRepo");

        const student = await studentRepo.findOneById(req.userId);
        if (!student) throw new AuthFailureError();

        user = { ...student, roles: [] };
        break;
      }
    }
    if (!(user as any).isActive)
      throw new AuthFailureError("authentication.invalidCredentials", { isActive: false });

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > req.tokenExpires
    )
      throw new AuthFailureError("Invalid token");

    req.user = user;
    req.userType = entity;

    next();
  });
