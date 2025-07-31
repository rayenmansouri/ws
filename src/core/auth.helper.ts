import bcrypt from "bcryptjs";
import { saltRounds, tokenExpireIn, tokenMasterSecret, tokenSecret } from "../config";
import { ID } from "../types/BaseEntity";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthFailureError } from "./ApplicationErrors";

export class AuthenticationHelper {
  static async checkStringHashMatch(str: string, hashedStr: string): Promise<boolean> {
    return await bcrypt.compare(str, hashedStr);
  }

  static async hashString(value: string): Promise<string> {
    return await bcrypt.hash(value, saltRounds);
  }

  static generateSwitchUserToken(userId: ID, tenantId: string): string {
    return jwt.sign({ id: userId, tenantId }, tokenSecret, {
      expiresIn: "30m",
    });
  }

  static generateUserToken(userId: string, tenantId: string): string {
    return jwt.sign({ id: userId, tenantId }, tokenSecret, {
      expiresIn: tokenExpireIn,
    });
  }

  static generateMasterToken(userId: ID): string {
    return jwt.sign({ id: userId }, tokenMasterSecret, { expiresIn: tokenExpireIn });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, tokenSecret) as JwtPayload;
    } catch  {
      throw new AuthFailureError("canno decode jwt token");
    }
  }
}
