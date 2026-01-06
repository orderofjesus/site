"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  Home,
  Calendar,
  Users,
  GraduationCap,
  Heart,
  BookOpen,
  Info,
  Phone,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "About", url: "/about", icon: Info },
    { title: "Sermons", url: "/sermons", icon: BookOpen },
    { title: "Partner", url: "/#partner", icon: Heart },
    { title: "Contact", url: "/#connect", icon: Phone },
  ],
  expandable: [
    {
      title: "Mentorship",
      icon: Users,
      items: [
        { name: "One on One", url: "/mentorship/one-on-one" },
        { name: "Elijah Network", url: "/mentorship/elijah-network" },
      ],
    },
    {
      title: "Schools",
      icon: GraduationCap,
      items: [
        { name: "Mystical Masterclass", url: "/schools/mystical-masterclass" },
        { name: "Open Scroll", url: "/schools/open-scroll" },
      ],
    },
    {
      title: "Events",
      icon: Calendar,
      items: [
        { name: "All Events", url: "/events" },
        { name: "Healing Services", url: "/events#healing" },
        { name: "Conferences", url: "/events#conferences" },
      ],
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                  <span className="text-sm font-bold">M</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-black dark:text-white">
                    Melchizedek
                  </span>
                  <span className="truncate text-xs text-neutral-600 dark:text-neutral-400">
                    Ministry
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="gap-1 px-2">
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="font-semibold hover:bg-neutral-100 hover:text-black data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:shadow-sm dark:hover:bg-neutral-800 dark:hover:text-white dark:data-[active=true]:bg-white dark:data-[active=true]:text-black"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarMenu className="mt-4 gap-2 px-2">
          {data.expandable.map((section) => (
            <Collapsible
              key={section.title}
              asChild
              defaultOpen
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={section.title}
                    className="font-semibold text-neutral-900 hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-900"
                  >
                    <section.icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    <span>{section.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 dark:text-neutral-400" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-4 border-l-2 border-neutral-200 pl-4 dark:border-neutral-800">
                    {section.items.map((item) => (
                      <SidebarMenuSubItem key={item.name}>
                        <SidebarMenuSubButton
                          asChild
                          className="font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                        >
                          <Link href={item.url}>
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        {user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible asChild className="group/collapsible">
                <div>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      {user.profilePictureUrl ? (
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={user.profilePictureUrl}
                            alt={user.firstName || "User"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                          <span className="text-xs font-semibold">
                            {user.firstName
                              ? user.firstName
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)
                              : "U"}
                          </span>
                        </div>
                      )}
                      <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-neutral-900 dark:text-neutral-100">
                          {user.firstName || "User"}
                        </span>
                        <span className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                          {user.email}
                        </span>
                      </div>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 dark:text-neutral-500" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="px-2 py-1">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                        >
                          <Link href="/profile">
                            <User className="h-4 w-4" />
                            <span>My Profile</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={async () => {
                            await signOut({ returnTo: "/" });
                            router.refresh();
                          }}
                          className="font-medium text-red-600 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
