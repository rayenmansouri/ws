import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { OmitFromEnum, PickFromEnum } from "../../../types/utils/enums.util";

export const SERVICE_TYPE_ENUM = {
  MONTHLY: "monthly",
  ONE_TIME: "oneTime",
  EXTRA: "extra",
} as const;
export type TServiceTypeEnum = (typeof SERVICE_TYPE_ENUM)[keyof typeof SERVICE_TYPE_ENUM];

type BaseService = {
  name: string;
  description?: string | null;
  showByDefault: boolean;
} & BaseEntity;

export type MonthlyOrOneTimeService = {
  invoiceType: OmitFromEnum<TServiceTypeEnum, typeof SERVICE_TYPE_ENUM.EXTRA>;
  amount: number;
} & BaseService;

type ExtraService = {
  invoiceType: PickFromEnum<TServiceTypeEnum, typeof SERVICE_TYPE_ENUM.EXTRA>;
  amount: number | null;
} & BaseService;

export type Service = MonthlyOrOneTimeService | ExtraService;

export type ServiceMetaData = GenerateMetaData<Service, never>;
