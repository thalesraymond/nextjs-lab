import { createAchievement, updateAchievement, deleteAchievement } from "../achievements.actions";
import * as dbHelpers from "../achievements";

jest.mock("../achievements", () => ({
  createAchievement: jest.fn(),
  updateAchievement: jest.fn(),
  deleteAchievement: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Achievements Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAchievement", () => {
    it("calls db helper to create achievement", async () => {
      const mockResult = { _id: "1", name: "Test", description: "Desc", icon: "Trophy" };
      (dbHelpers.createAchievement as jest.Mock).mockResolvedValue(mockResult);

      const formData = new FormData();
      formData.append("name", "Test");
      formData.append("description", "Desc");
      formData.append("icon", "Trophy");

      const result = await createAchievement(formData);

      expect(dbHelpers.createAchievement).toHaveBeenCalledWith({
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
  });

  describe("updateAchievement", () => {
    it("calls db helper to update achievement", async () => {
      const mockResult = { _id: "1", name: "Test Updated", description: "Desc", icon: "Trophy" };
      (dbHelpers.updateAchievement as jest.Mock).mockResolvedValue(mockResult);

      const formData = new FormData();
      formData.append("name", "Test Updated");
      formData.append("description", "Desc");
      formData.append("icon", "Trophy");

      const result = await updateAchievement("1", formData);

      expect(dbHelpers.updateAchievement).toHaveBeenCalledWith("1", {
        name: "Test Updated",
        description: "Desc",
        icon: "Trophy",
      });
      expect(result.success).toBe(true);
    });
  });
});
