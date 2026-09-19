"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useAdminUI } from "./admin-ui-context";
import {
  LayoutDashboard,
  User,
  Tag,
  Briefcase,
  GraduationCap,
  FolderKanban,
  PenLine,
  Link2,
  LogOut,
  Eye,
  Sparkles,
  Settings,
  Command,
} from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; shortcut?: string };

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, shortcut: "O" },
  { href: "/admin/profile", label: "Profile", icon: User, shortcut: "P" },
  { href: "/admin/tech-tags", label: "Tech Tags", icon: Tag },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/writing", label: "Writing", icon: PenLine },
  { href: "/admin/social", label: "Social Links", icon: Link2 },
  { href: "/admin/appearance", label: "Appearance", icon: Sparkles },
];

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter();
  const { setPaletteOpen, setPreviewOpen, pendingChanges } = useAdminUI();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      <aside className="w-56 shrink-0 border-r border-neutral-800 flex flex-col bg-neutral-950">
        <div className="px-4 py-4 border-b border-neutral-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Back Office</div>
              <div className="text-[10px] text-neutral-500 tracking-wide uppercase">Portfolio CMS</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              router.pathname === item.href ||
              (item.href !== "/admin" && router.pathname.startsWith(item.href + "/")) ||
              (item.href !== "/admin" && router.pathname === item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition group",
                  active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-900",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-[10px] text-neutral-600 font-mono opacity-0 group-hover:opacity-100 transition">
                    {item.shortcut}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 py-3 border-t border-neutral-800 space-y-1">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-900"
          >
            <Eye className="w-4 h-4" />
            Preview
            <span className="ml-auto text-[10px] text-neutral-600 font-mono">⌘⇧P</span>
          </button>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-900"
          >
            <Command className="w-4 h-4" />
            Command
            <span className="ml-auto text-[10px] text-neutral-600 font-mono">⌘K</span>
          </button>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-900"
          >
            <Settings className="w-4 h-4" />
            View public
          </a>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/sign-out", { method: "POST" }).catch(() => {});
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800 px-8 py-3 flex items-center justify-between">
          <h1 className="text-base font-medium text-white">{title}</h1>
          <div className="flex items-center gap-3">
            {pendingChanges > 0 && (
              <span className="text-xs text-amber-400 font-mono">
                {pendingChanges} unsaved
              </span>
            )}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:border-neutral-700"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="font-mono">⌘K</span>
            </button>
          </div>
        </header>
        <div className="px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
