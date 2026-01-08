"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
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
import Link from "next/link";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps = {}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
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
          <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <>
      <Unauthenticated>
        <Link href={`/auth/login?returnTo=${pathname}`}>
          <Button
            variant="ghost"
            size="sm"
            className={`h-0 cursor-pointer gap-2 rounded-full p-1 py-2 hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent ${className}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </Link>
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
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700">
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
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {user?.firstName || "User"} {user?.lastName || ""}
                </p>
                {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {user?.email}eeeeeeeeeeeeeeeeeeeeeeeeeeee
                </p> */}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
              className="font-medium"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="cursor-pointer font-semibold"
              onClick={() => router.push("/dashboard")}
            >
              <User className="mr-2 h-4 w-4 text-zinc-900 dark:text-zinc-100" />
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
              className="cursor-pointer font-semibold text-red-600 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="cursor-pointer font-semibold text-red-600 dark:text-red-400">
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Authenticated>
    </>
  );
}
