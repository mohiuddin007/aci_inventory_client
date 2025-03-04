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
      <AppSidebar />
      <main className="w-[100%]">
        <NavBar />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
