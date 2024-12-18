'use client';

import * as React from "react";
import { FileText, PaintBucket, BarChart2, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = [
  {
    title: "Pages",
    url: "/admin",
    icon: FileText,
  },
  {
    title: "Style",
    url: "/admin/styles",
    icon: PaintBucket,
  },
  {
    title: "Stats",
    url: "/admin/analytics",
    icon: BarChart2,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export default function AppSidebar(
  props: React.ComponentPropsWithoutRef<typeof Sidebar>
): React.ReactElement {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="md:mt-[65px]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}