import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AchievementForm from "../achievement-form";
import userEvent from "@testing-library/user-event";
import { createAchievement } from "@/lib/achievements.actions";

jest.mock("@/lib/achievements.actions", () => ({
  createAchievement: jest.fn(),
  updateAchievement: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe("AchievementForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty form for creation", () => {
    render(<AchievementForm onSuccess={jest.fn()} />);
    
    expect(screen.getByLabelText(/^Achievement Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
    expect(screen.getByRole("button", { name: /create achievement/i })).toBeInTheDocument();
  });

  it("calls createAchievement server action on submit", async () => {
    const onSuccess = jest.fn();
    (createAchievement as jest.Mock).mockResolvedValue({ success: true });
    
    render(<AchievementForm onSuccess={onSuccess} />);
    
    await userEvent.type(screen.getByLabelText(/^Achievement Name/i), "Test Achievement");
    await userEvent.type(screen.getByLabelText(/description/i), "Test Description");
    
    // Simulate selecting an icon by typing its name in a hidden input or text field if we implement it that way
    // For now we'll assumes there's a default or we can just submit 
    
    fireEvent.submit(screen.getByRole("button", { name: /create achievement/i }).closest("form")!);
    
    await waitFor(() => {
      expect(createAchievement).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
