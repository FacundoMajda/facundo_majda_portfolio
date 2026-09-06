# Agents Guide — facundo_majda_portfolio

Operational notes, root causes, and gotchas for this repo. Read this before
editing; the issues below have already been debugged once and re-doing them
wastes a lot of time.

## Recent Hotfixes

### Infinite-reload / "se rehidrata constantemente" — root cause and fix

**Symptoms.** Page re-renders / re-loads forever after touching `index.tsx`.
Next.js dev overlay shows runtime errors that the source code already appears
to fix (e.g. `Manrope is not defined`, `debugLog is not defined`). Hard
refresh does not help.

**Root cause** (confirmed after several rounds of debugging):

1. `useOnScreen` is consumed by `<Reveal>` with an inline options object:
   ```tsx
   const { ref, isVisible } = useOnScreen({ threshold: 0.1 });
   ```
   The inline object is a new reference every render. With
   `useEffect(..., [options])` the effect re-runs each render, the
   IntersectionObserver is torn down and rebuilt, the element is already
   visible, the observer fires synchronously, calls `setIsVisible(true)`,
   the component re-renders, repeat — infinite re-render loop.

2. Dev-time edit history then compounded it: Webpack chunks generated for
   `next/dynamic(() => import("@/components/canvasui/X"))` went stale every
   time `index.tsx` changed. The browser kept requesting old chunk URLs
   (`ChunkLoadError: _pages-dir-browser_src_components_canvasui_Grid_tsx`),
   Webpack's loadable runtime retried, Next.js dev fell back to a full
   reload, the page hit the same stale chunks again — the page appeared
   to "reload infinitely".

**Permanent fixes applied (do not revert):**

- `src/utils/index.tsx` — `useOnScreen` deps changed from `[options]` to `[]`
  with an `eslint-disable-next-line react-hooks/exhaustive-deps` comment
  explaining why. `options` is captured on mount; the observer never tears
  down because of an inline-object prop.
- `src/styles/fonts.ts` — `next/font` initialized once in a shared module.
- `src/pages/_app.tsx` — fonts applied at the root (`<main>`); no
  `next/font` calls inside page components.
- `src/pages/_document.tsx` — `lang="en"`, `theme-color`, PWA manifest link,
  `apple-mobile-web-app-capable` meta.

### Recovering from a stale `ReferenceError` that the source no longer has

After any edit that changes imports, modules, or exports:

```powershell
# 1. Stop any dev server (Ctrl+C in its terminal, or kill by port)
Get-NetTCPConnection -LocalPort 3000 -State Listen |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { Stop-Process -Id $_ -Force }

# 2. Wipe the dev cache
Remove-Item -LiteralPath '.\.next' -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath '.\node_modules\.cache' -Recurse -Force -ErrorAction SilentlyContinue

# 3. In Brave (or any browser with persistent cache) hard refresh:
#      Ctrl + Shift + R
#    Or open DevTools → Network tab → check "Disable cache" → refresh.
```

If the overlay still shows the OLD error after that, the browser is serving
the chunk from a separate HTTP cache. DevTools → Application → Storage →
"Clear site data", then refresh.

**Diagnostic plumbing** (already installed while debugging):
- `src/utils/debug.ts` — `debugLog(...)` writes to `console` AND to a ring
  buffer in `localStorage` under the key `__clg__`. Survives reloads.
- `window.__flushClg()` returns the buffered log as a string. Run in
  DevTools console: `copy(window.__flushClg())` puts it on the clipboard.
- Filter DevTools console with `[clg` to see only our logs in real time.
- `localStorage['__clg__']` can be inspected directly via DevTools →
  Application → Local Storage.

These are diagnostic; remove or disable later if they become noise.

## Architecture Notes

### Stack
- Next.js 15.3.9 Pages Router, React 19, TypeScript 5, Tailwind 3.4.
- Static export (`output: "export"`) — no API routes. Any "server" code
  happens at build time only.
- `reactStrictMode: true` — effects mount→unmount→mount in dev. Cleanup
  must be symmetric.
- PWA manifest at `/public/manifest.json` (no Service Worker registered).

### Fonts
Defined once in `src/styles/fonts.ts`. Applied in `src/pages/_app.tsx` only.
Never import `next/font/google` from a page or component — keep it root-only
so the generated CSS class hash is stable across HMR.

### Dynamic imports
Currently all `canvasui/*` components are imported directly in `index.tsx`
(via `LazyEffect as={X}`). `next/dynamic({ ssr: false })` for these was the
biggest contributor to dev-time ChunkLoadError loops and was rolled back
in this hotfix. If you reintroduce them later, do it incrementally and
verify with a clean `.next/` + hard refresh after each addition.

### Adaptive quality (`src/components/adaptive/`)
- `quality.ts`, `frame-health.ts`, `quality-signals.ts` are pulled from
  the vgpu `adaptive-quality` example (commit pinned by the vgpu CLI; the
  files here are byte-equivalent to what `npx vgpu examples cat ...` returns).
- `useQualityTier.ts` is the React wrapper. The RAF loop is advisory; it
  does NOT call `setState` on every tick. State changes only fire when a
  signal requests Low (at most once).
- The hook is invoked once in `Portfolio`. Tier defaults to `"high"`.

### vgpu Fluid
`src/components/fluid/{simulation,renderer,pointer-input}.ts` + 9 `.wgsl`
shaders exist but are not yet wired into the banner. The banner still uses
the original `Liquid` from `canvasui/`.

## Conventions

### Code style
- No comments unless they add non-obvious reasoning. The one exception is
  the `eslint-disable-next-line` justification on `useOnScreen` deps —
  keep that, it documents a real gotcha.
- Single quotes for strings inside TS/JSX (already mixed in this repo).
- Tailwind utility classes; no `style={{...}}` except where dynamic values
  require it.

### SEO
- `<Head>` lives in `src/pages/index.tsx` (Pages Router). It carries
  title, description, keywords, robots, canonical, OG, Twitter, and three
  JSON-LD blocks: Person, WebSite (with SearchAction), FAQPage.
- `public/robots.txt` and `public/sitemap.xml` are static.
- `public/icons/og.svg` is a placeholder OG image. Replace with a PNG
  when convenient; scrapers prefer PNG for `og:image`.

### Memory hygiene
- Save to engram on: architecture change, non-obvious bug fix, user
  preference learned. Do **not** save to engram on every iteration step.
- Topic keys for this repo: `positioning/ai-automation-engineer`,
  `gotcha/canvasui-pointer-events`, `bugfix/next-font-orphan-reference-error`,
  `preference/kpi-readability-dark`, `bugfix/useon-screen-deps`.

## Known Gotchas

1. **`useOnScreen` with inline `options` → infinite re-render**. Always
   either memoize options with `useMemo(..., [])` or use empty deps in the
   hook. The fix in this repo already takes the latter approach.
2. **Dynamic imports in Pages Router dev mode** can stale-chunk if the
   import graph changes faster than `.next/` regenerates. Prefer direct
   imports for now; reintroduce dynamic only when bundle size warrants it.
3. **Brave's shields** can mask HMR (Service Worker / EventSource) in
   some setups. If a page looks "frozen" in Brave, compare with Chrome or
   disable shields for `localhost:3000`.
4. **`output: "export"` ignores `next.config.headers()`**. Cache headers
   must be configured at the hosting edge (Vercel, Cloudflare, Netlify).
