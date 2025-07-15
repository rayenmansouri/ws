import bcrypt from "bcryptjs";
import { saltRounds } from "../config";

export class HashingHelper {
  static async generateHash(string: string): Promise<string> {
    return await bcrypt.hash(string, saltRounds);
  }

  static async compareHash(plainString: string, hashedString: string): Promise<boolean> {
    return await bcrypt.compare(plainString, hashedString);
  }
}
