import { render, screen } from "@testing-library/react";
import AchievementsPage from "../page";
import { getAchievements } from "@/features/achievements/actions/achievements.actions";
import type { AchievementDocument } from "@/features/achievements/models/achievements.schema";

// Mock the server actions module
jest.mock("@/features/achievements/actions/achievements.actions", () => ({
  getAchievements: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("AchievementsPage", () => {
  const mockAchievements = [
    {
      _id: "1",
      name: "First Blood",
      icon: "Trophy",
      description: "Get your first win",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as unknown as AchievementDocument[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title and create button", async () => {
    (getAchievements as jest.Mock).mockResolvedValue(mockAchievements);
    
    // Server components need to be awaited
    const Page = await AchievementsPage({ searchParams: Promise.resolve({}) });
    render(Page);
    
    expect(screen.getByText("Achievements Engine")).toBeInTheDocument();
  });

  it("calls getAchievements with search query", async () => {
    (getAchievements as jest.Mock).mockResolvedValue(mockAchievements);
    
    const Page = await AchievementsPage({ searchParams: Promise.resolve({ q: "Blood" }) });
    render(Page);
    
    expect(getAchievements).toHaveBeenCalledWith("Blood");
  });
});
