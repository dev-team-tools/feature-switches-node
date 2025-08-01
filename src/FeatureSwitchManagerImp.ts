import {
  FeatureSwitch,
  FeatureSwitchManager,
  FeatureSwitchRequest,
  FeatureSwitchValue,
} from "./types";

export class FeatureSwitchManagerImpl implements FeatureSwitchManager {
  #url: string = "https://feature-switches.harry-9ce.workers.dev";
  #token: string;
  #environment: string;

  constructor(token: string, environment: string) {
    this.#token = token;
    this.#environment = environment;
  }

  getSwitchValue = async (
    key: string,
    userRequest?: FeatureSwitchRequest,
  ): Promise<boolean> => {
    const body = userRequest ? userRequest : undefined;

    const url = `${this.#url}/${this.#environment}/${key}`;

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "User-Agent": "dev-team-tools-node",
          "Content-Type": "application/json",
          Authorization: this.#token,
        },
        body: JSON.stringify(body),
      });

      if (response.status > 299) {
        console.error(`Status code: ${response.status} returned`);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }

    try {
      const result = (await response.json()) as FeatureSwitchValue;
      return result.value;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  getSwitches = async (
    userRequest?: FeatureSwitchRequest,
  ): Promise<FeatureSwitch[]> => {
    const body = userRequest ? userRequest : undefined;

    const url = `${this.#url}/${this.#environment}`;

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "User-Agent": "dev-team-tools-node",
          "Content-Type": "application/json",
          Authorization: this.#token,
        },
        body: JSON.stringify(body),
      });

      if (response.status > 299) {
        console.error(`Status code: ${response.status} returned`);
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
    }

    try {
      const result = (await response.json()) as FeatureSwitch[];
      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
}
