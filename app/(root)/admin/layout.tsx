import AdminSidebar from "@/components/admin-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portify',
  description: 'Manage your Portify platform settings and user accounts',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-65px)] sticky bottom-0 w-full">
        <AdminSidebar className="h-full" />
        <SidebarInset className="flex-grow">
          <SidebarTrigger className="m-4 p-4" />
          <main className="p-6 pt-2">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
