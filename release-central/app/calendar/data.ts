export type Platform = "android" | "ios"

export interface PackageItem {
  gmudNumber: string
  prNumber: string
  prUrl: string
  title: string
  squad: string
  hasFeatureToggle: boolean
  isLegalDemand: boolean
}

export interface Release {
  _id: string
  platform: Platform
  version: string
  dateLimit: string
  gmud: string
  packages: PackageItem[]
}
