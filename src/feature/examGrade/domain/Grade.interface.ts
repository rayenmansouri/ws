export interface IGrade {
  mark: number | null;
  isDispensed: boolean;
  format(): string | null;
  isPromoted(): boolean;
}
