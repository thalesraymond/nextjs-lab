import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props;
    const element = document.createElement("img");
    if (src) element.setAttribute("src", String(src));
    if (alt) element.setAttribute("alt", String(alt));
    Object.entries(rest).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        element.setAttribute(key, String(value));
      }
    });
    return element;
  },
}));

// Mock next/link
jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
      return React.createElement("a", { href, ...props }, children);
    },
  };
});

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
