export type Platform = "android" | "ios"

export interface Release {
  id: number
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

export const mockReleases: Release[] = [
  {
    id: 1,
    platform: "android",
    version: "3.5.0",
    dateLimit: "2024-02-15",
    gmud: "CHG0001234",
    packageCount: 12,
    legalDemands: 2,
  },
  {
    id: 2,
    platform: "ios",
    version: "3.5.0",
    dateLimit: "2024-02-16",
    gmud: "CHG0001235",
    packageCount: 10,
    legalDemands: 3,
  },
  {
    id: 3,
    platform: "android",
    version: "3.5.1",
    dateLimit: "2024-03-01",
    gmud: "CHG0002001",
    packageCount: 5,
    legalDemands: 0,
  },
  {
    id: 4,
    platform: "ios",
    version: "3.5.1",
    dateLimit: "2024-03-02",
    gmud: "CHG0002002",
    packageCount: 6,
    legalDemands: 1,
  },
  {
    id: 5,
    platform: "android",
    version: "3.6.0",
    dateLimit: "2024-03-15",
    gmud: "CHG0003456",
    packageCount: 20,
    legalDemands: 5,
  },
]

const mockGmuds: Record<number, GmudDetail[]> = {
  1: [
    { gmudNumber: "GMUD-1001", prNumber: "PR-201", prUrl: "https://github.com/org/repo/pull/201", title: "Migração de analytics para Firebase", squad: "Squad Alpha", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-1002", prNumber: "PR-202", prUrl: "https://github.com/org/repo/pull/202", title: "Correção de crash no login biométrico", squad: "Squad Alpha", hasFeatureToggle: false, isLegalDemand: false },
    { gmudNumber: "GMUD-1003", prNumber: "PR-210", prUrl: "https://github.com/org/repo/pull/210", title: "Adequação LGPD - Consentimento de cookies", squad: "Squad Bravo", hasFeatureToggle: true, isLegalDemand: true },
    { gmudNumber: "GMUD-1004", prNumber: "PR-215", prUrl: "https://github.com/org/repo/pull/215", title: "Novo fluxo de onboarding", squad: "Squad Charlie", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-1005", prNumber: "PR-218", prUrl: "https://github.com/org/repo/pull/218", title: "Atualização de política de privacidade", squad: "Squad Bravo", hasFeatureToggle: false, isLegalDemand: true },
  ],
  2: [
    { gmudNumber: "GMUD-2001", prNumber: "PR-301", prUrl: "https://github.com/org/repo/pull/301", title: "Dark mode para iOS", squad: "Squad Delta", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-2002", prNumber: "PR-305", prUrl: "https://github.com/org/repo/pull/305", title: "Ajuste de acessibilidade VoiceOver", squad: "Squad Delta", hasFeatureToggle: false, isLegalDemand: false },
    { gmudNumber: "GMUD-2003", prNumber: "PR-310", prUrl: "https://github.com/org/repo/pull/310", title: "Adequação PCI-DSS tokenização", squad: "Squad Echo", hasFeatureToggle: false, isLegalDemand: true },
    { gmudNumber: "GMUD-2004", prNumber: "PR-312", prUrl: "https://github.com/org/repo/pull/312", title: "Refactor módulo de pagamentos", squad: "Squad Echo", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-2005", prNumber: "PR-315", prUrl: "https://github.com/org/repo/pull/315", title: "Termos de uso v2", squad: "Squad Foxtrot", hasFeatureToggle: false, isLegalDemand: true },
    { gmudNumber: "GMUD-2006", prNumber: "PR-318", prUrl: "https://github.com/org/repo/pull/318", title: "Implementação Open Banking fase 2", squad: "Squad Foxtrot", hasFeatureToggle: true, isLegalDemand: true },
  ],
  3: [
    { gmudNumber: "GMUD-3001", prNumber: "PR-401", prUrl: "https://github.com/org/repo/pull/401", title: "Hotfix push notification Android 14", squad: "Squad Alpha", hasFeatureToggle: false, isLegalDemand: false },
    { gmudNumber: "GMUD-3002", prNumber: "PR-405", prUrl: "https://github.com/org/repo/pull/405", title: "Melhoria performance lista de transações", squad: "Squad Charlie", hasFeatureToggle: true, isLegalDemand: false },
  ],
  4: [
    { gmudNumber: "GMUD-4001", prNumber: "PR-501", prUrl: "https://github.com/org/repo/pull/501", title: "Suporte a Widget iOS 17", squad: "Squad Delta", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-4002", prNumber: "PR-510", prUrl: "https://github.com/org/repo/pull/510", title: "Adequação regulatória Banco Central", squad: "Squad Echo", hasFeatureToggle: false, isLegalDemand: true },
    { gmudNumber: "GMUD-4003", prNumber: "PR-515", prUrl: "https://github.com/org/repo/pull/515", title: "Cache de imagens otimizado", squad: "Squad Delta", hasFeatureToggle: false, isLegalDemand: false },
  ],
  5: [
    { gmudNumber: "GMUD-5001", prNumber: "PR-601", prUrl: "https://github.com/org/repo/pull/601", title: "Redesign tela Home", squad: "Squad Alpha", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-5002", prNumber: "PR-605", prUrl: "https://github.com/org/repo/pull/605", title: "Novo módulo de investimentos", squad: "Squad Bravo", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-5003", prNumber: "PR-610", prUrl: "https://github.com/org/repo/pull/610", title: "Adequação LGPD - Portabilidade de dados", squad: "Squad Charlie", hasFeatureToggle: false, isLegalDemand: true },
    { gmudNumber: "GMUD-5004", prNumber: "PR-612", prUrl: "https://github.com/org/repo/pull/612", title: "Integração Pix Automático", squad: "Squad Echo", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-5005", prNumber: "PR-618", prUrl: "https://github.com/org/repo/pull/618", title: "Migração para Kotlin Multiplatform", squad: "Squad Alpha", hasFeatureToggle: false, isLegalDemand: false },
    { gmudNumber: "GMUD-5006", prNumber: "PR-620", prUrl: "https://github.com/org/repo/pull/620", title: "Adequação Open Finance fase 3", squad: "Squad Foxtrot", hasFeatureToggle: true, isLegalDemand: true },
    { gmudNumber: "GMUD-5007", prNumber: "PR-625", prUrl: "https://github.com/org/repo/pull/625", title: "Novo sistema de notificações", squad: "Squad Bravo", hasFeatureToggle: true, isLegalDemand: false },
    { gmudNumber: "GMUD-5008", prNumber: "PR-630", prUrl: "https://github.com/org/repo/pull/630", title: "Resolução 4.893 - Segurança cibernética", squad: "Squad Charlie", hasFeatureToggle: false, isLegalDemand: true },
    { gmudNumber: "GMUD-5009", prNumber: "PR-635", prUrl: "https://github.com/org/repo/pull/635", title: "Otimização de bundle size", squad: "Squad Delta", hasFeatureToggle: false, isLegalDemand: false },
    { gmudNumber: "GMUD-5010", prNumber: "PR-640", prUrl: "https://github.com/org/repo/pull/640", title: "Lei do Sigilo Bancário - Auditoria", squad: "Squad Foxtrot", hasFeatureToggle: false, isLegalDemand: true },
  ],
}

export function getReleaseById(id: number): Release | undefined {
  return mockReleases.find((r) => r.id === id)
}

export function getGmudsByReleaseId(id: number): GmudDetail[] {
  return mockGmuds[id] ?? []
}
