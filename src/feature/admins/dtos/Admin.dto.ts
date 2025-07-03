export type AdminDTO = {
  _id: string;
  newId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  email: string | null;
  phoneNumber: string | null;
  address1: string | null;
  address2: string | null;
  avatar: string;
  birthDate: Date | null;
  roles: {
    _id: string;
    newId: string;
    name: string;
  }[];
  isArchived: boolean;
  isActive: boolean;
};
