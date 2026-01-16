"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bitcoin,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Users,
  User,
  MessageSquare,
  UsersRound,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", colorClass: "text-sky-400" },
  { href: "/dashboard/tasks", icon: ListTodo, label: "Tasks", colorClass: "text-emerald-400" },
  { href: "/dashboard/withdraw", icon: Bitcoin, label: "Withdraw", colorClass: "text-yellow-400" },
  { href: "/dashboard/support", icon: MessageSquare, label: "Support", colorClass: "text-violet-400" },
  { href: "/dashboard/team", icon: UsersRound, label: "Team", colorClass: "text-rose-400" },
  { href: "/dashboard/profile", icon: User, label: "Profile", colorClass: "text-orange-400" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", colorClass: "text-slate-400" },
  { href: "/dashboard/admin", icon: Users, label: "Users", colorClass: "text-red-400" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/signup");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-primary text-primary-foreground sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary-foreground md:h-8 md:w-8"
        >
          <Image
            src="https://res.cloudinary.com/deawcz3cy/image/upload/v1768555145/download_czwjhc.png"
            width={24}
            height={24}
            alt="Sumsub Dutch Rewards Logo"
          />
          <span className="sr-only">Sumsub Dutch Rewards</span>
        </Link>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                isActive
                  ? "bg-blue-700 text-primary-foreground"
                  : "hover:bg-primary/80"
              }`}
            >
              <item.icon className={`h-5 w-5 transition-colors ${
                isActive 
                  ? 'text-primary-foreground' 
                  : `${item.colorClass} group-hover:text-primary-foreground`
              }`} />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="overflow-hidden rounded-full hover:bg-blue-700"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
