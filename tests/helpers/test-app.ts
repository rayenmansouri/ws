import 'reflect-metadata';
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { NotFoundError, BadRequestError } from "../../src/core/ApplicationErrors";
import { errorHandler } from "../../src/middlewares/errorHandler";
import { loginValidation } from "../../src/api-v2/auth/public/login/login.validation";
import { BaseUserModel } from "../../src/feature/user-management/base-user/domain/base-user.schema";
import { BaseUserEntity } from "../../src/feature/user-management/base-user/domain/base-user.entity";
import { AuthenticationHelper } from "../../src/core/auth.helper";
import { SuccessResponse } from "../../src/core/responseAPI/APISuccessResponse";
import { MASTER_USER_TENANT_ID } from "../../src/feature/user-management/master/domain/master.entity";
import { LoginResponse } from "../../src/api-v2/auth/public/login/login.types";
import { fromZodError } from 'zod-validation-error';

// Create a minimal Express app for testing
const app = express();

app.use(express.json());
app.use(cors());

// Manually implement the login route logic with simple validation
app.post('/auth/public/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Manual validation using Zod schema
      const validation = loginValidation.body.safeParse(req.body);
      
      if (!validation.success) {
        const error = fromZodError(validation.error, {
          maxIssuesInMessage: 3,
          includePath: false,
        });
        throw new BadRequestError(error.message);
      }
      
      const { credential, password } = validation.data;
      
      // Use the BaseUserModel directly to query the database
      const user = await BaseUserModel.findOne({
        $or: [
          { email: credential },
          { phoneNumber: credential },
        ]
      });
      
      if (!user) {
        throw new BadRequestError("global.userNotFound");
      }
      
      const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
        password,
        user.password,
      );
      
      if (!isPasswordValid) {
        throw new BadRequestError("global.invalidPassword");
      }
      
      const userEntity = new BaseUserEntity(user);
      const schoolSubdomain = userEntity.isMaster() === false ? userEntity.schoolSubdomain : MASTER_USER_TENANT_ID;
      const token = AuthenticationHelper.generateUserToken(userEntity.id, schoolSubdomain);
      
      // Remove password from user data before sending response
      const userData = userEntity.toJSON();
      const { password: userPassword, ...userWithoutPassword } = userData;
      
      const response = new SuccessResponse<LoginResponse>("global.success", {
        token,
        user: userWithoutPassword as any
      });
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

app.use((req, _, next) => {
  next(new NotFoundError("Path not found"));
});

app.use(errorHandler);

export default app;