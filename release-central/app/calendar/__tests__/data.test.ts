import { getReleaseById, getGmudsByReleaseId, mockReleases } from "../data";

describe("getReleaseById", () => {
  it("returns the correct release for a valid ID", () => {
    const release = getReleaseById(1);
    expect(release).toBeDefined();
    expect(release?.id).toBe(1);
    expect(release?.platform).toBe("android");
    expect(release?.version).toBe("3.5.0");
  });

  it("returns undefined for a non-existent ID", () => {
    expect(getReleaseById(999)).toBeUndefined();
  });

  it("returns undefined for ID 0", () => {
    expect(getReleaseById(0)).toBeUndefined();
  });
});

describe("getGmudsByReleaseId", () => {
  it("returns gmuds for a valid release ID", () => {
    const gmuds = getGmudsByReleaseId(1);
    expect(gmuds).toHaveLength(5);
    expect(gmuds[0].gmudNumber).toBe("GMUD-1001");
  });

  it("returns an empty array for a non-existent ID", () => {
    expect(getGmudsByReleaseId(999)).toEqual([]);
  });

  it("each gmud has required fields", () => {
    const gmuds = getGmudsByReleaseId(2);
    gmuds.forEach((gmud) => {
      expect(gmud).toHaveProperty("gmudNumber");
      expect(gmud).toHaveProperty("prNumber");
      expect(gmud).toHaveProperty("prUrl");
      expect(gmud).toHaveProperty("title");
      expect(gmud).toHaveProperty("squad");
      expect(typeof gmud.hasFeatureToggle).toBe("boolean");
      expect(typeof gmud.isLegalDemand).toBe("boolean");
    });
  });
});

describe("mockReleases", () => {
  it("contains the expected number of releases", () => {
    expect(mockReleases).toHaveLength(5);
  });

  it("each release has a unique ID", () => {
    const ids = mockReleases.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
