import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';
import type { ReleaseDocument, PackageItem } from '@/lib/types';

const DB_NAME = 'release-central';
const COLLECTION = 'release';

// --- Random package generation data ---
const SQUADS = [
  'Squad Alpha', 'Squad Bravo', 'Squad Charlie',
  'Squad Delta', 'Squad Echo', 'Squad Foxtrot',
];

const TITLES = [
  'Migração de analytics para Firebase',
  'Correção de crash no login biométrico',
  'Adequação LGPD - Consentimento de cookies',
  'Novo fluxo de onboarding',
  'Atualização de política de privacidade',
  'Dark mode para tela principal',
  'Ajuste de acessibilidade VoiceOver',
  'Adequação PCI-DSS tokenização',
  'Refactor módulo de pagamentos',
  'Termos de uso v2',
  'Implementação Open Banking fase 2',
  'Hotfix push notification Android 14',
  'Melhoria performance lista de transações',
  'Suporte a Widget iOS 17',
  'Adequação regulatória Banco Central',
  'Cache de imagens otimizado',
  'Redesign tela Home',
  'Novo módulo de investimentos',
  'Adequação LGPD - Portabilidade de dados',
  'Integração Pix Automático',
  'Migração para Kotlin Multiplatform',
  'Adequação Open Finance fase 3',
  'Novo sistema de notificações',
  'Resolução 4.893 - Segurança cibernética',
  'Otimização de bundle size',
  'Lei do Sigilo Bancário - Auditoria',
  'Implementação de biometria facial',
  'Refactor de autenticação OAuth2',
  'Melhoria no fluxo de recuperação de senha',
  'Integração com gateway de pagamentos v3',
];

const LEGAL_TITLES = [
  'Adequação LGPD - Consentimento de cookies',
  'Adequação PCI-DSS tokenização',
  'Termos de uso v2',
  'Adequação regulatória Banco Central',
  'Adequação LGPD - Portabilidade de dados',
  'Adequação Open Finance fase 3',
  'Resolução 4.893 - Segurança cibernética',
  'Lei do Sigilo Bancário - Auditoria',
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePackages(count: number): PackageItem[] {
  const packages: PackageItem[] = [];
  const usedGmudNumbers = new Set<string>();
  const usedPrNumbers = new Set<string>();

  for (let i = 0; i < count; i++) {
    let gmudNum: string;
    do {
      gmudNum = `GMUD-${randomInt(1000, 9999)}`;
    } while (usedGmudNumbers.has(gmudNum));
    usedGmudNumbers.add(gmudNum);

    let prNum: number;
    do {
      prNum = randomInt(100, 999);
    } while (usedPrNumbers.has(String(prNum)));
    usedPrNumbers.add(String(prNum));

    const isLegal = Math.random() < 0.2; // ~20% chance of being legal demand
    const title = isLegal ? randomElement(LEGAL_TITLES) : randomElement(TITLES);

    packages.push({
      gmudNumber: gmudNum,
      prNumber: `PR-${prNum}`,
      prUrl: `https://github.com/org/repo/pull/${prNum}`,
      title,
      squad: randomElement(SQUADS),
      hasFeatureToggle: Math.random() < 0.4, // ~40% chance
      isLegalDemand: isLegal,
    });
  }

  return packages;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const releases = await db
      .collection<ReleaseDocument>(COLLECTION)
      .find({})
      .sort({ dateLimit: -1 })
      .toArray();

    return NextResponse.json(releases);
  } catch (error) {
    console.error('Failed to fetch releases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { platform, version, dateLimit, gmud } = body;

    if (!platform || !['android', 'ios'].includes(platform)) {
      return NextResponse.json(
        { error: 'Platform must be "android" or "ios"' },
        { status: 400 }
      );
    }

    if (!version || typeof version !== 'string') {
      return NextResponse.json(
        { error: 'Version is required' },
        { status: 400 }
      );
    }

    if (!dateLimit || typeof dateLimit !== 'string') {
      return NextResponse.json(
        { error: 'Deadline (dateLimit) is required' },
        { status: 400 }
      );
    }

    const packageCount = randomInt(5, 30);
    const packages = generatePackages(packageCount);

    const release: Omit<ReleaseDocument, '_id'> = {
      platform,
      version: version.trim(),
      dateLimit,
      gmud: gmud?.trim() || '',
      packages,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection<ReleaseDocument>(COLLECTION).insertOne(release as ReleaseDocument);

    revalidatePath('/calendar');

    return NextResponse.json(
      { ...release, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create release:', error);
    return NextResponse.json(
      { error: 'Failed to create release' },
      { status: 500 }
    );
  }
}
