import { render, screen } from "@testing-library/react";
import AchievementsPage from "../page";
import { getAchievements } from "@/lib/achievements";
import { AchievementDocument } from "@/lib/types";

// Mock the database helper
jest.mock("@/lib/achievements", () => ({
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
