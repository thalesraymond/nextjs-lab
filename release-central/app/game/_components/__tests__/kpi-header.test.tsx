import { render, screen } from "@testing-library/react";
import { KPIHeader } from "../kpi-header";
import { GameStats } from "../../types";

// Mock the KPICard to simplify assertions
jest.mock("../kpi-card", () => ({
  KPICard: ({ title, value }: { title: string; value: React.ReactNode }) => (
    <div data-testid={`kpi-${title}`}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  ),
}));

const mockStats: GameStats = {
  pontuacao_total: 1500000,
  pontuacao_media: 25000,
  squads_scores: [
    {
      squad: "Squad 1",
      release_train: "RT A",
      community: "Com A",
      total_points: 50000,
      total_deliveries: 3,
      total_events: 2,
      position: 1,
      historical_position: 2,
      tier: 1,
      delivery_items: [
        { issue_number: 1001, gmud: "CHG100001", removido: false, updated_at: "2026-01-01" },
        { issue_number: 1002, gmud: "CHG100002", removido: false, updated_at: "2026-01-02" },
        { issue_number: 1003, gmud: "CHG100003", removido: true, updated_at: "2026-01-03" },
      ],
      score_events: [
        { production_incident: 2, crash_incident: 1, code_review: 15, revert: 0 },
      ],
      events: [],
    },
  ],
  score_events: [
    { production_incident: 2, crash_incident: 1, code_review: 15, revert: 0 },
  ],
  achievements: [],
};

describe("KPIHeader", () => {
  it("renders all 4 KPI cards", () => {
    render(<KPIHeader stats={mockStats} />);
    expect(screen.getByTestId("kpi-Pontuação Total")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Pontuação Média")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Total de Entregas")).toBeInTheDocument();
    expect(screen.getByTestId("kpi-Soma total por eventos")).toBeInTheDocument();
  });

  it("displays formatted pontuação total", () => {
    render(<KPIHeader stats={mockStats} />);
    // toLocaleString() on 1500000
    expect(screen.getByTestId("kpi-Pontuação Total")).toHaveTextContent("1,500,000");
  });

  it("calculates total deliveries from all squads", () => {
    render(<KPIHeader stats={mockStats} />);
    // Squad 1 has 3 delivery_items
    expect(screen.getByTestId("kpi-Total de Entregas")).toHaveTextContent("3");
  });
});
