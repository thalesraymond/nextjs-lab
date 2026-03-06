import { render, screen } from "@testing-library/react";
import { AchievementsList } from "../achievements-list";
import { Achievement } from "../../types";

// Mock Card components to simplify DOM assertions
jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) =>
    <h3>{children}</h3>,
  CardDescription: ({ children }: { children: React.ReactNode }) =>
    <p>{children}</p>,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Bug: () => <span data-testid="icon-bug">Bug</span>,
  Code: () => <span data-testid="icon-code">Code</span>,
  Zap: () => <span data-testid="icon-zap">Zap</span>,
  ShieldCheck: () => <span data-testid="icon-shield">Shield</span>,
  Trophy: () => <span data-testid="icon-trophy">Trophy</span>,
}));

const mockAchievements: Achievement[] = [
  { id: "1", name: "Caçador de Bugs", description: "Resolveu mais de 10 incidentes.", iconName: "Bug", percentage: 80 },
  { id: "2", name: "Arquiteto de Código Limpo", description: "Completou 50 code reviews.", iconName: "Code", percentage: 45 },
  { id: "3", name: "Mestre da Velocidade", description: "Mesclou uma correção crítica rápido.", iconName: "Zap", percentage: 20 },
];

describe("AchievementsList", () => {
  it("renders all achievement names", () => {
    render(<AchievementsList achievements={mockAchievements} />);
    expect(screen.getByText("Caçador de Bugs")).toBeInTheDocument();
    expect(screen.getByText("Arquiteto de Código Limpo")).toBeInTheDocument();
    expect(screen.getByText("Mestre da Velocidade")).toBeInTheDocument();
  });

  it("renders achievement descriptions", () => {
    render(<AchievementsList achievements={mockAchievements} />);
    expect(screen.getByText("Resolveu mais de 10 incidentes.")).toBeInTheDocument();
    expect(screen.getByText("Completou 50 code reviews.")).toBeInTheDocument();
  });

  it("renders percentage values", () => {
    render(<AchievementsList achievements={mockAchievements} />);
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<AchievementsList achievements={mockAchievements} />);
    expect(screen.getByText("Global Achievements")).toBeInTheDocument();
  });

  it("sorts achievements by percentage descending", () => {
    render(<AchievementsList achievements={mockAchievements} />);
    const percentages = screen.getAllByText(/%$/).map((el) =>
      parseInt(el.textContent!.replace("%", ""))
    );
    for (let i = 0; i < percentages.length - 1; i++) {
      expect(percentages[i]).toBeGreaterThanOrEqual(percentages[i + 1]);
    }
  });
});
