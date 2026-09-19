"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = {
  previewOpen: boolean;
  setPreviewOpen: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  pendingChanges: number;
  setPendingChanges: (n: number) => void;
};

const AdminUIContext = createContext<Ctx | null>(null);

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      if (cmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (cmd && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPreviewOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AdminUIContext.Provider
      value={{
        previewOpen,
        setPreviewOpen,
        paletteOpen,
        setPaletteOpen,
        pendingChanges,
        setPendingChanges,
      }}
    >
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  const ctx = useContext(AdminUIContext);
  if (!ctx) throw new Error("useAdminUI must be used within AdminUIProvider");
  return ctx;
}
