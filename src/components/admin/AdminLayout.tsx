"use client";

import { ReactNode } from "react";
import { AdminUIProvider } from "./admin-ui-context";
import { CommandPalette } from "./CommandPalette";
import { PreviewDrawer } from "./PreviewDrawer";
import { AdminShell } from "./AdminShell";

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <AdminUIProvider>
      <AdminShell title={title}>{children}</AdminShell>
      <CommandPalette />
      <PreviewDrawer />
    </AdminUIProvider>
  );
}
