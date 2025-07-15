import { TEndUserEnum, END_USER_ENUM } from "./../../../constants/globalEnums";

export const startConversationRules: Record<TEndUserEnum, TEndUserEnum[]> = {
  [END_USER_ENUM.MASTER]: [],
  [END_USER_ENUM.ADMIN]: [
    END_USER_ENUM.ADMIN,
    END_USER_ENUM.TEACHER,
    END_USER_ENUM.PARENT,
    END_USER_ENUM.STUDENT,
  ],
  [END_USER_ENUM.TEACHER]: [END_USER_ENUM.ADMIN],
  [END_USER_ENUM.STUDENT]: [],
  [END_USER_ENUM.PARENT]: [],
};
