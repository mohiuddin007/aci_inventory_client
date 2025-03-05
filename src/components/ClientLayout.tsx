"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/top-bar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup"; // Add more pages if needed

  if (isAuthPage) {
    return <>{children}</>; // No sidebar or navbar on auth pages
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <div>
          <AppSidebar />
        </div>
        <main className="flex-1 w-full">
          <NavBar />
          <div className="w-[100%]">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
