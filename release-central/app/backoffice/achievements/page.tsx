import { getAchievements } from "@/features/achievements/actions/achievements.actions";
import AchievementList from "./_components/achievement-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import CreateAchievementDialog from "./_components/create-achievement-dialog";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AchievementsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  
  const achievements = await getAchievements(q);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements Engine</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage gamified milestones and rewards
          </p>
        </div>
        <CreateAchievementDialog />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-border/50">
        <form action="/backoffice/achievements" method="GET" className="flex flex-1 max-w-sm w-full gap-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              name="q" 
              placeholder="Search achievements..." 
              defaultValue={q}
              className="pl-9 w-full bg-background"
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
      </div>

      <AchievementList achievements={achievements} />
    </div>
  );
}
