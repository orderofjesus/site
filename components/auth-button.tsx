"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps = {}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const isAuthenticated = !!user;

  if (loading) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        className={`h-0 cursor-pointer gap-2 rounded-full p-1 py-2 ${className}`}
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-200 dark:bg-zinc-700">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <>
      <Unauthenticated>
        <Button
          onClick={() => router.push("/auth/login")}
          variant="ghost"
          size="sm"
          className={`h-0 cursor-pointer gap-2 rounded-full p-1 py-2 hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent ${className}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200 dark:bg-zinc-800">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </Unauthenticated>
      <Authenticated>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-0 cursor-pointer gap-2 rounded-full p-1 py-2 hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent ${className}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.profilePictureUrl || undefined}
                  alt={user?.firstName || "User"}
                />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                  {user?.firstName?.[0]?.toUpperCase() || (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">
                  {user?.firstName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut({
                  returnTo: "/",
                }).then(() => {
                  router.refresh();
                });
              }}
              className="text-red-600 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Authenticated>
    </>
  );
}
