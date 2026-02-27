import { mockVitalsDataMap, availableVersions } from "./data";
import { VitalsHeader } from "./_components/vitals-header";
import { VitalsKPIs } from "./_components/vitals-kpis";
import { RolloutStatus } from "./_components/rollout-status";
import { VersionList } from "./_components/version-list";
import { UserFeedback } from "./_components/user-feedback";
import { VersionSidebar } from "./_components/version-sidebar";

export default async function VitalsPage({ searchParams }: { searchParams: Promise<{ version?: string }> | { version?: string } }) {
  // Await searchParams to support both Next.js 14 and 15 safely.
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const versionParam = typeof resolvedSearchParams === 'object' && resolvedSearchParams?.version ? resolvedSearchParams.version : availableVersions[0];
  const activeVersion = availableVersions.includes(versionParam) ? versionParam : availableVersions[0];
  const stats = mockVitalsDataMap[activeVersion];
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <VitalsHeader />
      
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Secondary Sidebar for Version Selection */}
        <VersionSidebar currentVersion={activeVersion} versions={availableVersions} />

        {/* Main Dashboard Content */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          <div className="space-y-6">
            <RolloutStatus stats={stats} />
            <VitalsKPIs stats={stats} />
            <VersionList stats={stats} />
          </div>
          
          <div className="h-full min-h-[500px]">
            <UserFeedback stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
