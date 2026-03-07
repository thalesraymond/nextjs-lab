import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  
  // Don't show login if already logged in
  if (session) {
    if (session.admin) {
      redirect("/backoffice/calendar");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10 pointer-events-none" />

      <main className="flex flex-col items-center justify-center relative z-10 w-full max-w-4xl">
        <LoginForm />
      </main>
    </div>
  );
}
