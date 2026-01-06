"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import {
  Calendar,
  GraduationCap,
  Users,
  LayoutDashboard,
  Settings,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Id } from "@/convex/_generated/dataModel";

export function UserDashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const currentView = searchParams.get("view") || "overview";

  // Fetch user data
  const dashboardData = useQuery(
    api.dashboard.getDashboardOverview,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const userEvents = useQuery(
    api.eventRegistrations.getActiveRegistrations,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const userSchools = useQuery(
    api.dashboard.getUserSchools,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const userMentorships = useQuery(
    api.dashboard.getUserMentorships,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">My Dashboard</span>
                <span className="text-muted-foreground text-xs">
                  {user?.firstName || user?.email?.split("@")[0] || "User"}
                  &apos;s Portal
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-[10px] tracking-wider uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push(`/dashboard`)}
                  isActive={currentView === "overview"}
                  className="cursor-pointer text-sm font-medium"
                >
                  <LayoutDashboard className="size-4" />
                  <span className="text-base font-semibold">Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Registered Events */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span className="text-base font-semibold">My Events</span>
                  <Badge variant="secondary" className="ml-auto">
                    {userEvents?.length || 0}
                  </Badge>
                </div>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userEvents && userEvents.length > 0 ? (
                    userEvents.slice(0, 5).map((registration) => {
                      // Fix type error: support registration.event possibly null
                      const event = registration.event;
                      return (
                        <SidebarMenuItem key={registration._id}>
                          <SidebarMenuButton
                            onClick={() =>
                              router.push(
                                `/dashboard?view=event:${registration.eventId}`,
                              )
                            }
                            isActive={
                              currentView === `event:${registration.eventId}`
                            }
                            className="text-muted-foreground hover:text-foreground cursor-pointer px-2 py-6 text-sm"
                          >
                            <div className="flex flex-col gap-0.5 overflow-hidden py-5">
                              <span className="truncate font-medium">
                                {event?.title || "Event"}
                              </span>
                              <span className="text-muted-foreground truncate text-xs">
                                {event?.date
                                  ? new Date(event.date).toLocaleDateString()
                                  : "Date TBA"}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })
                  ) : (
                    <SidebarMenuItem>
                      <div className="text-muted-foreground px-2 py-1.5 text-xs">
                        No events registered
                      </div>
                    </SidebarMenuItem>
                  )}
                  {userEvents && userEvents.length > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton className="text-muted-foreground text-xs">
                        <span>+{userEvents.length - 5} more events</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Registered Schools */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-4" />
                  <span className="text-base font-semibold">My Schools</span>
                  <Badge variant="secondary" className="ml-auto">
                    {userSchools?.length || 0}
                  </Badge>
                </div>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userSchools && userSchools.length > 0 ? (
                    userSchools.slice(0, 5).map((school) => (
                      <SidebarMenuItem key={school._id}>
                        <SidebarMenuButton
                          onClick={() =>
                            router.push(`/dashboard?view=school:${school._id}`)
                          }
                          isActive={currentView === `school:${school._id}`}
                          className="text-muted-foreground hover:text-foreground cursor-pointer px-2 py-6 text-sm"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden py-5">
                            <span className="truncate font-medium">
                              {school.schoolName}
                            </span>
                            <span className="text-muted-foreground text-xs capitalize">
                              {school.status}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <div className="text-muted-foreground px-2 py-1.5 text-xs">
                        No schools enrolled
                      </div>
                    </SidebarMenuItem>
                  )}
                  {userSchools && userSchools.length > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton className="text-muted-foreground text-xs">
                        <span>+{userSchools.length - 5} more schools</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Mentorships */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Users className="size-4" />
                  <span className="text-base font-semibold">
                    My Mentorships
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {userMentorships?.length || 0}
                  </Badge>
                </div>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userMentorships && userMentorships.length > 0 ? (
                    userMentorships.slice(0, 5).map((mentorship) => (
                      <SidebarMenuItem key={mentorship._id}>
                        <SidebarMenuButton
                          onClick={() =>
                            router.push(
                              `/dashboard?view=mentorship:${mentorship._id}`,
                            )
                          }
                          isActive={
                            currentView === `mentorship:${mentorship._id}`
                          }
                          className="text-muted-foreground hover:text-foreground cursor-pointer px-2 py-6 text-sm"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden py-5">
                            <span className="truncate font-medium">
                              {mentorship.programType}
                            </span>
                            <span className="text-muted-foreground text-xs capitalize">
                              {mentorship.status}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <div className="text-muted-foreground px-2 py-1.5 text-xs">
                        No mentorships enrolled
                      </div>
                    </SidebarMenuItem>
                  )}
                  {userMentorships && userMentorships.length > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton className="text-muted-foreground text-xs">
                        <span>+{userMentorships.length - 5} more</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t">
        {/* Theme Toggle */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Monitor className="size-4" />
                  <span>Theme</span>
                  <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 size-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 size-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 size-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User Profile */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.profilePictureUrl as string}
                      alt={`${user?.firstName || "User"} ${user?.lastName || ""}`}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.firstName?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                      {user?.lastName?.charAt(0)?.toUpperCase() || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.firstName ||
                          user?.email?.split("@")[0] ||
                          "User"}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email || "email@example.com"}
                    </span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
