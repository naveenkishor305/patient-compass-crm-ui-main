import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <SidebarNav />
        <SidebarInset className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 overflow-auto p-0 px-4 md:px-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
