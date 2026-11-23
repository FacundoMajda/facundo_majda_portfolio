import { useTheme, type Theme } from "./theme-provider";
import { useCopy } from "@/i18n/useCopy";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const c = useCopy();

  const options: { value: Theme; label: string }[] = [
    { value: "system", label: c.themeSystem },
    { value: "light", label: c.themeLight },
    { value: "dark", label: c.themeDark },
  ];

  return (
    <div
      role="group"
      aria-label={c.themeLabel}
      className="inline-flex gap-1 border border-border bg-background p-1"
    >
      {options.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
