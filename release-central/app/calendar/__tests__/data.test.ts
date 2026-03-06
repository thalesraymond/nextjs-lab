import { getGmudsByReleaseId } from "../data";

describe("getGmudsByReleaseId", () => {
  it("returns an empty array for any release ID (no mock data)", () => {
    expect(getGmudsByReleaseId("some-id")).toEqual([]);
  });

  it("returns an empty array for a non-existent ID", () => {
    expect(getGmudsByReleaseId("999")).toEqual([]);
  });
});
