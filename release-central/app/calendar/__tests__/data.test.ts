import type { PackageItem, Release } from "../data";

describe("data types", () => {
  it("Release type includes packages array", () => {
    const release: Release = {
      _id: "test-id",
      platform: "android",
      version: "1.0.0",
      dateLimit: "2025-01-01",
      gmud: "",
      packages: [],
    };
    expect(release.packages).toEqual([]);
  });

  it("PackageItem type has expected fields", () => {
    const pkg: PackageItem = {
      gmudNumber: "GMUD-1234",
      prNumber: "PR-100",
      prUrl: "https://github.com/org/repo/pull/100",
      title: "Test package",
      squad: "Squad Alpha",
      hasFeatureToggle: true,
      isLegalDemand: false,
    };
    expect(pkg.gmudNumber).toBe("GMUD-1234");
    expect(pkg.isLegalDemand).toBe(false);
  });
});
