import { render, screen } from "@testing-library/react";
import { AppSidebar } from "../app-sidebar";

// Mock the Sidebar primitives from Shadcn to render as simple HTML
jest.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    <nav data-testid="sidebar" {...props}>{children}</nav>,
  SidebarContent: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  SidebarHeader: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  SidebarFooter: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  SidebarMenu: ({ children }: { children: React.ReactNode }) =>
    <ul>{children}</ul>,
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) =>
    <li>{children}</li>,
}));

describe("AppSidebar", () => {
  it("renders the brand title", () => {
    render(<AppSidebar />);
    expect(screen.getByText("Release Central")).toBeInTheDocument();
  });

  it("renders all 4 navigation items", () => {
    render(<AppSidebar />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("calendário")).toBeInTheDocument();
    expect(screen.getByText("game")).toBeInTheDocument();
    expect(screen.getByText("vitals")).toBeInTheDocument();
  });

  it("renders correct links for each navigation item", () => {
    render(<AppSidebar />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/calendar");
    expect(hrefs).toContain("/game");
    expect(hrefs).toContain("/vitals");
  });

  it("renders the version footer", () => {
    render(<AppSidebar />);
    expect(screen.getByText("v0.1.0-alpha")).toBeInTheDocument();
  });
});
