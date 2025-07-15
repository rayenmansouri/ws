export type LevelDegreesCoverageDTO = {
  levels: {
    level: {
      _id: string;
      newId: string;
      name: string;
      color: string;
    };
    subLevels: {
      name: string;
      areAllTermsCompleted: boolean;
      classesPreventingSwitch: {
        name: string;
        newId: string;
        id: string;
      }[];
    }[];
  }[];
  canSwitchToNextYear: boolean;
};
