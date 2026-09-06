// Physical log helper: console + localStorage + optional POST.
// The localStorage ring buffer survives reloads so we can read it after the
// fact via DevTools → Application → Local Storage → `__clg__`.

const KEY = "__clg__";
const MAX_ENTRIES = 2000;

declare global {
  interface Window {
    __flushClg?: () => string;
  }
}

function safeLocalStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function push(entry: { t: number; msg: string }) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    const raw = ls.getItem(KEY);
    const arr: typeof entry[] = raw ? (JSON.parse(raw) as typeof entry[]) : [];
    arr.push(entry);
    if (arr.length > MAX_ENTRIES) arr.splice(0, arr.length - MAX_ENTRIES);
    ls.setItem(KEY, JSON.stringify(arr));
  } catch {
    // ignore quota or parse errors
  }
}

export function readClg(): Array<{ t: number; msg: string }> {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    const raw = ls.getItem(KEY);
    return raw ? (JSON.parse(raw) as Array<{ t: number; msg: string }>) : [];
  } catch {
    return [];
  }
}

export function clearClg(): void {
  const ls = safeLocalStorage();
  if (ls) ls.removeItem(KEY);
}

export function debugLog(...args: unknown[]): void {
  const msg = args
    .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
    .join(" ");
  const t = Date.now();
  // eslint-disable-next-line no-console -- debug instrumentation
  console.log(`[clg ${t}] ${msg}`);
  push({ t, msg });
}

if (typeof window !== "undefined") {
  window.__flushClg = () => {
    const lines = readClg().map((e) => `[clg ${e.t}] ${e.msg}`);
    return lines.join("\n");
  };
}
