"use client";

import { useState } from "react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Crown,
  BarChart3,
  Users,
  BookOpen,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminNavigation() {
  const { user } = useAuth();
  const router = useRouter();

  // Check if user is admin (you'll need to implement proper admin role checking)
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!isAdmin) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Admin
          <Badge variant="secondary" className="ml-1">
            {isAdmin ? "Admin" : "User"}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Admin Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard Overview
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/admin?tab=subscriptions"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Subscription Management
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/admin?tab=content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Content Management
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/admin?tab=analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics & Reports
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/admin/users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/admin/settings")}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          System Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
