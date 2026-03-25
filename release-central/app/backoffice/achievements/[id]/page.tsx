import { getAchievementById } from "@/lib/achievements";
import { notFound } from "next/navigation";
import AchievementForm from "../_components/achievement-form";
import DeleteButton from "./_components/delete-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAchievementPage(props: PageProps) {
  const params = await props.params;
  const achievement = await getAchievementById(params.id);

  if (!achievement) {
    notFound();
  }

  const serializedAchievement = {
    ...achievement,
    _id: achievement._id?.toString(),
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl space-y-6 text-foreground">
      <div className="flex items-center gap-4">
        <Link href="/backoffice/achievements">
          <Button variant="ghost" size="icon" aria-label="Back to achievements" title="Back to achievements">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Make changes to {achievement.name}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <DeleteButton id={String(achievement._id)} name={achievement.name} />
      </div>

      <div className="p-6 border border-border/50 rounded-xl bg-card">
        <AchievementForm achievement={serializedAchievement} />
      </div>
    </div>
  );
}
