import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import { getUserByEmail } from "@/actions/user";

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portify',
  description: 'Manage your Portify platform settings and user accounts',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  if (!user?.emailAddresses?.[0]?.emailAddress) {
    redirect("/create");
  }

  const userRecord = await getUserByEmail(user.emailAddresses[0].emailAddress);
  if (!userRecord || !userRecord.id) {
    redirect("/create");
  }

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-65px)] sticky bottom-0 w-full">
        <AdminSidebar className="h-full" />
        <SidebarInset className="flex-grow">
          <SidebarTrigger className="m-4 p-4" />
          <main className="p-6 pt-2">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
