import { render, screen } from "@testing-library/react";
import AchievementList from "../achievement-list";
import { AchievementDocument } from "@/lib/types";

// Mock the icons
jest.mock("lucide-react", () => ({
  Trophy: () => <div data-testid="icon-trophy">Trophy</div>,
  Star: () => <div data-testid="icon-star">Star</div>,
}));

describe("AchievementList", () => {
  const mockAchievements = [
    {
      _id: "1",
      name: "First Blood",
      icon: "Trophy",
      description: "Get your first win",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      name: "Sharpshooter",
      icon: "Star",
      description: "100% accuracy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as unknown as AchievementDocument[];

  it("renders a list of achievements", () => {
    render(<AchievementList achievements={mockAchievements} />);

    expect(screen.getByText("First Blood")).toBeInTheDocument();
    expect(screen.getByText("Sharpshooter")).toBeInTheDocument();
    expect(screen.getByText("Get your first win")).toBeInTheDocument();
    expect(screen.getByText("100% accuracy")).toBeInTheDocument();
  });

  it("renders an empty state message when no achievements are provided", () => {
    render(<AchievementList achievements={[]} />);

    expect(screen.getByText(/no achievements found/i)).toBeInTheDocument();
  });
});
