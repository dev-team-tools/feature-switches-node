import { FeatureSwitchManager } from ".";

const mockFetchResponse = (jsonData: unknown, status = 200): jest.Mock => {
  const mockFetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => jsonData,
  });

  global.fetch = mockFetch;

  return mockFetch;
};

afterEach(() => {
  jest.resetAllMocks();
});

const manager = new FeatureSwitchManager("some-key", "stage");

describe("When getting a single switch", () => {
  it("Should return a single switch value when requesting with context", async () => {
    const mockData = { key: "pokedexEnabled", value: true };
    global.fetch = mockFetchResponse(mockData);

    const result = await manager.getSwitchValue("pokedexEnabled", {
      userId: "example-uuid",
      context: [],
    });

    expect(result).toBeTruthy();
  });

  it("Should return a single switch value", async () => {
    const mockData = { key: "pokedexEnabled", value: false };
    global.fetch = mockFetchResponse(mockData);
    const result = await manager.getSwitchValue("pokedexEnabled");

    expect(result).toBeFalsy();
  });

  it("Should return false when a switch does not exist", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 404);
    const result = await manager.getSwitchValue("does-not-exist");

    expect(result).toBeFalsy();
  });

  it("Should return false when 400 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 400);
    const result = await manager.getSwitchValue("pokedexEnabled");

    expect(result).toBeFalsy();
  });

  it("Should return false when 401 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 401);
    const result = await manager.getSwitchValue("pokedexEnabled");

    expect(result).toBeFalsy();
  });

  it("Should return false when 403 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 403);
    const result = await manager.getSwitchValue("pokedexEnabled");

    expect(result).toBeFalsy();
  });

  it("Should return false when 500 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 403);
    const result = await manager.getSwitchValue("pokedexEnabled");

    expect(result).toBeFalsy();
  });
});

describe("When getting a list of switches", () => {
  it("Should return a list of switches when requesting with context", async () => {
    const mockData = [{ key: "pokedexEnabled", value: true }];
    global.fetch = mockFetchResponse(mockData);
    const result = await manager.getSwitches({
      userId: "example-uuid",
      context: [],
    });

    expect(result).toMatchObject([
      {
        key: "pokedexEnabled",
        value: true,
      },
    ]);
  });

  it("Should return a list of switches", async () => {
    const mockData = [{ key: "pokedexEnabled", value: false }];
    global.fetch = mockFetchResponse(mockData);
    const result = await manager.getSwitches();

    expect(result).toMatchObject([{ key: "pokedexEnabled", value: false }]);
  });

  it("Should return false when 400 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 400);
    const result = await manager.getSwitches();

    expect(result).toMatchObject([]);
  });

  it("Should return false when 401 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 401);
    const result = await manager.getSwitches();

    expect(result).toMatchObject([]);
  });

  it("Should return false when 403 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 403);
    const result = await manager.getSwitches();

    expect(result).toMatchObject([]);
  });

  it("Should return false when 500 returned", async () => {
    const mockData = {
      message: "No switch found for given key",
    };
    global.fetch = mockFetchResponse(mockData, 403);
    const result = await manager.getSwitches();

    expect(result).toMatchObject([]);
  });
});
