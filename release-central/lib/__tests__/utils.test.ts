import { cn } from "../utils";

describe("cn (class name utility)", () => {
  it("merges multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles falsy values gracefully", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    // tailwind-merge should keep only the last conflicting class
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles conditional class objects from clsx", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});
