export type APIResponse<T> = {
  status: string;
  message: string;
  data: T;
};
