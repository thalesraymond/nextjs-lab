export type Platform = "android" | "ios"

export interface Release {
  _id: string
  platform: Platform
  version: string
  dateLimit: string
  gmud: string
  packageCount: number
  legalDemands: number
}

export interface GmudDetail {
  gmudNumber: string
  prNumber: string
  prUrl: string
  title: string
  squad: string
  hasFeatureToggle: boolean
  isLegalDemand: boolean
}

const mockGmuds: Record<string, GmudDetail[]> = {}

export function getGmudsByReleaseId(id: string): GmudDetail[] {
  return mockGmuds[id] ?? []
}
