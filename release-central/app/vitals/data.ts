export type VitalsStats = {
  currentVersion: string;
  rolloutPercentage: number;
  rolloutStage: "phased" | "halted" | "completed";
  crashFreeRate: number;
  anrRate: number;
  hangRate: number;
  ratingAverage: number;
  ratingCount: number;
  recentVersions: {
    version: string;
    adoption: number;
    status: "active" | "deprecated" | "rolling";
    releaseDate: string;
  }[];
  recentComments: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

export const mockVitalsDataMap: Record<string, VitalsStats> = {
  "v2.14.0": {
    currentVersion: "v2.14.0",
    rolloutPercentage: 45,
    rolloutStage: "phased",
    crashFreeRate: 99.8,
    anrRate: 0.12,
    hangRate: 0.05,
    ratingAverage: 4.6,
    ratingCount: 14205,
    recentVersions: [
      { version: "v2.14.0", adoption: 45, status: "rolling", releaseDate: "2026-02-25" },
      { version: "v2.13.2", adoption: 52, status: "active", releaseDate: "2026-02-10" },
      { version: "v2.13.1", adoption: 2, status: "deprecated", releaseDate: "2026-01-28" },
      { version: "v2.13.0", adoption: 1, status: "deprecated", releaseDate: "2026-01-15" },
    ],
    recentComments: [
      { id: "1", user: "GamerPro99", rating: 5, comment: "Absolutely love the new dashboard. So fast!", date: "2026-02-26" },
      { id: "2", user: "DevTester", rating: 4, comment: "Good update, but finding some minor UI glitches on mobile.", date: "2026-02-25" },
      { id: "3", user: "QA_Ninja", rating: 5, comment: "No crashes so far. The new performance optimizations really work.", date: "2026-02-25" },
      { id: "4", user: "AngryUser1", rating: 2, comment: "The game hung on me once yesterday. Needs fixing.", date: "2026-02-24" },
    ],
  },
  "v2.13.2": {
    currentVersion: "v2.13.2",
    rolloutPercentage: 100,
    rolloutStage: "completed",
    crashFreeRate: 99.1,
    anrRate: 0.82,
    hangRate: 0.45,
    ratingAverage: 4.1,
    ratingCount: 45021,
    recentVersions: [
      { version: "v2.14.0", adoption: 45, status: "rolling", releaseDate: "2026-02-25" },
      { version: "v2.13.2", adoption: 52, status: "active", releaseDate: "2026-02-10" },
      { version: "v2.13.1", adoption: 2, status: "deprecated", releaseDate: "2026-01-28" },
      { version: "v2.13.0", adoption: 1, status: "deprecated", releaseDate: "2026-01-15" },
    ],
    recentComments: [
      { id: "5", user: "SpeedRunner", rating: 3, comment: "It's okay, but memory usage is a bit high.", date: "2026-02-15" },
      { id: "6", user: "CasualGamer", rating: 5, comment: "Works perfectly for me!", date: "2026-02-14" },
    ],
  },
  "v2.13.1": {
    currentVersion: "v2.13.1",
    rolloutPercentage: 100,
    rolloutStage: "completed",
    crashFreeRate: 98.5,
    anrRate: 1.2,
    hangRate: 0.9,
    ratingAverage: 3.8,
    ratingCount: 12040,
    recentVersions: [
      { version: "v2.14.0", adoption: 45, status: "rolling", releaseDate: "2026-02-25" },
      { version: "v2.13.2", adoption: 52, status: "active", releaseDate: "2026-02-10" },
      { version: "v2.13.1", adoption: 2, status: "deprecated", releaseDate: "2026-01-28" },
      { version: "v2.13.0", adoption: 1, status: "deprecated", releaseDate: "2026-01-15" },
    ],
    recentComments: [
      { id: "7", user: "OldSchool", rating: 2, comment: "Too many crashes on this old version.", date: "2026-01-30" },
    ],
  }
};

export const availableVersions = Object.keys(mockVitalsDataMap);

