"use client";

import { useEffect, useState } from "react";

import { createQualitySignals, type QualitySignals } from "./quality-signals";
import type { QualityTier } from "./quality";

export interface AdaptiveQuality {
  /** Current effective render tier. Starts at `high`; can move to `low` once on advisory signal. */
  tier: QualityTier;
}

/**
 * Page-level adaptive-quality hook. Boots three advisory signals (GPU tier via detect-gpu,
 * battery, frame health) and exposes the resulting `QualityTier` as React state so the page can
 * downgrade FX density, defer LazyEffect mounts, or skip a tier-2 effect entirely.
 *
 * Signals are advisory only — every failure keeps `high`. Tier never climbs back to `high`.
 *
 * The hook intentionally never sets state on the RAF tick: the rAF loop only feeds the
 * frame-health signal. State only changes when a signal requests Low, which is at most once.
 */
export function useQualityTier(): AdaptiveQuality {
  const [tier, setTier] = useState<QualityTier>("high");

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let cancelled = false;
    let signals: QualitySignals | undefined;

    try {
      signals = createQualitySignals({
        onDowngrade: () => {
          if (!cancelled) setTier("low");
        },
      });
    } catch {
      // signals are advisory; if they fail to construct we stay on `high`.
    }

    const tick = () => {
      if (cancelled) return;
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      try {
        signals?.recordFrame({
          deltaMs: delta,
          active: document.visibilityState === "visible",
          rendered: true,
        });
      } catch {
        // frame recording is advisory; ignore runtime errors.
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      signals?.dispose();
    };
  }, []);

  return { tier };
}
