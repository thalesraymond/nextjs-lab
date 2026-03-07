import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Gamepad, Activity, Settings } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "home",
    url: "/",
    icon: Home,
  },
  {
    title: "calendário",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "game",
    url: "/game",
    icon: Gamepad,
  },
  {
    title: "vitals",
    url: "/vitals",
    icon: Activity,
  },
  {
    title: "backoffice",
    url: "/backoffice",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <h2 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          Release Central
        </h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link 
                  href={item.url}
                  className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-accent/50 hover:text-primary hover:shadow-[inset_4px_0_0_0_var(--color-primary)] data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:shadow-[inset_4px_0_0_0_var(--color-primary)]"
                >
                  <item.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-semibold tracking-wide uppercase text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50 text-xs text-muted-foreground">
        v0.1.0-alpha
      </SidebarFooter>
    </Sidebar>
  );
}
