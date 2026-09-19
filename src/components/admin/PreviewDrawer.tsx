"use client";

import { useAdminUI } from "./admin-ui-context";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";

export function PreviewDrawer() {
  const { previewOpen, setPreviewOpen } = useAdminUI();

  return (
    <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
      <SheetContent side="right" className="!w-full sm:!max-w-3xl p-0">
        <SheetTitle className="sr-only">Portfolio preview</SheetTitle>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-950">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-neutral-300">Live preview</span>
              <span className="text-xs text-neutral-600">/</span>
              <span className="text-xs text-neutral-500 font-mono">facundomajdaportfolio.vercel.app</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const iframe = document.getElementById("preview-iframe") as HTMLIFrameElement | null;
                  if (iframe) iframe.src = iframe.src;
                }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="/" target="_blank">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Open
                </a>
              </Button>
            </div>
          </div>
          <iframe
            id="preview-iframe"
            src="/"
            className="flex-1 w-full bg-white"
            title="Portfolio preview"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
