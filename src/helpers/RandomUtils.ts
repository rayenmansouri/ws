import { v4 as uuidv4 } from "uuid";

export class RandomUtils {
  static generateRandomNumber(length: number = 4): number {
    if (length <= 0) {
      throw new Error("Length must be a positive integer");
    }

    const minimumPossibleNumber = Math.pow(10, length - 1);
    const maximumPossibleNumber = Math.pow(10, length) - 1;

    // making sure that the number is always the correct length
    return (
      Math.floor(Math.random() * (maximumPossibleNumber - minimumPossibleNumber + 1)) +
      minimumPossibleNumber
    );
  }

  static generateUUID(): string {
    return uuidv4();
  }
}
