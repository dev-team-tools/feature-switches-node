export interface FeatureSwitchContext {
  key: string;
  value: string;
}

export interface FeatureSwitchRequest {
  userId?: string;
  userName?: string;
  context?: FeatureSwitchContext[];
}

export interface FeatureSwitchValue {
  value: boolean;
}

export interface FeatureSwitchManager {
  getSwitchValue: (
    key: string,
    userRequest?: FeatureSwitchRequest,
  ) => Promise<boolean>;

  getSwitches: (userRequest?: FeatureSwitchRequest) => Promise<FeatureSwitch[]>;
}

export interface FeatureSwitch {
  key: string;
  value: boolean;
}
