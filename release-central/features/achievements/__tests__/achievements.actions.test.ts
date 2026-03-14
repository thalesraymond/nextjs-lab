import { createAchievement, updateAchievement } from "../actions/achievements.actions";

// Mock at the module boundary to prevent MongoDB ESM import
jest.mock("../repositories", () => ({
  achievementsRepository: {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Import the mocked module after jest.mock declarations
const { achievementsRepository } = jest.requireMock("../repositories");

describe("Achievements Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAchievement", () => {
    it("calls repository to create achievement", async () => {
      const mockResult = { _id: "1", name: "Test", description: "Desc", icon: "Trophy", createdAt: new Date(), updatedAt: new Date() };
      (achievementsRepository.create as jest.Mock).mockResolvedValue(mockResult);

      const formData = new FormData();
      formData.append("name", "Test");
      formData.append("description", "Desc");
      formData.append("icon", "Trophy");

      const result = await createAchievement(formData);

      expect(achievementsRepository.create).toHaveBeenCalledWith({
        name: "Test",
        description: "Desc",
        icon: "Trophy",
      });
      expect(result.success).toBe(true);
    });

    it("returns error on missing required fields", async () => {
      const formData = new FormData();
      formData.append("name", ""); // empty name

      const result = await createAchievement(formData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns validation error for short name", async () => {
      const formData = new FormData();
      formData.append("name", "Ab"); // too short (min 3)
      formData.append("description", "A valid description");
      formData.append("icon", "Trophy");

      const result = await createAchievement(formData);

      expect(result.success).toBe(false);
      expect(result.error).toContain("at least 3 characters");
    });
  });

  describe("updateAchievement", () => {
    it("calls repository to update achievement", async () => {
      const mockResult = { _id: "1", name: "Test Updated", description: "Desc", icon: "Trophy", createdAt: new Date(), updatedAt: new Date() };
      (achievementsRepository.update as jest.Mock).mockResolvedValue(mockResult);

      const formData = new FormData();
      formData.append("name", "Test Updated");
      formData.append("description", "Desc");
      formData.append("icon", "Trophy");

      const result = await updateAchievement("1", formData);

      expect(achievementsRepository.update).toHaveBeenCalledWith("1", {
        name: "Test Updated",
        description: "Desc",
        icon: "Trophy",
      });
      expect(result.success).toBe(true);
    });
  });
});
