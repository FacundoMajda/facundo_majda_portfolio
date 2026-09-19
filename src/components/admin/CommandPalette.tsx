"use client";

import { useRouter } from "next/router";
import { useAdminUI } from "./admin-ui-context";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  LayoutDashboard,
  User,
  Tag,
  Briefcase,
  GraduationCap,
  FolderKanban,
  PenLine,
  Link2,
  Sparkles,
  Eye,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

type Action = {
  id: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  keywords?: string[];
  perform: () => void | Promise<void>;
};

export function CommandPalette() {
  const router = useRouter();
  const { paletteOpen, setPaletteOpen, setPreviewOpen } = useAdminUI();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!paletteOpen) setSearch("");
  }, [paletteOpen]);

  const nav = (path: string) => () => {
    setPaletteOpen(false);
    router.push(path);
  };
  const create = (path: string) => () => {
    setPaletteOpen(false);
    router.push(`${path}?new=1`);
  };
  const preview = () => {
    setPaletteOpen(false);
    setPreviewOpen(true);
  };

  const actions: Action[] = [
    { id: "nav-overview", label: "Overview", group: "Navigate", icon: LayoutDashboard, perform: nav("/admin") },
    { id: "nav-profile", label: "Profile", group: "Navigate", icon: User, shortcut: "P", perform: nav("/admin/profile") },
    { id: "nav-tech-tags", label: "Tech Tags", group: "Navigate", icon: Tag, perform: nav("/admin/tech-tags") },
    { id: "nav-experience", label: "Experience", group: "Navigate", icon: Briefcase, perform: nav("/admin/experience") },
    { id: "nav-education", label: "Education", group: "Navigate", icon: GraduationCap, perform: nav("/admin/education") },
    { id: "nav-projects", label: "Projects", group: "Navigate", icon: FolderKanban, perform: nav("/admin/projects") },
    { id: "nav-writing", label: "Writing", group: "Navigate", icon: PenLine, perform: nav("/admin/writing") },
    { id: "nav-social", label: "Social Links", group: "Navigate", icon: Link2, perform: nav("/admin/social") },
    { id: "nav-appearance", label: "Appearance", group: "Navigate", icon: Sparkles, perform: nav("/admin/appearance") },

    { id: "create-experience", label: "New experience", group: "Create", icon: Plus, perform: create("/admin/experience") },
    { id: "create-education", label: "New education", group: "Create", icon: Plus, perform: create("/admin/education") },
    { id: "create-project", label: "New project", group: "Create", icon: Plus, perform: create("/admin/projects") },
    { id: "create-writing", label: "New writing entry", group: "Create", icon: Plus, perform: create("/admin/writing") },
    { id: "create-tech", label: "New tech tag", group: "Create", icon: Plus, perform: create("/admin/tech-tags") },
    { id: "create-social", label: "New social link", group: "Create", icon: Plus, perform: create("/admin/social") },

    { id: "preview-portfolio", label: "Preview portfolio", group: "View", icon: Eye, shortcut: "⌘⇧P", perform: preview },
  ];

  const grouped = actions.reduce<Record<string, Action[]>>((acc, a) => {
    (acc[a.group] = acc[a.group] ?? []).push(a);
    return acc;
  }, {});

  return (
    <Sheet open={paletteOpen} onOpenChange={setPaletteOpen}>
      <SheetContent side="top" className="!top-[10vh] !h-auto !w-full !max-w-2xl !mx-auto rounded-xl border-neutral-800">
        <SheetTitle className="sr-only">Command palette</SheetTitle>
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            autoFocus
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(grouped).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((a) => (
                  <CommandItem
                    key={a.id}
                    value={`${a.label} ${a.group} ${a.keywords?.join(" ") ?? ""}`}
                    onSelect={() => a.perform()}
                  >
                    <a.icon className="mr-2 h-4 w-4 text-neutral-500" />
                    <span>{a.label}</span>
                    {a.shortcut && (
                      <span className="ml-auto text-xs text-neutral-500 font-mono">{a.shortcut}</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  );
}
