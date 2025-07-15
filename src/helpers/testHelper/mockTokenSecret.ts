import { faker } from "@faker-js/faker";
import { tokenMasterSecret, tokenSecret } from "../../config";

export const mockMasterTokenSecret = () => {
  //@ts-ignore
  tokenMasterSecret = faker.string.alphanumeric(64);
  return tokenMasterSecret;
};

export const mockTokenSecret = () => {
  //@ts-ignore
  tokenSecret = faker.string.alphanumeric(64);

  return tokenSecret;
};
